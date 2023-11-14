const express = require("express");
const Question = require("../models/questionmd");
const Comment = require("../models/commentsmd");
const User = require("../models/usermd");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("questions/new", { question: new Question() });
});

router.post("/", async (req, res) => {
  const user = await User.findOne({ name: req.session.username });
  try {
    // Create a new question
    let question = new Question({
      title: req.body.title,
      description: req.body.description,
      questioner: user._id,
      questionername: req.session.username,
    });

    // Save the question
    question = await question.save();

    res.redirect(`/questions/${question.slug}`);
  } catch (error) {
    console.error(error);
    res.render("questions/new", { question: req.body });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Find the questionID
    const question = await Question.findById(req.params.id);

    // Retrieve all the commentID refer to that question
    const comments = question.comments;

    // Delete the question
    await Question.findByIdAndDelete(req.params.id);

    // Delete the comments refer to that question
    await Comment.deleteMany({ _id: { $in: comments } });

    res.redirect("/questions");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("An error occurred while deleting the question and its comments.");
  }
});

router.post("/:slug/addcomment", async (req, res) => {
  const slug = req.params.slug;
  const comment = req.body.comment;
  try {
    // Find the question with the specified slug
    const question = await Question.findOne({ slug });

    if (question == null) {
      res.redirect("/questions/index");
    }

    const user = await User.findOne({ name: req.session.username });
    // Create a new comment
    let Newcomment = new Comment({
      comment: comment,
      question: question._id,
      createdAt: new Date(),
      respondent: user._id,
      respondentname: req.session.username,
    });

    // Save the comment
    await Newcomment.save();

    // Add the comment to the question's comments array
    question.comments.push(Newcomment._id);
    await question.save();

    res.redirect(`/questions/${slug}`);
  } catch (error) {
    console.error(error);
    res.redirect(`/questions/${slug}/?error=cannot_add_comment`);
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const question = await Question.findOne({ slug: req.params.slug }).populate(
      "comments"
    );
    if (question == null) {
      return res.redirect("/questions/index");
    }

    res.render("questions/detail", { question });
  } catch (error) {
    console.error(error);
    res.redirect("/questions/index");
  }
});

module.exports = router;
