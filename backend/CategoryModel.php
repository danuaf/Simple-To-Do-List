<?php
require_once 'Category.php';

class CategoryModel {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    public function addCategory($category) {
        $stmt = $this->pdo->prepare("INSERT INTO category (category) VALUES (?)");
        $stmt->execute([$category->category]);
    }

    public function getCategory() {
        $stmt = $this->pdo->query("SELECT id, category FROM category");
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $categories = [];
        foreach ($data as $row) {
            $category = new Category($row['category']);
            $category->id = $row['id'];
            $categories[] = $category;
        }

        return $categories;
    }

    public function deleteCategory($id) {
        $stmt = $this->pdo->prepare("DELETE FROM category WHERE id = ?");
        $stmt->execute([$id]);
    }
}

?>