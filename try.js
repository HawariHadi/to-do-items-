document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const clearBtn = document.getElementById('clear-tasks');

    // Load tasks from local storage
    function loadTasks() {
        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.forEach(function(task) {
            const li = createTaskElement(task);
            taskList.appendChild(li);
        });
    }

    loadTasks();

    // Store tasks in local storage
    function updateLocalStorage() {
        const tasks = Array.from(taskList.children).map(task => task.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create task element
    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(taskText));

        const deleteLink = document.createElement('a');
        deleteLink.className = 'delete-item';
        deleteLink.innerHTML = '<i class="fas fa-trash"></i>';
        li.appendChild(deleteLink);

        const editLink = document.createElement('i');
        editLink.className = 'fas fa-edit edit-item';
        li.appendChild(editLink);

        return li;
    }

    // Add task
    function addTask(e) {
        e.preventDefault();

        if (taskInput.value === '') {
            alert('Please add a task');
            return;
        }

        const li = createTaskElement(taskInput.value);
        taskList.appendChild(li);

        updateLocalStorage();

        taskInput.value = '';
    }

    // Event listener for task form submission
    taskForm.addEventListener('submit', addTask);

    // Event listener for task list (delegate for edit and delete)
    taskList.addEventListener('click', function(e) {
        const clickedElement = e.target;

        if (clickedElement.classList.contains('delete-item')) {
            const taskItem = clickedElement.parentElement;
            if (confirm('Are you sure you want to delete this task?')) {
                taskItem.remove();
                updateLocalStorage();
            }
        } else if (clickedElement.classList.contains('edit-item')) {
            const editedTask = prompt('Edit the task', clickedElement.parentElement.firstChild.textContent);

            if (editedTask !== null && editedTask.trim() !== '') {
                clickedElement.parentElement.firstChild.textContent = editedTask;
                updateLocalStorage();
            }
        }
    });

    // Clear all tasks
    function clearTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }

    // Event listener for clear tasks button
    clearBtn.addEventListener('click', clearTasks);
});
