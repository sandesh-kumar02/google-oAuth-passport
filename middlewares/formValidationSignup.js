import { body } from "express-validator";

const signupValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("username is minimum 3 character")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Username must contain only alphabets (no numbers allowed)"),
  body("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Entetr a valid email")
    .notEmpty()
    .withMessage("email is required"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters long")
    .notEmpty()
    .withMessage("password is required"),
];

export default signupValidation;
