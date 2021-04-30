
export interface TotalStoreMenuItem {
  id: number;
  price: number;
  count: number;
  type: string;
}


export const TotalStore = {
  total: 0,
  reset_timer: setTimeout(() => { }, 0),

  compute() {
    let newTotal = 0;
    TotalStore.items.forEach((value: TotalStoreMenuItem) => newTotal += value.price * value.count);
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

  itemChanged(
    id: number,
    price: number,
    count: number,
    type: string
  ) {
    TotalStore.update(id, price, count, type);
  },

  reset() {
    TotalStore.items.clear();
    localStorage.clear();
    TotalStore.total = 0;
  },
  onChange(t: number) { },

  items: new Map<number, TotalStoreMenuItem>(),

  getSelectedItems() {
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
};