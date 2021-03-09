import { DbProvider } from '../providers/DbProvider'
import { IdentityHelpers } from '../../helpers/IdentityHelpers'

const MENU = 'menu'
const ORDER = 'menu_order'
const ORDER_ITEM = 'menu_order_item'

enum OrderStatus {
  Preparing = 1,
  Ready = 2,
  Cancelled = 3,
}
export class RestaurantData {

  static async getMenu() {
    const db = await DbProvider.getConnection()
    return (await db.select().from(MENU))
  }

  static async getOrder(orderId: string) {
    const db = await DbProvider.getConnection()
    return await db(ORDER).where({ order_id: orderId }).select()
  }

  static async placeOrder(data: []) {
    const db = await DbProvider.getConnection()
    const order: any = {
      id: IdentityHelpers.generateUUID(),
      status: OrderStatus.Preparing
    }
    const rows = data.map((row: any) => ({
      order_id: order.id,
      item_id: row.id,
      item_count: row.count
    }))

    await db.insert(order).into(ORDER)
    await db.batchInsert(ORDER_ITEM, rows)

    return order
  }
}