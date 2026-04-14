const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Task = require("./models/Task.js");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

/* ------------------ MongoDB Connectionc ------------------ */
mongoose
  .connect(
    "mongodb+srv://gurramvasudeva_db_user:vasu4848@cluster0.r0jsel0.mongodb.net/todoapp?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

/* ------------------ ROUTES ------------------ */

// Test
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// GET tasks (ONLY current user)
app.get("/tasks", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
});

// ADD task (attach userId)
app.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    text: req.body.text,
    completed: false,
    userId: req.userId
  });

  await task.save();
  res.json(task);
});

// COMPLETE task
app.put("/tasks/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    { completed: true },
    { new: true }
  );

  res.json(task);
});

// DELETE task
app.delete("/tasks/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "Task deleted" });
});

/* ------------------ AUTH ------------------ */

app.post("/auth/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    await user.save();
    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

/* ------------------ SERVER ------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

