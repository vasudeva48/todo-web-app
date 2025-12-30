const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

/* ------------------ MongoDB Connection ------------------ */
mongoose
  .connect(
    "mongodb+srv://gurramvasudeva_db_user:vasu4848@cluster0.r0jsel0.mongodb.net/todoapp?retryWrites=true&w=majority"
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

// READ – Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// CREATE – Add a task
app.post("/tasks", async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
    completed: false,
  });

  await newTask.save();
  res.json(newTask);
});

// UPDATE – Mark task as completed ✅ (PUT route)
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );
  res.json(task);
});

// DELETE – Remove a task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

/* ------------------ Server ------------------ */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
