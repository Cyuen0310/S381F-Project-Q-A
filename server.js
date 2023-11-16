const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const Question = require("./models/questionmd");
const Comment = require("./models/commentsmd");
const User = require("./models/usermd");
const connectdb = require("./server/db");
const secureRandomString = require("secure-random-string");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const questionRouter = require("./routes/question");

const port = process.env.PORT || 8000; 
const app = express();

connectdb();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css")); // Corrected the static file paths
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));

app.use(cookieParser());
app.use(
  session({
    secret: secureRandomString({ length: 32 }),
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/questions", async (req, res) => {
  try {
    if (req.session.userid) {
      let filter = {};
      const searchQuery = req.query.searchQuery;

      if (searchQuery) {
        filter = {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { questionername: { $regex: searchQuery, $options: "i" } },
          ],
        };
      }
      const sessionUser = req.session.username;
      const questions = await Question.find(filter).sort({ createdAt: "desc" });
      res.render("questions/index", { questions, searchQuery, sessionUser });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    res.render("error"); // Display an error page if an error occurs
  }
});

app.use("/questions", questionRouter);
app.use("/login", loginRouter);
app.use("/", loginRouter);
app.use("/resetPassword", loginRouter);
app.use("/register", registerRouter);

app.listen(port, () => console.info(`Server started on port ${port}`));
