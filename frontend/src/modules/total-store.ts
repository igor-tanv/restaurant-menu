
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
    let types = new Map<string, boolean>();
    TotalStore.items.forEach((value: TotalStoreMenuItem) => {
      newTotal += value.price * value.count;
      types.set(value.type, true);
    });
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
  onChange(t: number) { },
  items: new Map<number, TotalStoreMenuItem>(),
};