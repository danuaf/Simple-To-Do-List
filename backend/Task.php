<?php
class Task {
    public $id;
    public $title;
    public $category;
    public $priority;

    public function __construct($title = '', $category = '', $priority = '', $id = null) {
        $this->title = $title;
        $this->category = $category;
        $this->priority = $priority;
        $this->id = $id; 
    }
}
?>
