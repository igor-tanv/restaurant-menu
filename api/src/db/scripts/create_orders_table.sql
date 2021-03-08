CREATE TABLE IF NOT EXISTS restaurant.orders (
    id  BINARY(36) NOT NULL PRIMARY KEY,
    total SMALLINT unsigned NOT NULL,
    ready TINYINT(1) DEFAULT 0 NOT NULL
) ENGINE=InnoDB;