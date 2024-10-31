document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

document.getElementById('add-category-btn').addEventListener('click', function () {
    document.getElementById('category-modal').style.display = 'flex';
});

document.querySelector('.close-btn').addEventListener('click', function () {
    document.getElementById('category-modal').style.display = 'none';
});

document.getElementById('save-category-btn').addEventListener('click', function () {
    const newCategory = document.getElementById('new-category').value;
    if (newCategory) {
        const categoryOption = document.createElement('option');
        categoryOption.value = newCategory;
        categoryOption.text = newCategory;
        document.getElementById('category').appendChild(categoryOption);
        document.getElementById('filter-category').appendChild(categoryOption.cloneNode(true));
        document.getElementById('new-category').value = '';
        document.getElementById('category-modal').style.display = 'none';
    }
});

//------------------------------------------------------------------------------------------
function addTask() {
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;

    fetch('backend/api.php?action=add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${title}&category=${category}&priority=${priority}`
    })
        .then(response => response.json())
        .then(() => {
            loadTasks();
        });
}


function loadTasks() {
    fetch('backend/api.php?action=get')
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks);
        })
        .catch(error => console.error('Fetch error:', error));
}


function filterTasks() {
    const filterCategory = document.getElementById('filter-category').value;
    const filterPriority = document.getElementById('filter-priority').value;

    fetch('backend/api.php?action=filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `category=${filterCategory}&priority=${filterPriority}`
    })
        .then(response => response.json())
        .then(tasks => {
            displayTasks(tasks)
        })
        .catch(error => console.error('Fetch error:', error));
}



function displayTasks(tasks) {
    const tasksContainer = document.getElementById('tasks');
    tasksContainer.innerHTML = '';

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.category}</td>
            <td>${task.priority}</td>
            <td><button class="delete-btn" onclick='deleteTask(${task.id})'>Delete</button></td>
        `;
        tasksContainer.appendChild(row);
    });
}


function deleteTask(taskId) {
    fetch(`backend/api.php?action=delete&id=${taskId}`, { method: 'GET' })
        .then(() => loadTasks());
}
