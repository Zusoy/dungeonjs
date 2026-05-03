import { injectable, Disposable as IDisposable } from 'tsyringe'
import type { RedisClientType as RedisClient } from 'redis'

@injectable()
export class Client implements IDisposable {
  constructor(private readonly client: RedisClient) {}

  public connect(): Promise<void> {
    return new Promise((res, rej) => {
      this.client
        .on('connect', () => res())
        .on('error', (err: Error) => rej(err))
        .connect()
    })
  }

  public hSet(key: string, field: string, value: any): Promise<number> {
    return this.client.hSet(key, field, value)
  }

  public hGet<T>(key: string): Promise<T> {
    return this.client.hGetAll(key) as Promise<T>
  }

  public get(key: string): Promise<string|null> {
    return this.client.get(key)
  }

  public set(key: string, value: string): Promise<string|null> {
    return this.client.set(key, value)
  }

  public delete(key: string): Promise<number> {
    return this.client.del(key)
  }

  public addIndex(key: string, value: string): Promise<number> {
    return this.client.sAdd(key, value)
  }

  public removeIndex(key: string, value: string): Promise<number> {
    return this.client.sRem(key, value)
  }

  public getIndex(key: string): Promise<string[]> {
    return this.client.sMembers(key)
  }

  dispose(): Promise<void> | void {
    this.client.destroy()
  }
}
