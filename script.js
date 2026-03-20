const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Carregar tarefas ao abrir a página
document.addEventListener('DOMContentLoaded', getTasks);

function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === "") return;

    createTaskElement(taskValue);
    saveLocalTasks(taskValue); // Salva no navegador

    taskInput.value = "";
    taskInput.focus();
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${task}</span>
        <button onclick="removeTask(this)" style="background-color: #dc3545; padding: 5px 10px; font-size: 12px;">Excluir</button>
    `;
    taskList.appendChild(li);
}

function removeTask(button) {
    const li = button.parentElement;
    const taskText = li.querySelector('span').innerText;
    removeLocalTasks(taskText); // Remove do navegador
    taskList.removeChild(li);
}

// Funções de Armazenamento (LocalStorage)
function saveLocalTasks(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeLocalTasks(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
