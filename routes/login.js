// Import required modules
const express = require("express");

const User = require("../models/usermd");

// Create an instance of the Express router
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { error: null });
});

// Login route
router.post("/", async (req, res) => {
  try {
    // Find the user with the provided email in the database
    const user = await User.findOne({ name: req.body.name });

    if (!user) {
      // If user is not found, display an error message
      res.render("login", { error: "No such user" });
    } else {
      // Check if the password matches
      if (user.password == req.body.password) {
        // Password is correct, login successful
        req.session.authenticated = true;
        req.session.userid = user._id;
        req.session.username = user.name;
        req.session.email = user.email;
        

        res.redirect("/questions");
      } else {
        // Password is incorrect, display an error message
        res.render("login", { error: "Invalid password" });
      }
    }
  } catch (error) {
    console.error(error);
    res.render("login", { error: "An error occurred" });
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
}
router.post("/resetPassword", async (req, res) => {
  try {
    // Find the user with the provided email in the database
    const email = await User.findOne({ email: req.body.email });

    if (!email) {
      // If user is not found, display an error message
      res.render("resetpw", { message: "Email not registered yet" });
    } else {
      // check user email
      if (user.email == req.body.email) {
        User.updateOne({email: req.body.email},{$set: {password : req.body.password}}};
    }
        res.render("/login", {message , "password has been reset");
    }
  } catch (error) {
    console.error(error);
    res.render("resetpw", { message: "Cannot reset password" });
  }
});

  

// Export the router for use in other files
module.exports = router;
