CREATE TABLE IF NOT EXISTS restaurant.menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    price SMALLINT unsigned NOT NULL
) ENGINE=InnoDB;