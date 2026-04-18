function getToken() {
  return localStorage.getItem("token");
}

/* AUTH UI */
function updateAuthUI() {
  const authDiv = document.getElementById("authLinks");
  if (!authDiv) return;

  const token = getToken();

  if (!token) {
    authDiv.innerHTML = `
      <a href="login.html">Login</a>
      <a href="signup.html">Signup</a>
    `;
  } else {
    authDiv.innerHTML = `
  <button class="logout-btn" onclick="logout()">🚪 Logout</button>
`;
  }
}

/* THEME */
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

const API_URL = "https://todo-web-app-rane.onrender.com/tasks";

let tasks = [];
const taskList = document.getElementById("taskList");

/* LOAD TASKS */
async function loadTasks() {
  const token = getToken();

  if (!token) {
    window.location.href = "login.html";
    return;
  }

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

/* DISPLAY TASKS */
function renderTasks() {
  if (!taskList) return;

  taskList.innerHTML = "";

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  sortedTasks.forEach((task) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    /* COMPLETE */
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.className = "complete-btn";
    completeBtn.onclick = () => completeTask(task);
    completeBtn.disabled = task.completed;

    /* DELETE */
    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(task._id);

    /* EDIT INLINE */
    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "edit-btn";

    editBtn.onclick = () => {
      const input = document.createElement("input");
      input.value = task.text;

      li.replaceChild(input, span);
      input.focus();

      input.onblur = async () => {
        if (!input.value.trim()) return loadTasks();

        await fetch(`${API_URL}/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            text: input.value,
            completed: task.completed
          })
        });

        loadTasks();
      };
    };

    /* BUTTON GROUP */
    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    btnGroup.appendChild(completeBtn);
    btnGroup.appendChild(delBtn);
    btnGroup.appendChild(editBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);

    taskList.appendChild(li);
  });

  updateCounter();
}

/* ADD TASK */
async function addTask() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  loadTasks();
}

/* COMPLETE TASK */
async function completeTask(task) {
  await fetch(`${API_URL}/${task._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      text: task.text,
      completed: true
    })
  });

  loadTasks();
}

/* DELETE TASK */
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  loadTasks();
}

/* COUNTER */
function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  const counter = document.getElementById("counter");
  if (counter) {
    counter.innerText =
      `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
  }
}

/* DARK MODE */
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

/* START */
updateAuthUI();
loadTasks();