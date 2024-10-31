<?php
require_once 'Task.php';

class TaskFactory {
    public static function createTask($title, $category = "General", $priority = "Low") {
        return new Task($title, $category, $priority);
    }
}
?>