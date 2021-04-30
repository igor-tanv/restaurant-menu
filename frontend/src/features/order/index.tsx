import React, { useEffect, useState } from "react";

import Menu from "./menu";

import { apiFetch } from "../../modules/api-fetch";
import { TotalStore } from "../../modules/total-store";

export interface MenuProps {
  props: Array<{}>;
  onChange: Function;
}

export default function Order() {
  const [menu, setMenu] = useState<Array<{}>>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    apiFetch("menu").then((json) => setMenu(json.menu));
  }, []);

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
        TotalStore.reset();
        localStorage.setItem("last_order_id", json.order.id);
        setTotal(0);

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

  function orderPlaced(total: number) {
    return total !== 0 ? true : false;
  }

  return (
    <div>
      {menu.length > 0 ? (
        <>
          <div className="menu">
            <div className="menu-title">Food Menu</div>
            <h3>HOT DEALS</h3>
            <ul>
              <li>Get 10% off each main and drink combo</li>
              <li>
                Hungry Date Offer! Get 2 mains + 2 drinks + 1 dessert for 40.00
              </li>
            </ul>
            <form id="menu-form" onSubmit={handleSubmit} autoComplete="off">
              <Menu onChange={itemChanged} props={menu} />
              <button type="submit" disabled={!orderPlaced(total)}>
                Place Order
              </button>
            </form>
          </div>
          <div className="order-total">
            <h2>
              Total: $<span>{total.toFixed(2)}</span>
            </h2>
          </div>
        </>
      ) : (
        <>Loading Menu</>
      )}
    </div>
  );
}
