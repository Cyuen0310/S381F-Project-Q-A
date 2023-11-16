const express = require("express");
const User = require("../models/usermd");


const router = express.Router();


function emailformat(email){
  const format = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return format.test(email);
}

router.get("/", (req, res) => {
  res.render("register", { message: null });
});

router.post("/", async (req, res) => {
  try {
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
    if (existingemail) {
      return res.render("register", {
        message: "email has already registered",
      });
    }

      if (!(emailformat(req.body.email))){
      return res.render("register", {
        message: "Invalid email format",
      });
    }

    const user = new User({
      name: req.body.name,
      password: req.body.password,
      email : req.body.email,
    });

    await user.save();

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.render("/register?error=cannot_register",{message : 'cannot register'});
  }
});

module.exports = router;
