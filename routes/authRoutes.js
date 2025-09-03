import express from "express";
import passport from "passport";
import User from "../models/user.js";
import signupValidation from "../middlewares/formValidationSignup.js";
import { validationResult } from "express-validator";
const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register", { errors: [] });
});

router.get("/login", (req, res) => {
  res.render("login", { errors: [] });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

router.post("/register", signupValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if (!errors.isEmpty()) {
      return res.render("register", { errors: errors.array() });
    }
  }
  try {
    const { username, email, password } = req.body;
    const newUser = await User.register({ username, email }, password);
    const result = await newUser.save();
    res.redirect("/login");
    console.log(result);
  } catch (error) {}
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/profile",
  })
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

export default router;
