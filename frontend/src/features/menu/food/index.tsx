import React from "react";

import { MenuProps } from "../index";

export default function Food({ props }: MenuProps) {
  return (
    <div>
      <div className="title">Food</div>
      {props.map((food: any, index: number) => {
        return (
          <div>
            <article className="menu-item" key={index}>
              <h3 className="item-name">{food.name}</h3>
              <strong className="item-price">${food.price}</strong>
            </article>
          </div>
        );
      })}
    </div>
  );
}
