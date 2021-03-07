import React, { useEffect, useState } from "react";

import Food from "./food";
import Drink from "./drink";
import Dessert from "./dessert";

import { apiFetch } from "../../modules/api-fetch";
export interface MenuProps {
  props: [];
  onChange: Function;
}

interface TotalStoreMenuItem {
  price: number;
  count: number;
}

const TotalStore = {
  compute() {
    let total = 0;
    TotalStore.items.forEach((value: TotalStoreMenuItem) => {
      total += value.price * value.count;
    });
    return total;
  },
  update(id: number, price: number, count: number) {
    TotalStore.items.set(id, {
      price,
      count,
    });
  },
  items: new Map<number, TotalStoreMenuItem>(),
};

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState({
    value: 0,
  });

  const itemChanged = (id: number, price: number, count: number) => {
    TotalStore.update(id, price, count);
    setTotal({
      ...total,
      value: TotalStore.compute(),
    });
  };

  useEffect(() => {
    apiFetch("menu").then((json) => setMenu(json.menu));
  }, []);

  function filterMenu(menu: any, type: string) {
    return menu.filter((item: any) => item.type === type);
  }

  return (
    <div>
      {menu.length > 0 ? (
        <>
          <div className="menu">
            <Food onChange={itemChanged} props={filterMenu(menu, "food")} />
            <aside className="aside">
              <Drink onChange={itemChanged} props={filterMenu(menu, "drink")} />
              <Dessert
                onChange={itemChanged}
                props={filterMenu(menu, "dessert")}
              />
            </aside>
          </div>
          <div>
            <h2>
              Total: $<span>{total.value}</span>
            </h2>
          </div>
        </>
      ) : (
        <>Error loading menu</>
      )}
    </div>
  );
}
