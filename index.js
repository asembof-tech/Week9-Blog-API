require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes'); // Line 4 (Keep this)
const connectDB = require("./Database/connectDB");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// REPLACE LINE 13 WITH THIS:
app.use('/api/auth', authRoutes); 

app.use("/articles", articleRoutes);

app.get("/", (req, res) => {
    res.send("Blog API is running");
});

// ... (The rest of your file: error handlers, port connection, etc.)