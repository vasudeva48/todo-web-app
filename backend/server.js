const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

/* ------------------ MongoDB Connection ------------------ */
mongoose
  .connect(
    "PASTE_YOUR_MONGODB_CONNECTION_STRING_HERE"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

/* ------------------ Task Schema ------------------ */
const taskSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

/* ------------------ ROUTES ------------------ */

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ GET all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// ✅ ADD a task
app.post("/tasks", async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: false,
  });

  await newTask.save();
  res.json(newTask);
});

/* ------------------ Server ------------------ */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
