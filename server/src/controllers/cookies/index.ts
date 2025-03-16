import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

// 🛑 Middleware to enable cookies
app.use(cookieParser());

// 🍪 1️⃣ Set a Cookie (Like Giving the Magic Token)
app.get("/set-cookie", (req: Request, res: Response) => {
  res.cookie("favoriteIceCream", "chocolate", {
    maxAge: 60000, // Cookie expires in 60 seconds
    httpOnly: true, // Only accessible by the server (not JavaScript)
  });
  res.send("Cookie has been set! 🍪");
});

// 🍪 2️⃣ Get a Cookie (Like Showing the Token)
app.get("/get-cookie", (req: Request, res: Response) => {
  const cookie = req.cookies.favoriteIceCream;
  if (cookie) {
    res.send(`Your favorite ice cream is: ${cookie} 🍦`);
  } else {
    res.send("No cookie found! 😢");
  }
});

// 🍪 3️⃣ Delete a Cookie (Like Losing the Token)
app.get("/delete-cookie", (req: Request, res: Response) => {
  res.clearCookie("favoriteIceCream");
  res.send("Cookie deleted! 🗑️");
});

app.listen(PORT, () => {
  console.log(`🍪 Server is running on http://localhost:${PORT}`);
});
