export default interface ILogger {
  info(message: any, ...groups: any): void
  error(message: any, ...groups: any): void
}
