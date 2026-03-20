let lista = document.getElementById("lista");

function addTask() {
  let input = document.getElementById("input");
  let tarefa = input.value;

  if (tarefa === "") return;

  let li = document.createElement("li");
  li.textContent = tarefa;

  li.onclick = () => {
    li.classList.toggle("concluida");
    salvar();
  };

  let btn = document.createElement("button");
  btn.textContent = "X";
  btn.onclick = () => {
    li.remove();
    salvar();
  };

  li.appendChild(btn);
  lista.appendChild(li);

  input.value = "";
  salvar();
}

function salvar() {
  localStorage.setItem("tarefas", lista.innerHTML);
}

function carregar() {
  lista.innerHTML = localStorage.getItem("tarefas") || "";
}

carregar();
