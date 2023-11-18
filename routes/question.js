const express = require("express");
const Question = require("../models/questionmd");
const Comment = require("../models/commentsmd");
const User = require("../models/usermd");
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("questions/new", { question: new Question() , message : null });
});

router.post("/", async (req, res) => {
  if (!req.session.authenticated) {
    return res.render("login", { message: "Please login first" })
  }

  const user = await User.findOne({ name: req.session.username });
  try {
    // Create a new question
    let question = new Question({
      title: req.body.title,
      description: req.body.description,
      questioner: user._id,
      questionername: req.session.username,
    });

    if (await Question.findOne({ title: req.body.title })){
      return res.render("questions/new", {question: req.body, message: "Title already exists",});
    }

    // Save the question
    question = await question.save();

    res.redirect(`/questions/${question.slug}`);
  } catch (error) {
    console.error(error);
    res.render("questions/new", { question: req.body } ,);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    const comments = question.comments;

    await Question.findByIdAndDelete(req.params.id);

    await Comment.deleteMany({ _id: { $in: comments } });

    res.redirect("/questions");
    
  } catch (error) {
    console.error(error);
    res.redirect('/questions/index/?error=cannot_delete_question');
  }
});

router.post("/:slug/addcomment", async (req, res) => {
  const slug = req.params.slug;
  const comment = req.body.comment;
  try {
    const question = await Question.findOne({ slug });

    if (question == null) {
      res.redirect("/questions/index");
    }

    const user = await User.findOne({ name: req.session.username });
    let Newcomment = new Comment({
      comment: comment,
      questionid: question._id,
      createdAt: new Date(),
      respondent: user._id,
      respondentname: req.session.username,
    });

    await Newcomment.save();

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
