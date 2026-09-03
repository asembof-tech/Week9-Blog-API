const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Text index for the bonus search feature: GET /articles/search?q=keyword
articleSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Article", articleSchema);