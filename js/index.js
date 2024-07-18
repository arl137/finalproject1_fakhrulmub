document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
});

function loadTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clear the list before loading
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach((todo, index) => {
        const todoItem = createTodoItem(todo, index);
        todoList.appendChild(todoItem);
    });
}

function addTodo() {
    const newTodo = document.getElementById('newTodo').value.trim();
    if (newTodo === '') return;

    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    document.getElementById('newTodo').value = ''; // Clear the input field
    loadTodos(); // Refresh the list
}

function deleteTodo(index) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    loadTodos(); // Refresh the list
}

function createTodoItem(todo, index) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input me-2';

    const todoText = document.createElement('span');
    todoText.textContent = todo;

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
