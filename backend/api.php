<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require_once 'TaskFactory.php';
require_once 'TaskModel.php';
require_once 'TaskFilterDecorator.php';

$host = 'localhost';
$db = 'todolist';
$user = 'danu';
$pass = 'danu';   

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}


$model = new TaskModel($pdo);

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'add':
        $title = $_POST['title'];
        $category = $_POST['category'];
        $priority = $_POST['priority'];
        $task = TaskFactory::createTask($title, $category, $priority);
        $model->addTask($task);
        echo json_encode(['status' => 'success']);
        break;
    case 'get':
        $tasks = $model->getTasks();
        echo json_encode($tasks);
        break;
    case 'filter':
         $tasks = $model->getTasks();
        $decorator = new TaskFilterDecorator($tasks);

        if (isset($_GET['category']) && $_GET['category'] !== '') {
            $tasks = $decorator->filterByCategory($_GET['category']);
        }

        if (isset($_GET['priority']) && $_GET['priority'] !== '') {
            $tasks = $decorator->filterByPriority($_GET['priority']);
        }

        echo json_encode($tasks);
        break;
        
        echo json_encode($tasks);
        break;
    case 'delete':
        $model->deleteTask($_GET['id']);
        echo json_encode(['status' => 'deleted']);
        break;
}
?>