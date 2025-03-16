import express, { Request, Response, Router } from "express";
import config from "config";
import bcrypt from "bcrypt";
import userModel from "../../models/User/User";
import sendEmail from "../../utils/sendEmail";
import jwt from "jsonwebtoken";

const router: Router = express.Router();
const JWT_SECRET: string = config.get<string>("JWT_SECRET");
const URL: string = config.get<string>("SERVER_URL");

// ✅ Signup Route
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received Data:", req.body); // 🛠 Debugging log

    // ✅ Extract Data
    const { userName, age, email, password, fitnessGoal, fitnessLevel, subscriptionStatus } = req.body;

    // ✅ Input Validations
    if (!email || !userName || !password || !age || !fitnessGoal || !fitnessLevel || !subscriptionStatus) {
      console.log("❌ Missing Fields:", req.body);
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    if (userName.length > 20 || userName.length < 2) {
      res.status(400).json({ message: "Username must be between 2 and 20 characters." });
      return;
    }
    
    if (age > 70 || age < 10) {
      res.status(400).json({ message: "Age must be between 10 and 70." });
      return;
    }

    // ✅ Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    // ✅ Check if username already exists
    const dupUserName = await userModel.findOne({ userName });
    if (dupUserName) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailToken = Math.random().toString(36).substring(2);

    // ✅ Create New User (Removed `userVerifiedToken`)
    const newUser = await userModel.create({
      userName,
      age,
      email,
      password: hashedPassword,
      fitnessGoal,
      fitnessLevel,
      subscriptionStatus,
      userVerifiedToken: {
        email: emailToken
      },
    });

    await userModel.create(newUser);

    res.status(201).json({
      message: "✅ User registered successfully",
      userId: newUser._id
    });

    await sendEmail({
      subject: "Email Verification",
      to: email,
      html: `
      <!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="max-width: 600px; margin: auto; background-color: #ffffff"
    >
      <tr>
        <td style="padding: 20px; text-align: center; background-color: #1e3a8a">
          <h2 style="color: #ffffff; margin: 0">Verify Your Email</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px; text-align: center">
          <p style="font-size: 16px; color: #374151">
            Click the button below to verify your email address and activate
            your account.
          </p>
          <a
            href="${URL}/api/public/emailverify/${emailToken}"
            style="
              display: inline-block;
              padding: 12px 24px;
              margin-top: 12px;
              background-color: #1e3a8a;
              color: #ffffff;
              text-decoration: none;
              font-size: 16px;
              border-radius: 6px;
            "
          >
            Verify Email
          </a>
          <p style="margin-top: 20px; font-size: 14px; color: #6b7280">
            If the button doesn't work, copy and paste this URL:
          </p>
          <p
            style="
              font-size: 14px;
              color: #1e3a8a;
              word-break: break-all;
              text-align: center;
            "
          >
            ${URL}/api/public/emailverify/${emailToken}
          </p>
        </td>
      </tr>
      <tr>
        <td
          style="padding: 20px; text-align: center; background-color: #f3f4f6"
        >
          <p style="font-size: 12px; color: #6b7280">
            If you didn't request this email, you can safely ignore it.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    });
    console.log(`${URL}/api/public/emailverify/${emailToken}`);

  } catch (error) {
    console.error("❌ Signup Error:", error instanceof Error ? error.message : error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// ✅ Sign-in Route
router.post("/signin", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    if (!user.userVerified?.email) {
      res.status(400).json({ message: "Please verify your email first" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "User Logged In Successfully",
      token,
      id: user._id,
      email,
      userVerified: user.userVerified,
    });
  } catch (error) {
    console.error(
      "❌ Signin Error:",
      error instanceof Error ? error.message : error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Email Verification Route
router.get(
  "/emailverify/:token",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.params;

      const user = await userModel.findOne({
        "userVerifiedToken.email": token,
      });
      if (!user) {
        res.status(400).json({ message: "Invalid verification token" });
        return;
      }

      user.userVerified.email = true;
      user.userVerifiedToken!.email = undefined; // ✅ Fix for null issue
      await user.save();

      res.status(200).json({ message: "Email Verified successfully" });
    } catch (error) {
      console.error(
        "❌ Email Verification Error:",
        error instanceof Error ? error.message : error
      );
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

// ✅ Password Reset Route
router.post("/resetpassword", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email){
       res.status(400).json({ message: "Please provide an email." });
      return;
    }

    const user = await userModel.findOne({ email });
    if (!user){
       res
        .status(400)
        .json({ message: "User not found. Please register." });
      return;
    }

    const newPassword = Math.random().toString(36).slice(-8);
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>Your new password is: <strong>${newPassword}</strong></p>`,
    });

    res.status(200).json({ message: "New password sent to your email." });
  } catch (error) {
    console.error(
      "❌ Password Reset Error:",
      error instanceof Error ? error.message : error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Send Workout Plan Route
router.post("/sendplan", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, plan } = req.body;
    if (!email || !plan) {
       res.status(400).json({ message: "Plan data is required" });
       return;
    }

    let formattedPlan = plan
      .split("\n")
      .map((line: string) => `<p>${line}</p>`) // ✅ Fixed 'any' type
      .join("");

    await sendEmail({
      to: email,
      subject: "Your Workout Plan",
      html: `<div><h2>Your Workout Plan</h2>${formattedPlan}</div>`,
    });

    res.status(200).json({ message: "Plan sent successfully!" });
  } catch (error) {
    console.error(
      "❌ Send Plan Error:",
      error instanceof Error ? error.message : error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ Export Router
export default router;
