import React, { useEffect, useState } from "react";
import Food from ".";

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
    localStorage.setItem(`menu_item_count_${id}`, String(count));
  },
  getCount(id: Number) {
    return parseInt(localStorage.getItem(`menu_item_count_${id}`) || "0");
  },
  initialized: false,
};

export default function MenuItem({ onChange, item, type }: MenuItemProps) {
  const [data, setData] = useState({
    count: FoodItemLocalStore.getCount(item.id),
  });

  const menuItemCountChange = (e: any) => {
    data.count = parseInt(e.target.value);
    setData({ ...data });
    FoodItemLocalStore.setCount(item.id, data.count);
    onChange(item.id, item.price, data.count);
  };

  if (!FoodItemLocalStore.initialized) {
    onChange(item.id, item.price, data.count);
    FoodItemLocalStore.initialized = true;
  }

  return (
    <div>
      <article className="menu-item" data-item-type={type}>
        <h3 className="item-name">{item.name}</h3>

        <input
          type="number"
          className="menu-item-count"
          value={data.count}
          onChange={menuItemCountChange}
        />
        <strong className="item-price">${item.price}</strong>
      </article>
    </div>
  );
}
