<?php
require_once 'Task.php';

class TaskModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function addTask($task) {
        $stmt = $this->pdo->prepare("INSERT INTO tasks (title, category, priority) VALUES (?, ?, ?)");
        $stmt->execute([$task->title, $task->category, $task->priority]);
    }

    public function getTasks() {
        $stmt = $this->pdo->query("SELECT id, title, category, priority FROM tasks");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $tasks = [];
        foreach ($data as $row) {
            $task = new Task($row['title'], $row['category'], $row['priority']);
            $task->id = $row['id'];
            $tasks[] = $task;
        }

        return $tasks;
    }

    public function deleteTask($id) {
        $stmt = $this->pdo->prepare("DELETE FROM tasks WHERE id = ?");
        $stmt->execute([$id]);
    }
}

?>