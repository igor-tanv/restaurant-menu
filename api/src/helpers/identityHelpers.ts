import { performance } from 'perf_hooks'

export class IdentityHelpers {
  static generateUUID() {
    let d = new Date().getTime()
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now()
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      let r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      // tslint:disable-next-line:no-bitwise
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  }
}