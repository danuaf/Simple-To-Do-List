document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    loadCategory();
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
        addCategory(newCategory);
    }
});

//------------------------------------------------------------------------------------------
function addTask() {
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;

    if (priority != '' && title != '' && category != '') {
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
}

function addCategory(category) {

    fetch('backend/api.php?action=addcategory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `category=${category}`
    })
        .then(response => response.json())
        .then(() => {
            loadCategory();
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

function loadCategory() {
    fetch('backend/api.php?action=getcategory')
        .then(response => response.json())
        .then(category => {
            displayCategory(category);
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

function displayCategory(categories) {
    const categorySelect = document.getElementById('category');
    const filterCategorySelect = document.getElementById('filter-category');

    categories.forEach(category => {
        const optionElement = document.createElement('option');
        optionElement.value = category.category;
        optionElement.text = category.category;

        categorySelect.appendChild(optionElement.cloneNode(true));
        filterCategorySelect.appendChild(optionElement.cloneNode(true));
    });

    const deleteCategoryTable = document.getElementById('categories');
    deleteCategoryTable.innerHTML = '';

    categories.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${category.category}</td>
                    <td><button class="delete-btn btn btn-danger" onclick='deleteCategory("${category.id}")'>Delete</button></td>
                `;
        deleteCategoryTable.appendChild(row);
    });
}

function deleteTask(taskId) {
    fetch(`backend/api.php?action=delete&id=${taskId}`, { method: 'GET' })
        .then(() => loadTasks());
}

function deleteCategory(name) {
    fetch(`backend/api.php?action=deletecategory&name=${name}`, { method: 'GET' })
        .then(() => {
            alert(`Are you sure bro ?`);
            loadCategory();
        })
        .catch(error => console.error('Delete error:', error));
}