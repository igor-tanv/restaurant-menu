
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
    let orderedItems: any = TotalStore.checkDiscount()
    console.log(orderedItems)

    let newTotal = (orderedItems.length !== 0) ? orderedItems.reduce((total: any, item: any) => {
      return total += item.price * item.count
    }, 0) : 0

    if (TotalStore.total !== newTotal) {
      clearTimeout(TotalStore.reset_timer);
      TotalStore.reset_timer = setTimeout(() => {
        TotalStore.total = newTotal;
        TotalStore.onChange(newTotal);
      }, 50);
    }

  },

  onChange(t: number) { },

  checkDiscount() {
    let discountTrigger: any = {
      main: null,
      drink: null
    };
    let order: any = TotalStore.getSelectedItems()
    let discountedOrder: any = []

    order.forEach((item: any) => {
      if (item.type === 'main' || item.type === 'drink') discountTrigger[item.type] = item
    })

    if (discountTrigger.main !== null && discountTrigger.drink !== null) {
      discountedOrder = order.map((item: any) => {
        if (discountTrigger.main.id === item.id) item.price *= .9
        if (discountTrigger.drink.id === item.id) item.price *= .9
        return item
      })
    }

    return (discountedOrder.length !== 0) ? discountedOrder : order;
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

  items: new Map<number, TotalStoreMenuItem>(),

  getSelectedItems() {
    let selectedItems: Array<{
      id: number;
      count: number;
      type: string;
      price: number;
    }> = [];
    TotalStore.items.forEach((item: any) => {
      if (item.count !== 0) {
        selectedItems.push({
          id: item.id,
          count: item.count,
          type: item.type,
          price: item.price
        });
      }
    });
    return selectedItems;
  }
};