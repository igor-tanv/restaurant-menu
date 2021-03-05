import { DbProvider } from '../providers/DbProvider'

export class MenuData {
  static async getMenu() {
    const db = await DbProvider.getConnection()
    return (await db.select().from('menu'))
  }
}