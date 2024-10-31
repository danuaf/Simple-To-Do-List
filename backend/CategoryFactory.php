<?php
require_once 'Category.php';

class CategoryFactory {
    public static function createCategory($category) {
        return new Category($category);
    }
}
?>