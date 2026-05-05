import { type RedisClientType as RedisClient, createClient } from 'redis'

export class Factory {
  public static create(url: string, password?: string): Promise<RedisClient> {
    return new Promise((res, rej) => {
      const client = createClient({
        url,
        password
      })

      client.on('error', (err: Error) => {
        rej(err)
      })

      res(client as RedisClient)
    })
  }
}
