import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import passport from "passport";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();

const app = express();
//+++++++++++++++++++++++++++++++++ file import++++++++++++++++++++
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import "./config/passport.js";
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// setting middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

// creating sessions

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// call connect DB
connectDB();
app.use("/", authRoutes);
app.use("/", profileRoutes);
app.listen(process.env.PORT_NUMBER || 3000, () => {
  console.log("server is starting on port no. 3000");
});
