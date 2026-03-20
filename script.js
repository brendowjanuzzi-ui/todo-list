const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Carrega as tarefas salvas quando abre o site
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    createItem(text);
    saveTask(text);
    taskInput.value = "";
}

function createItem(text) {
    const li = document.createElement('li');
    li.innerHTML = `<span>${text}</span><button class="btn-delete" onclick="removeTask(this)">Excluir</button>`;
    taskList.appendChild(li);
}

function removeTask(btn) {
    const li = btn.parentElement;
    const text = li.querySelector('span').innerText;
    deleteFromStorage(text);
    li.remove();
}

function clearAll() {
    if (confirm("Limpar tudo?")) {
        localStorage.clear();
        taskList.innerHTML = "";
    }
}

// Lógica de Salvar no Navegador (LocalStorage)
function saveTask(text) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(createItem);
}

function deleteFromStorage(text) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t !== text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Atalho Enter
taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
