const dns = require("dns");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  console.warn("Failed to set DNS servers:", e);
}

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
    "mongodb+srv://gurramvasudeva_db_user:vasudevagurram4848@cluster0.r0jsel0.mongodb.net/todoapp?retryWrites=true&w=majority"
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
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { text: req.body.text, completed: req.body.completed },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
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
    console.log("Signup request received:", {
      name: req.body.name,
      email: req.body.email,
      hasPassword: !!req.body.password
    });

    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("Signup failed: User already exists for email", req.body.email);
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    await user.save();
    console.log("Signup successful for email", req.body.email);
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Error during signup:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error" });
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

