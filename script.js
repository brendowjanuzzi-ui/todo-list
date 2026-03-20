const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;
    const taskObj = { text: text, completed: false };
    createItem(taskObj);
    saveTask(taskObj);
    taskInput.value = "";
}

function createItem(taskObj) {
    const li = document.createElement('li');
    if (taskObj.completed) li.classList.add('completed');
    
    // Agora o texto da tarefa é clicável para marcar como feita
    li.innerHTML = `
        <span onclick="toggleComplete(this)" style="cursor:pointer; flex:1;">${taskObj.text}</span>
        <button class="btn-delete" onclick="removeTask(this)">Excluir</button>
    `;
    taskList.appendChild(li);
}

function toggleComplete(span) {
    const li = span.parentElement;
    li.classList.toggle('completed');
    // Adiciona um efeito visual simples
    span.style.textDecoration = li.classList.contains('completed') ? "line-through" : "none";
    span.style.opacity = li.classList.contains('completed') ? "0.5" : "1";
    updateStorage();
}

function filterTasks(type) {
    const tasks = taskList.childNodes;
    tasks.forEach(li => {
        switch(type) {
            case 'all':
                li.style.display = 'flex';
                break;
            case 'completed':
                li.style.display = li.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'pending':
                li.style.display = !li.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
}

function removeTask(btn) {
    btn.parentElement.remove();
    updateStorage();
}

function clearAll() {
    if (confirm("Limpar tudo?")) {
        localStorage.clear();
        taskList.innerHTML = "";
    }
}

// Funções de Storage atualizadas para suportar o status "concluída"
function saveTask(taskObj) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(createItem);
    // Reaplica o estilo visual nas carregadas
    document.querySelectorAll('li.completed span').forEach(span => {
        span.style.textDecoration = "line-through";
        span.style.opacity = "0.5";
    });
}

function updateStorage() {
    let tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
