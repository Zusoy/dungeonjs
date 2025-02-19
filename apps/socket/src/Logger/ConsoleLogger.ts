import type ILogger from 'ILogger'

export default class ConsoleLogger implements ILogger {
  info(message: any, ...groups: any): void {
    console.log(message, ...groups)
  }

  error(message: any, ...groups: any): void {
    console.error(message, ...groups)
  }
}
