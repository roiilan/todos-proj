'use strict'

const KEY = 'todos'
var gTodos = _createTodos();
var gFilterBy = 'All';
var gSortBy = 'created';


function sortToDo(todos) {
    var sortArr;
    console.log('hi');

    switch (gSortBy) {
        case 'created':
            // todosForDisplay = gTodos.createdAt.sort();
            break;
        case 'text':
            sortArr = todos.sort(compareObjStrs);
            break;
        case 'importance':
            sortArr = todos.sort();
            break;
    }
    return sortArr;
}

function getTodosForDisplay() {
    if (gFilterBy === 'All') return gTodos;
    var todosForDisplay = gTodos.filter(function (todo) {
        return (gSortBy === 'Done' && todo.isDone) ||
            (gSortBy === 'Active' && !todo.isDone)
    })
    return sortToDo(todosForDisplay);

    // todosForDisplay = gTodos.filter(function(todo){
    // return  (gSortBy === 'Done' && todo.isDone) ||
    //             (gFilterBy === 'Active' && !todo.isDone) 
    // })

    // return todosForDisplay;
}

function getSortDisplay() {
    var todosForDisplay = gTodos.filter(function (todo) {
        return (gFilterBy === 'Done' && todo.isDone) ||
            (gFilterBy === 'Active' && !todo.isDone)
    })


    // switch(gSortBy) {
    //     case 'created':
    //         // todosForDisplay = gTodos.createdAt.sort();
    //       break;
    //     case 'text':
    //         console.log('ff');
    //         todosForDisplay = gTodos.sort();                  
    //         break;
    //       case 'importance':
    //         // code block
    //         break;
    //   }



    return todosForDisplay;
}

function getTodoCount() {
    return gTodos.length
}
function getActiveTodoCount() {
    var count = gTodos.reduce(function (acc, todo) {
        return acc + ((todo.isDone) ? 0 : 1);
    }, 0);
    return count;
}


function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    saveToStorage(KEY, gTodos);
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    saveToStorage(KEY, gTodos);

}

function addTodo(toDoObj) {
    var todo = _createTodo(toDoObj);
    gTodos.unshift(todo);
    console.log(gTodos);

    saveToStorage(KEY, gTodos);
}


function setTodoFilter(filterBy) {
    gFilterBy = filterBy;
}


function setSort(sortBy) {
    gSortBy = sortBy;
}


// Private functions:
function _createTodos() {
    var todos = loadFromStorage(KEY);
    if (todos) return todos;

    var todos = [{ txt: 'Learn HTML' }, { txt: 'Master CSS' }, { txt: 'Enjoy Javascript' }]
        .map(_createTodo)

    return todos;
}

function _createTodo(obj) {
    if (obj.importance === undefined) obj.importance = 3;
    var created = new Date();
    return {
        id: parseInt(Math.random() * 1000),
        txt: obj.txt,
        isDone: false,
        createdAt: created,
        importance: obj.importance
    }
}




function compareObjStrs(a, b) {
    if (a.last_nom < b.last_nom) {
        return -1;
    }
    if (a.last_nom > b.last_nom) {
        return 1;
    }
    return 0;
}



// function sortNums() {
//     points.sort(function(a, b){return a-b});
//     document.getElementById("demo").innerHTML = points;
//   }