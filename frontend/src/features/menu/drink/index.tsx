import React from "react";

import { MenuProps } from "../index";

export default function Drink({ props }: MenuProps) {
  return (
    <div>
      <div className="title">Drinks</div>
      {props.map((drink: any, index: number) => {
        return (
          <article className="menu-item" key={index}>
            <h3 className="item-name">{drink.name}</h3>
            <strong className="item-price">${drink.price}</strong>
          </article>
        );
      })}
    </div>
  );
}
