//const BACKEND_ROOT_URL = 'http://localhost:3001'
const BACKEND_ROOT_URL = 'https://todo-server-wuj6.onrender.com'
import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

input.disabled = true

// -- part 1 --
/*input.addEventListener('keypress', (event) => {
    if(event.key == 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if(task !== '') {
            const li = document.createElement('li')
            li.setAttribute('class', 'list-group-item')
            li.innerHTML = task
            list.append(li)
            input.value = ''
        }
    }
})

// -- part 3 --
const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.innerHTML = task
    list.append(li)
}

const getTasks = async () => {
    try {
        const response = await fetch(BACKEND_ROOT_URL)
        const json = await response.json()
        json.forEach(task => {
            renderTask(task.description)
        })
        input.disabled = false
    } catch (error) {
        alert("Error retrieving tasks " + error.message)
    }
}*/

const saveTask = async(task) => {
    try {
        const json = JSON.stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert("Error saving task " + error.message)
    }
}

/*input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if(task !== '') {
            saveTask(task).then((json) => {
                renderTask(task)
                input.value = ''
            })
        }
    }
})*/
// --task 3 --

// --task 4 --
/*const renderTask = (task) => {
    console.log(task)
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.innerHTML = task.getText()
    list.append(li)
}
*/

const getTasks = async() => {
    todos.getTasks().then((tasks) => {
        tasks.forEach(task => {
            renderTask(task)
        })
        input.disabled = false
    }).catch((error) => {
        alert(error)
    })
}

input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if(task !== '') {
            todos.addTask(task).then((task) => {
                renderTask(task)
                input.value = ''
                input.focus()
            })
        }
    }
})
// -- part 4 --

// -- part 5 --
const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.setAttribute('data-key', task.getId().toString())
    renderSpan(li, task.getText())
    renderLink(li, task.getId())
    list.append(li)
}

const renderSpan = (li, text) => {
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style', 'float: right')
    a.addEventListener('click', (event) => {
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`)
            if(li_to_remove) {
                list.removeChild(li_to_remove)
            }
        }).catch((error) => {
            alert(error)
        })
    })
}
// -- part 5 --


getTasks()