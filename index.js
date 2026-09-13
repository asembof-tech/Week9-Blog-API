require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./Database/connectDB");

// Import Routes
const articleRoutes = require("./routes/articleRoutes");
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes'); // Crucial import

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use("/articles", articleRoutes);
app.use("/api/notes", noteRoutes); // Crucial mount path

// Base route
app.get("/", (req, res) => {
    res.send("Blog API is running");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong" });
});

// Connect to DB and Start Server
const PORT = process.env.PORT || 3007;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});