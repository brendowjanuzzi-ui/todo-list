// Selecionando os elementos do HTML
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Função principal para adicionar tarefa
function addTask() {
    const taskValue = taskInput.value.trim();

    // Verifica se o campo não está vazio
    if (taskValue === "") {
        alert("Por favor, digite uma tarefa!");
        return;
    }

    // Criando o elemento da lista (li)
    const li = document.createElement('li');
    
    // Adicionando o texto e um botão de remover dentro do item
    li.innerHTML = `
        <span>${taskValue}</span>
        <button onclick="removeTask(this)" style="background-color: #dc3545; padding: 5px 10px; font-size: 12px;">Excluir</button>
    `;

    // Adiciona o novo item à lista na tela
    taskList.appendChild(li);

    // Limpa o campo de entrada para a próxima tarefa
    taskInput.value = "";
    taskInput.focus();
}

// Função para remover uma tarefa específica
function removeTask(button) {
    const li = button.parentElement;
    taskList.removeChild(li);
}

// Permite adicionar tarefa apertando a tecla "Enter"
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
