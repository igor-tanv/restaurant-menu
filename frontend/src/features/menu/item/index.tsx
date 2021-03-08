import React from "react";

import { MenuProps } from "../index";
import MenuItem from "./menu-item";

export default function Item({ onChange, props }: MenuProps) {
  return (
    <div>
      <div className="title">Food</div>
      {props.map((food: any, index: number) => {
        return (
          <MenuItem key={index} onChange={onChange} type="food" item={food} />
        );
      })}
    </div>
  );
}
