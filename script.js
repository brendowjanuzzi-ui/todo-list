const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Inicia o site carregando tarefas e o tema salvo
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadTheme();
});

// --- FUNÇÕES DE TAREFAS ---

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const taskObj = { text: text, completed: false };
    createItem(taskObj);
    saveTask(taskObj);
    taskInput.value = "";
    taskInput.focus();
}

function createItem(taskObj) {
    const li = document.createElement('li');
    if (taskObj.completed) li.classList.add('completed');
    
    li.innerHTML = `
        <span onclick="toggleComplete(this)" style="cursor:pointer; flex:1; ${taskObj.completed ? 'text-decoration: line-through; opacity: 0.5;' : ''}">${taskObj.text}</span>
        <button class="btn-delete" onclick="removeTask(this)">Excluir</button>
    `;
    taskList.appendChild(li);
}

function toggleComplete(span) {
    const li = span.parentElement;
    li.classList.toggle('completed');
    
    const isCompleted = li.classList.contains('completed');
    span.style.textDecoration = isCompleted ? "line-through" : "none";
    span.style.opacity = isCompleted ? "0.5" : "1";
    
    updateStorage();
}

function removeTask(btn) {
    btn.parentElement.remove();
    updateStorage();
}

function clearAll() {
    if (confirm("Deseja apagar toda a lista?")) {
        localStorage.removeItem('tasks');
        taskList.innerHTML = "";
    }
}

function filterTasks(type) {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(li => {
        switch(type) {
            case 'all': li.style.display = 'flex'; break;
            case 'completed': li.style.display = li.classList.contains('completed') ? 'flex' : 'none'; break;
            case 'pending': li.style.display = !li.classList.contains('completed') ? 'flex' : 'none'; break;
        }
    });
}

// --- FUNÇÕES DE MEMÓRIA (STORAGE) ---

function saveTask(taskObj) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(createItem);
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

// --- FUNÇÕES DE TEMA (DARK MODE) ---

function toggleTheme() {
    const body = document.body;
    const btn = document.getElementById('theme-toggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        btn.innerText = "🌙";
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        btn.innerText = "☀️";
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        document.getElementById('theme-toggle').innerText = "☀️";
    }
}

// Atalho Tecla Enter
taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
