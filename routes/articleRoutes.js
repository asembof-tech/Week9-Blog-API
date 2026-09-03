const router = require("express").Router();
const Article = require("../models/Article");

const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");

const validateArticle = require("../middlewares/validateArticle");

// GET all articles
router.get("/", getAllArticles);

// GET search articles (Bonus Task) - MUST be before /:id
router.get("/search", async (req, res) => {
  try {
    const keyword = req.query.q;
    if (!keyword) {
      return res.status(400).json({ message: "Please provide a search query" });
    }
    const articles = await Article.find({ $text: { $search: keyword } });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET a single article by ID
router.get("/:id", getArticleById);

// POST create an article
router.post("/", validateArticle, createArticle);

// PUT update an article
router.put("/:id", validateArticle, updateArticle);

// DELETE an article
router.delete("/:id", deleteArticle);

module.exports = router;