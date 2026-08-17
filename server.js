require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const projectRoutes = require("./routes/projectRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.json({
    success: true,
    message: "Portfolio API is running",
    database: dbState === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.get("*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function startServer() {
  const mongoUri = (process.env.MONGODB_URI || "").trim();

  if (!mongoUri) {
    console.error("ERROR: MONGODB_URI is not set. Add it to your .env file (see .env.example).");
    console.error("The API will start, but database features (projects, contact) will be unavailable.");
  } else {
    try {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection FAILED:", error.message);
      console.error("Database features (projects, contact) will be unavailable.");
      console.error("Check that MONGODB_URI in .env is correct and the database is reachable.");
    }
  }

  // Start server regardless of MongoDB connection
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
  });
}

startServer();
