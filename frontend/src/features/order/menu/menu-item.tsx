import React, { useState } from "react";

interface MenuItemProps {
  item: {
    price: Number;
    name: String;
    id: Number;
  };
  onChange: Function;
  type: String;
}

const FoodItemLocalStore = {
  setCount(id: Number, count: Number) {
    localStorage.setItem(`menu_item_id_${id}`, String(count));
  },
  getCount(id: Number) {
    return parseInt(String(localStorage.getItem(`menu_item_id_${id}`))) || 0;
  },
};

export default function MenuItem({ onChange, item, type }: MenuItemProps) {
  const [data, setData] = useState({
    count: FoodItemLocalStore.getCount(item.id), // default!!!
  });

  data.count = FoodItemLocalStore.getCount(item.id);

  const menuItemCountChange = (e: any) => {
    data.count = parseInt(e.target.value) || 0;
    FoodItemLocalStore.setCount(item.id, data.count);
    setData({ ...data });
    //onChange(item.id, item.price, data.count, type);
  };

  onChange(item.id, item.price, data.count, type);

  return (
    <div>
      <article className="menu-item" data-item-type={type}>
        <h3 className="item-name">{item.name}</h3>
        <input
          type="number"
          className="menu-item-count"
          min="0"
          value={String(data.count)}
          onChange={menuItemCountChange}
        />
        <strong className="item-price">${item.price.toFixed(2)}</strong>
      </article>
    </div>
  );
}
