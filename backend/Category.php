<?php
class Category {
    public $id;
    public $category;

    public function __construct($category = '', $id = null) {
        $this->category = $category;
        $this->id = $id; 
    }
}
?>
