import React, { useEffect, useState } from "react";

import Menu from "./menu";

import { apiFetch } from "../../modules/api-fetch";

export interface MenuProps {
  props: [];
  onChange: Function;
}

interface TotalStoreMenuItem {
  id: number;
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
      id,
      price,
      count,
      type,
    });
    TotalStore.compute();
  },
  reset() {
    TotalStore.items.clear();
    localStorage.clear();
    TotalStore.total = 0;
  },
  onChange(t: number) {},
  items: new Map<number, TotalStoreMenuItem>(),
};

export default function Order() {
  const [menu, setMenu] = useState([]);
  const [total, setTotal] = useState(0);

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
  };

  function getSelectedItems(TotalStore: any) {
    let selectedItems: Array<{
      id: number;
      count: number;
    }> = [];
    TotalStore.items.forEach((item: any) => {
      if (item.count !== 0) {
        selectedItems.push({
          id: item.id,
          count: item.count,
        });
      }
    });
    return selectedItems;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const selectedItems = getSelectedItems(TotalStore);
    apiFetch("order", "post", { selectedItems })
      .then((json) => {
        alert("Order has been submitted");
        setTotal(0);
        TotalStore.reset();
        localStorage.setItem("last_order_id", json.order.id);

        function checkOrderStatus() {
          apiFetch(
            `order/${json.order.id || localStorage.getItem("last_order_id")}`
          ).then((placedOrder) => {
            const { order } = placedOrder;
            if (order[0].status === 2) {
              alert("Your order is ready!");
            } else {
              setTimeout(checkOrderStatus, 5000);
            }
          });
        }
        checkOrderStatus();
      })
      .catch((error) => {
        alert("Server error");
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
            <form id="menu-form" onSubmit={handleSubmit} autoComplete="off">
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
