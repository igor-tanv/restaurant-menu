import React, { useEffect, useState } from "react";

import Item from "./item";

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

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState(0);

  TotalStore.onChange = (t: number) => {
    console.log(`new totla: ${t}`);
    setTotal(t);
  };

  const itemChanged = (
    id: number,
    price: number,
    count: number,
    type: string
  ) => {
    TotalStore.update(id, price, count, type);
  };

  /*
  const submitOrder = () => {
    //const order = await apiRequest(....)
    // Order -> ready (boolean)

    localStorage.setItem("latest_order_id", order.id);

    // On the server:

    // const order = await Order.create(...)
    // timeout: order.set("ready", true).save()

    const checkState = () => {
      const latestOrderId = localStorage.getItem("latest_order_id");
      if (!latestOrderId) {
        return;
      }
      // GET /order/${latestOrderId}
      if (order.ready) {
        // Show the popup
        localStorage.setItem("latest_order_id", "");
        setPopupMessage("Your order is ready.");
      } else {
        setTimeout(checkState, 5000);
      }
    };

    checkState();
  };*/

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
            <Item onChange={itemChanged} props={filterMenu(menu, "food")} />
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
