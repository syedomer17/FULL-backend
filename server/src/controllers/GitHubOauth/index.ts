import config from "config";
import axios from "axios";
import express, { Request, Response, Router } from "express";

const CLIENT_ID: string = config.get<string>("CLIENT_ID");
const CLIENT_SECRET: string = config.get<string>("CLIENT_SECRET");

const router: Router = express.Router();
router.use(express.json()); // ✅ Use Express built-in JSON parser

/* ✅ GET ACCESS TOKEN */
router.get("/getAccessToken", async (req: Request, res: Response): Promise<void> => {
  try {
    const code = req.query.code as string;
    if (!code) {
      res.status(400).json({ error: "Code is required" });
      return;
    }

    // ✅ Request GitHub's access token
    const response = await axios.post<{ access_token?: string }>(
      "https://github.com/login/oauth/access_token",
      { client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code },
      { headers: { Accept: "application/json" } }
    );

    const { access_token } = response.data;

    if (!access_token) {
      res.status(400).json({ error: "Failed to get access token", details: response.data });
      return;
    }

    // ✅ Send JSON instead of redirecting
    res.json({ access_token });
  } catch (error: any) {
    console.error("Error fetching access token:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.response?.data });
  }
});

/* ✅ GET USER DATA */
router.get("/getUserData", async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Authorization header is missing or invalid" });
      return;
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data); // ✅ Send GitHub user data to the client
  } catch (error: any) {
    console.error("Error fetching user data:", error.response?.data || error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.response?.data });
  }
});

export default router;
