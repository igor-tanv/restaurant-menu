import React from "react";

import { MenuProps } from "../index";
import MenuItem from "./menu-item";

export default function Menu({ onChange, props }: MenuProps) {
  const menuCategories: any = props.reduce((categories: any, item: any) => {
    if (!categories[item.type]) {
      categories[item.type] = [];
    }
    categories[item.type].push(item);
    return categories;
  }, {});

  return (
    <div>
      {Object.entries(menuCategories).map(([type, menuItems]: any) => (
        <div key={type}>
          <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
          {menuItems.map((item: any, index: number) => (
            <MenuItem
              key={index}
              onChange={onChange}
              type={item.type}
              item={item}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
