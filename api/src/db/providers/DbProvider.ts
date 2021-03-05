import Knex from 'knex'

export class DbProvider {
  private static mySqlConnection: any

  static async getConnection() {

    if (!this.mySqlConnection) {
      const config = {
        client: 'mysql',
        connection: {
          host: process.env.DB_URI,
          port: 3306,
          user: 'admin',
          password: process.env.PASSWORD,
          database: 'restaurant',
        }
      }
      this.mySqlConnection = Knex(config).on('query-error', function (error: any, obj: any, builder: any) {
        console.log('Error', error)
      }).on('query-response', function (resp: any, obj: any, builder: any) {
        console.log('Success')
      })
    }
    return this.mySqlConnection
  }
}