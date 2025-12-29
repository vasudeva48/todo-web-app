const API_URL = "http://localhost:5000/tasks";

let tasks = [];
const taskList = document.getElementById("taskList");

/* ---------------- FETCH TASKS ---------------- */
async function fetchTasks() {
  try {
    const res = await fetch(API_URL);
    tasks = await res.json();
    displayTasks();
  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

/* ---------------- DISPLAY TASKS ---------------- */
function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(task._id);

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  updateCounter();
}

/* ---------------- ADD TASK ---------------- */
async function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value }),
  });

  input.value = "";
  fetchTasks();
}

/* ---------------- DELETE TASK ---------------- */
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  fetchTasks();
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

/* ---------------- LOAD DATA ON START ---------------- */
fetchTasks();

