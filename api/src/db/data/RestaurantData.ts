import { DbProvider } from '../providers/DbProvider'
import { IdentityHelpers } from '../../helpers/IdentityHelpers'

export enum OrderStatus {
  Preparing = 1,
  Ready = 2,
  Cancelled = 3,
}
export class RestaurantData {

  static async getMenu() {
    const db = await DbProvider.getConnection()
    return (await db.select().from('menu'))
  }

  static async placeOrder(total: number) {
    // not working
    console.log(IdentityHelpers.generateUUID(), 13)
    const db = await DbProvider.getConnection()
    const row: any = {
      id: IdentityHelpers.generateUUID(),
      status: OrderStatus.Preparing
    }
    const order = await db.insert(row).into("orders")
    console.log(order)
    return order
  }

}