const express = require("express");
const User = require("../models/usermd");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("register", { message: null });
});

router.post("/", async (req, res) => {
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ name: req.body.name });
    const existingemail = await User.findOne({ email: req.body.email });

    

    if (existingUser) {
      return res.render("register", {
        message: "username has already registered",
      });
    }

    if (!(req.body.password.length >= 8)) {
      return res.render("register", {
        message: "Password must contain at least 8 letters",
      });
    }

    // Create a new user
    const user = new User({
      name: req.body.name,
      password: req.body.password,
      email : req.body.email,
    });

    // Save the user to the database
    await user.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.redirect("/register?error=cannot_register");
  }
});

module.exports = router;
