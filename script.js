const inpValue = document.getElementById('add');
const addTaskBtn = document.getElementById('btn')
const list = document.getElementById('list')

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

class Task {
    constructor(description) {
    this.description = description
    this.completed = false
    }
}

let toDoItemEl = []

const createTemplate = (task, index) => {
    return `
    <li class="task ${task.completed ? 'checked' : ''}">
        <div class="todo-item">
            ${task.description}
        </div>
        <div class="buttons">
            <input onclick="completeTask(${index})" class="btn-completed" type="checkbox" ${task.completed ? 'checked' : ''}>
            <button onclick="deleteTask(${index})" class="btn-delete">Del</button>
        </div>
    </li>  
    `
}

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false)
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true)
    tasks = [...activeTasks,...completedTasks]
}

const fillHtmlList = () => {
    list.innerHTML = ""
    if (tasks.length > 0) {
        filterTasks()
        tasks.forEach((item, index) => {
            list.innerHTML += createTemplate(item, index)
        });
        toDoItemEl = document.querySelectorAll('.task');
    }
}

fillHtmlList()

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed
    if (tasks[index].completed) {
        toDoItemEl[index].classList.add("checked")
    } else {
        toDoItemEl[index].classList.remove("checked")
    }
    updateLocal()
    fillHtmlList()
}

const deleteTask = (index) => {
    tasks.splice(index, 1)
    updateLocal()
    fillHtmlList()
}

addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(inpValue.value))
    updateLocal()
    fillHtmlList()
    inpValue.value = ""
})






