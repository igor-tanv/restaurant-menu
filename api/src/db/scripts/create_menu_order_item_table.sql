CREATE TABLE IF NOT EXISTS restaurant.menu_order_item (
    item_id INT REFERENCES menu(id),
    item_count SMALLINT NOT NULL,
    order_id BINARY(36) REFERENCES menu_order(id)
) ENGINE=InnoDB;