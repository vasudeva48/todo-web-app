const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}
const API_URL = "https://todo-web-app-rane.onrender.com/tasks";

let tasks = [];
const taskList = document.getElementById("taskList");

/* ---------------- LOAD TASKS ---------------- */
async function loadTasks() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    return;
  }

  tasks = await res.json();
  renderTasks();
}

/* ---------------- DISPLAY TASKS ---------------- */
function renderTasks() {
  taskList.innerHTML = "";

  const sortedTasks = [...tasks].sort(
    (a, b) => a.completed - b.completed
  );

  sortedTasks.forEach((task) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.onclick = () => completeTask(task._id);
    completeBtn.disabled = task.completed;

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

/* ---------------- ADD TASK ---------------- */
async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  loadTasks();
}

/* ---------------- COMPLETE TASK ---------------- */
async function completeTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadTasks();
}

/* ---------------- DELETE TASK ---------------- */
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
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

/* ---------------- LOGOUT ---------------- */
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

/* ---------------- START ---------------- */
loadTasks();


