import React, { useEffect, useState } from "react";

import Menu from "./menu";

import { apiFetch } from "../../modules/api-fetch";

export interface MenuProps {
  props: [];
  onChange: Function;
}

interface TotalStoreMenuItem {
  price: number;
  count: number;
  type: string;
}

const TotalStore = {
  total: 0,
  reset_timer: setTimeout(() => {}, 0),
  compute() {
    let newTotal = 0;
    let types = new Map<string, boolean>();
    TotalStore.items.forEach((value: TotalStoreMenuItem) => {
      newTotal += value.price * value.count;
      types.set(value.type, true);
    });

    if (types.get("drink") && types.get("main")) {
      newTotal -= newTotal * 0.1;
    }

    if (TotalStore.total !== newTotal) {
      clearTimeout(TotalStore.reset_timer);
      TotalStore.reset_timer = setTimeout(() => {
        TotalStore.total = newTotal;
        TotalStore.onChange(newTotal);
      }, 50);
    }
  },
  update(id: number, price: number, count: number, type: string) {
    TotalStore.items.set(id, {
      price,
      count,
      type,
    });
    TotalStore.compute();
  },
  onChange(t: number) {},
  items: new Map<number, TotalStoreMenuItem>(),
};

export default function Order() {
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState(0);
  const [menuIds, setMenuIds] = useState<number[]>([]);

  TotalStore.onChange = (t: number) => {
    setTotal(t);
  };

  const itemChanged = (
    id: number,
    price: number,
    count: number,
    type: string
  ) => {
    TotalStore.update(id, price, count, type);
    setMenuIds([...menuIds, id]);
  };

  // order will have: id:number, total:number, itemIds:array of numbers, ready:boolean
  //client will pass total and itemIds to server
  function handleSubmit(e: any) {
    console.log("total: ", total, "menuIds: ", menuIds);
    e.preventDefault();
    apiFetch("order", "post", { total, menuIds })
      .then((json) => {
        if (json.errors) {
          console.log("error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    apiFetch("menu").then((json) => setMenu(json.menu));
  }, []);

  function filterMenu(menu: any, type: string) {
    return menu.filter((item: any) => item.type === type);
  }

  function orderPlaced(total: number) {
    return total !== 0 ? true : false;
  }

  return (
    <div>
      {menu.length > 0 ? (
        <>
          <div className="menu">
            <form onSubmit={handleSubmit} autoComplete="off">
              <Menu onChange={itemChanged} props={filterMenu(menu, "food")} />
              <button type="submit" disabled={!orderPlaced(total)}>
                Place Order
              </button>
            </form>
          </div>
          <div>
            <h2>
              Total: $<span>{total}</span>
            </h2>
          </div>
        </>
      ) : (
        <>Loading Menu</>
      )}
    </div>
  );
}
