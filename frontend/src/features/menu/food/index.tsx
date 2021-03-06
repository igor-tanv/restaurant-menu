import React from "react";

type FoodProps = {
  props: [];
};

export default function Food({ props }: FoodProps) {
  return (
    <div>
      {props.map((meal: any, i: number) => (
        <article className="menu-item" key={i}>
          <h3 className="mains-name">{meal.name}</h3>
          <strong className="mains-price">${meal.price}</strong>
          <p className="mains-description">{meal.description}</p>
        </article>
      ))}
    </div>
  );
}
