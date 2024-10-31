<?php
class TaskFilterDecorator {
    private $tasks;

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function filterByCategory($category) {
        return array_filter($this->tasks, function($task) use ($category) {
            return $task->category === $category;
        });
    }

    public function filterByPriority($priority) {
        return array_filter($this->tasks, function($task) use ($priority) {
            return $task->priority === $priority;
        });
    }
}
?>