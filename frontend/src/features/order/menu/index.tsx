import React, { useState } from "react";

import { MenuProps } from "../index";
import MenuItem from "./menu-item";

export default function Menu({ onChange, props }: MenuProps) {
  return (
    <div>
      {props.map((food: any, index: number) => {
        return (
          <MenuItem
            key={index}
            onChange={onChange}
            type={food.type}
            item={food}
          />
        );
      })}
    </div>
  );
}
