const auth = require("./middleware/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");



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
app.get("/tasks", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
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
const PORT = process.env.PORT || 5000;

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

    const token = jwt.sign({ userId: user._id }, "secretkey");
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

