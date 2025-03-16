import express, { Request, Response,Router } from "express";
import session from "express-session";

// ✅ Extend SessionData inside the same file
declare module "express-session" {
  interface SessionData {
    user?: { name: string; age: number };
  }
}

const sessionRouter: Router = express.Router();

// 🛑 Setting up session middleware
sessionRouter.use(
  session({
    secret: "supersecretkey", // 🗝️ Used to sign session ID cookie
    resave: false, // Don't save session if nothing changed
    saveUninitialized: true, // Save new sessions even if empty
    cookie: { maxAge: 60000 }, // Session expires in 60 seconds (1 minute)
  })
);

// 🎯 Route to Set a Session Value
sessionRouter.get("/set-session", (req: Request, res: Response): void => {
  req.session.user = { name: "John Doe", age: 10 }; // ✅ Now TypeScript knows 'user' exists!
  res.send("Session has been set! 🎉");
});

// 🎯 Route to Get Session Value
sessionRouter.get("/get-session", (req: Request, res: Response) => {
  if (req.session.user) {
    res.json({ message: "Session Data", user: req.session.user });
  } else {
    res.status(404).json({ message: "No session found! 😢" });
  }
});

// 🎯 Route to Destroy Session
sessionRouter.get("/destroy-session", (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error destroying session");
    }
    res.send("Session destroyed! 🗑️");
  });
});

export default sessionRouter;
