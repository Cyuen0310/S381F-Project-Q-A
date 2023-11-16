const express = require("express");

const User = require("../models/usermd");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { message: null });
});

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      res.render("login", { message: "No such user" });
    } else { 
      if (user.password == req.body.password) {
        req.session.authenticated = true;
        req.session.userid = user._id;
        req.session.username = user.name;
        req.session.email = user.email;
        res.redirect("/questions/");
      } else {
        res.render("login", { message: "Invalid password" });
      }
    }
  } catch (error) {
    console.error(error);
    res.render("login", { message: "An error occurred" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/login");
  });
});

router.get("/resetPassword", async (req, res) => {
  res.render('resetpw' , {message : null});
});

router.post("/resetPassword", async (req, res) => {
  try { 
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.render("resetpw", { message: "Email not registered yet" });
    } else {
      if (user.email == req.body.email) {
        await User.updateOne( {email: req.body.email} , {$set: {password : req.body.password}  });
    }
        res.render("login", {message: "password has been reset"});
    }
  } catch (error) {
    console.error(error);
    res.render("resetpw", { message: "Cannot reset password" });
  }
});

module.exports = router;
