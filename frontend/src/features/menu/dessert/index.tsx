import React from "react";

import { MenuProps } from "../index";

export default function Dessert({ props }: MenuProps) {
  return (
    <div>
      <div className="title">Dessert</div>
      {props.map((dessert: any, index: number) => {
        return (
          <article className="menu-item" key={index}>
            <h3 className="item-name">{dessert.name}</h3>
            <strong className="item-price">${dessert.price}</strong>
          </article>
        );
      })}
    </div>
  );
}
