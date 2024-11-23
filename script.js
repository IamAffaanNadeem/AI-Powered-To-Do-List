

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearAllBtn = document.getElementById('clearAllBtn');
const themeToggle = document.getElementById('themeToggle');
const searchBar = document.getElementById('searchBar');
const categorySelect = document.getElementById('categorySelect');

// Load tasks from localStorage
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle theme toggle
themeToggle.addEventListener('click', () => {
  document.body.dataset.theme =
    document.body.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Add new task
addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  if (taskText) {
    addTaskToList(taskText, category, false);
    saveTask(taskText, category);
    taskInput.value = '';
  }
});

// Search bar functionality
searchBar.addEventListener('input', () => {
  const keyword = searchBar.value.toLowerCase();
  const tasks = document.querySelectorAll('ul li');
  tasks.forEach(task => {
    const text = task.querySelector('span').innerText.toLowerCase();
    task.style.display = text.includes(keyword) ? 'flex' : 'none';
  });
});

// Add task to the list
function addTaskToList(taskText, category, isCompleted) {
  const li = document.createElement('li');
  li.className = isCompleted ? 'completed' : '';
  li.innerHTML = `
    <span>${taskText} <small>[${category}]</small></span>
    <button class="deleteBtn">&times;</button>
  `;

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTask(taskText, category, li.classList.contains('completed'));
  });

  li.querySelector('.deleteBtn').addEventListener('click', e => {
    e.stopPropagation();
    removeTask(taskText, category);
    li.remove();
  });

  taskList.appendChild(li);
}

// Save task to localStorage
function saveTask(taskText, category) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, category, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in localStorage
function updateTask(taskText, category, isCompleted) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskIndex = tasks.findIndex(
    task => task.text === taskText && task.category === category
  );
  tasks[taskIndex].completed = isCompleted;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from localStorage
function removeTask(taskText, category) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(
    task => task.text !== taskText || task.category !== category
  );
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToList(task.text, task.category, task.completed));
}

// AI-Powered Suggestions
function suggestTasks() {
  // Use a predefined list or integrate an AI API like OpenAI for dynamic suggestions.
  const suggestions = ['Exercise', 'Read a book', 'Work on a project'];
  alert(`Suggestions: ${suggestions.join(', ')}`);
}
