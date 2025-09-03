import isLoggedin from "../middlewares/authMiddlewares.js";
import express from "express";
const router = express.Router();

router.get("/profile", isLoggedin, (req, res) => {
  res.render("profile", { user: req.user });
});

export default router;
