import type { ILogger } from 'Domain/ILogger'

export class ConsoleLogger implements ILogger {
  info(message: any, ...groups: any): void {
    console.log(message, ...groups)
  }

  error(message: any, ...groups: any): void {
    console.error(message, ...groups)
  }
}
