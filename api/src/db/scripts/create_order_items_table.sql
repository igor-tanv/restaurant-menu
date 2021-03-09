CREATE TABLE IF NOT EXISTS restaurant.order_items (
    item_id INT NOT NULL,
    order_id BINARY(36) NOT NULL PRIMARY KEY,
   
    FOREIGN KEY (order_id) REFERENCES orders(id)
    FOREIGN KEY (menu_id) REFERENCES menu(id)
) ENGINE=InnoDB;