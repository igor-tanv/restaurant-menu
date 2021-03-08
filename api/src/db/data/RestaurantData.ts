import { DbProvider } from '../providers/DbProvider'
import { IdentityHelpers } from '../../helpers/IdentityHelpers'

export class RestaurantData {

  static async getMenu() {
    const db = await DbProvider.getConnection()
    return (await db.select().from('menu'))
  }

  static async placeOrder(total: number) {
    const db = await DbProvider.getConnection()
    const row: any = {
      id: IdentityHelpers.generateUUID(),
      total,
      ready: false
    }
    return await db.insert(row).into("orders")
  }

}