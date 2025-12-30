const API_URL = "https://todo-web-app-rane.onrender.com/tasks";


let tasks = [];
const taskList = document.getElementById("taskList");

/* ---------------- A) LOAD TASKS FROM BACKEND ---------------- */
async function loadTasks() {
  try {
    const res = await fetch(API_URL);
    tasks = await res.json();
    renderTasks();
  } catch (err) {
    console.error("Error loading tasks:", err);
  }
}

/* ---------------- DISPLAY TASKS ---------------- */
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.onclick = () => completeTask(task._id);

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(task._id);

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });

  updateCounter();
}

/* ---------------- B) ADD TASK ---------------- */
async function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  });

  input.value = "";
  loadTasks();
}

/* ---------------- C) COMPLETE TASK (PUT) ---------------- */
async function completeTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
  });
  loadTasks();
}

/* ---------------- D) DELETE TASK ---------------- */
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  loadTasks();
}

/* ---------------- COUNTER ---------------- */
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  document.getElementById("counter").innerText =
    `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}

/* ---------------- DARK MODE ---------------- */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

/* ---------------- LOAD ON PAGE START ---------------- */
loadTasks();
