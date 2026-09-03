const Joi = require("joi");

const articleSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  content: Joi.string().min(10).required(),
  author: Joi.string().min(2).max(100).required(),
  tags: Joi.array().items(Joi.string()).optional(),
});

const validateArticle = (req, res, next) => {
  const { error } = articleSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateArticle;