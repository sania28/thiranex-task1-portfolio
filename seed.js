require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("./models/Project");

const projects = [
  {
    title: "Wisdom Bot – Geeta Edition",
    description:
      "A full-stack application featuring Bhagavad Gita shlokas, mood-based guidance, audio and an interactive Krishna-inspired experience.",
    techStack: ["React", "TypeScript", "Spring Boot", "Java"],
    github: "https://github.com/sania28",
    live: "#",
    featured: true
  },
  {
    title: "E-Commerce Website",
    description:
      "Responsive e-commerce application with product browsing, cart functionality and a modern user interface.",
    techStack: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/sania28",
    live: "#",
    featured: true
  },
  {
    title: "Full Stack Portfolio",
    description:
      "Personal portfolio website built to showcase skills, projects, education and development experience.",
    techStack: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    github: "https://github.com/sania28",
    live: "#",
    featured: false
  }
];

async function seed() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Atlas connected successfully.");

    await Project.deleteMany({});
    await Project.insertMany(projects);

    console.log("Projects seeded successfully.");

    await mongoose.disconnect();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
}

seed();
