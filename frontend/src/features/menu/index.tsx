import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

import { apiFetch } from "../../modules/api-fetch";

type CardProps = {
  item: string;
  name: string;
  price: number;
};

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    apiFetch("menu").then((json) => setMenu(json.menu));
  }, []);

  return <div>Food, Drink and Dessert props go here</div>;
}

// {menu.length > 0 ? (
//   <div>
//     {menu
//       .filter((food: any) => food.food_type === "food")
//       .map((item, i) => {
//         const { id, food_type, food_name, price } = item;
//         return (
//           <Card key={id} className="card-container blog-card">
//             <Card.Body className="pt-3">
//               <Card.Title>
//                 <h4>{food_type}</h4>
//               </Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">
//                 Name: {food_name}, Price: {price}
//               </Card.Subtitle>
//             </Card.Body>
//           </Card>
//         );
//       })}
//   </div>
// ) : (
//   <div>Error loading menu</div>
// )}
