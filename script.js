function addTask() {
  let input = document.getElementById("taskInput");
  let task = input.value;
  let type = document.getElementById("taskType").value;

  if (task.trim() === "") return;

  let li = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  let span = document.createElement("span");
  span.innerText = task + " (" + type + ")";
  span.style.marginLeft = "15px";

  checkbox.onchange = function () {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    saveData();
  };

  let delBtn = document.createElement("button");
  delBtn.innerHTML = "&times;";

  delBtn.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    saveData();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);

  document.getElementById("taskList").appendChild(li);

  input.value = "";
  input.focus();

  saveData();
}

function saveData() {
  localStorage.setItem("tasks", document.getElementById("taskList").innerHTML);
}

function showData() {
  let data = localStorage.getItem("tasks");
  document.getElementById("taskList").innerHTML = data;

  let tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(li => {
    let span = li.querySelector("span");
    let btn = li.querySelector("button");
    let checkbox = li.querySelector("input");

    checkbox.onchange = function () {
      span.style.textDecoration = checkbox.checked ? "line-through" : "none";
      saveData();
    };

    btn.onclick = function (e) {
      e.stopPropagation();
      li.remove();
      saveData();
    };
  });
}

function filterTasks(type) {
  let tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(li => {
    let checkbox = li.querySelector("input");

    if (type === "all") {
      li.style.display = "flex";
    } else if (type === "completed") {
      li.style.display = checkbox.checked ? "flex" : "none";
    } else {
      li.style.display = !checkbox.checked ? "flex" : "none";
    }
  });
}

showData();

document.getElementById("taskInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});