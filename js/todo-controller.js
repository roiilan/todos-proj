'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();

    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : '';
        return `
        <li onclick="onTodoToggle(${todo.id})" class="${className}">
            ${todo.txt} ${todo.createdAt.toString()}
            <button onclick="onRemoveTodo(event, ${todo.id})">x</button>
        </li>`
    })
    var elTodoList = document.querySelector('.todo-list');
    elTodoList.innerHTML = strHTMLs.join('');
    renderStats();
}

function renderStats() {
    document.querySelector('.todo-count').innerText = getTodoCount();
    document.querySelector('.active-count').innerText = getActiveTodoCount();
}

function onRemoveTodo(event, todoId) {
    event.stopPropagation();
    var isSure = confirm('Are you sure?');
    if (isSure) {
        removeTodo(todoId);
        renderTodos();
    }
}
function onAddTodo() {
    console.log('onAddTodo');
    var elTxt = document.querySelector('.add-todo-container input');
    var txt = elTxt.value;
    var elImportance = document.querySelector('.importance');
    var importance = +elImportance.value;
    console.log(importance);

    if (!txt) return;
    addTodo({
        'txt': txt,
        'importance': importance
    })
    elTxt.value = '';
    renderTodos();
}

function onTodoToggle(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onFilterChanged(filterBy) {
    setTodoFilter(filterBy);
    renderTodos();
}

function onSort(sortBy) {
    setSort(sortBy);
    // getSortDisplay();
    renderTodos();
}

