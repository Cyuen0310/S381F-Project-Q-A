const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  respondentname: {
    type: String,
  },
  questionid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
});

module.exports = mongoose.model("Comment", commentSchema);
