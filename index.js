require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./Database/connectDB");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/articles", articleRoutes);

app.get("/", (req, res) => {
  res.send("Blog API is running");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API alive on port ${PORT}`);
  });
});