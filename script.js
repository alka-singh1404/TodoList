let editIndex = null;
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// 🔄 LOAD TODOS ON PAGE LOAD
window.onload = function () {
    renderTodos();
};

function addTodo() {
    let input = document.getElementById("todo-input");
    let task = input.value.trim();

    if (task === "") return;

    // UPDATE MODE
    if (editIndex !== null) {
        todos[editIndex] = task;
        editIndex = null;
        document.querySelector(".input-section button").innerText = "Add";
    } 
    // ADD MODE
    else {
        todos.push(task);
    }

    saveTodos();
    renderTodos();
    input.value = "";
}

// 📝 RENDER FUNCTION
function renderTodos() {
    let list = document.getElementById("todo-list");
    list.innerHTML = "";

    todos.forEach((task, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.innerText = task;

        // ✏️ EDIT
        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.onclick = function () {
            editTodo(index);
        };

        // ❌ DELETE
        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.onclick = function () {
            deleteTodo(index);
        };

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        list.appendChild(li);
    });
}

// ✏️ EDIT FUNCTION
function editTodo(index) {
    let input = document.getElementById("todo-input");

    input.value = todos[index];
    editIndex = index;

    document.querySelector(".input-section button").innerText = "Update";
}

// ❌ DELETE FUNCTION
function deleteTodo(index) {
    todos.splice(index, 1);

    
    if (editIndex === index) {
        editIndex = null;
        document.querySelector(".input-section button").innerText = "Add";
        document.getElementById("todo-input").value = "";
    }

    saveTodos();
    renderTodos();
}

// 💾 SAVE TO LOCAL STORAGE
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}