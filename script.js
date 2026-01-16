let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
function addTask() {
  const input = document.getElementById("taskInput");
  const priority = document.getElementById("priority").value;

  if (input.value.trim() === "") return;

  tasks.push({
    id: Date.now(),
    text: input.value,
    completed: false,
    priority: priority
  });

  input.value = "";
  saveTasks();
  renderTasks("all");
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateDashboard();
}

// Render Tasks
function renderTasks(filter) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `priority-${task.priority}`;
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      ${task.text}
      <div class="task-actions">
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">✖</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// Toggle Task
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks("all");
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks("all");
}

// Dashboard Update
function updateDashboard() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  document.getElementById("total").innerText = total;
  document.getElementById("completed").innerText = completed;
  document.getElementById("pending").innerText = pending;

  const progress = total === 0 ? 0 : (completed / total) * 100;
  document.getElementById("progress-bar").style.width = progress + "%";
}

// Initial Load
renderTasks("all");
updateDashboard();
