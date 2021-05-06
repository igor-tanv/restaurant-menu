
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
    let { order, discountValue } = TotalStore.checkDiscount()

    let newTotal = (order.length !== 0) ? order.reduce((total: any, item: any) => {
      return total += item.price * item.count
    }, 0) : 0

    newTotal -= discountValue

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
    let order: any[] = TotalStore.getSelectedItems()
    let discountValue: any = 0
    let main = order.filter((item: any) => (item.type === 'main'))
    let drink = order.filter((item: any) => (item.type === 'drink'))
    if (main.length != 0 && drink.length != 0) {
      let combos = Math.min(main.length, drink.length)
      let comboArray: any[] = []
      let i
      for (i = 0; i < combos; i++) {
        comboArray.push({
          main: main[i],
          drink: drink[i]
        })
      }
      comboArray.forEach((combo: any) => {
        let numOfCombos = Math.min(combo.main.count, combo.drink.count)
        discountValue += ((combo.main.price + combo.drink.price) * .1) * numOfCombos
      })
    }







    return { order, discountValue };
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