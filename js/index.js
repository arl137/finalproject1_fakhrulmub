document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
});

function loadTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoList.appendChild(todoItem);
    });
}

function addTodo() {
    const newTodoText = document.getElementById('newTodo').value.trim();
    if (newTodoText === '') return;

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const newTodo = { text: newTodoText, completed: false };
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    document.getElementById('newTodo').value = '';
    loadTodos();
}

function deleteTodo(index) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter((_, i) => i !== index);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
}

function toggleComplete(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos[index].completed = !todos[index].completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos();
}

function createTodoItem(todo, index) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';
    checkbox.checked = todo.completed;
    checkbox.onclick = function() {
        toggleComplete(index);
    };

    const todoText = document.createElement('span');
    todoText.textContent = todo.text;
    todoText.style.textDecoration = todo.completed ? 'line-through' : 'none';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteTodo(index);
    };

    li.appendChild(checkbox);
    li.appendChild(todoText);
    li.appendChild(deleteButton);

    return li;
}
