const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questionername: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

questionSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Question", questionSchema);
