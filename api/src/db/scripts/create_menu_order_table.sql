CREATE TABLE IF NOT EXISTS restaurant.menu_order (
    id  BINARY(36) NOT NULL PRIMARY KEY,
    status TINYINT(1) DEFAULT 0 NOT NULL
) ENGINE=InnoDB;