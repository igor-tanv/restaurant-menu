import React, { useEffect, useState } from "react";

import Food from "./food";
import Drink from "./drink";
import Dessert from "./dessert";

import { apiFetch } from "../../modules/api-fetch";
export interface MenuProps {
  props: [];
}

export default function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    apiFetch("menu").then((json) => setMenu(json.menu));
  }, []);

  function filterMenu(menu: any, type: string) {
    return menu.filter((item: any) => item.type === type);
  }

  return (
    <div>
      {menu.length > 0 ? (
        <div className="menu">
          <Food props={filterMenu(menu, "food")} />
          <aside className="aside">
            <Drink props={filterMenu(menu, "drink")} />
            <Dessert props={filterMenu(menu, "dessert")} />
          </aside>
        </div>
      ) : (
        <>Error loading menu</>
      )}
    </div>
  );
}
