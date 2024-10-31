CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    priority VARCHAR(50)
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100)
);
