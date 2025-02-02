import ICollection from 'Netcode/Collection/ICollection'
import User from 'Netcode/User'

export default class UserCollection implements ICollection<User> {
  private users: User[] = []

  add(user: User): void {
    this.users = [...this.users, user]
  }

  remove(user: User): void {
    this.users = this.users.filter(({ id }) => user.id !== id)
  }

  update(item: User, index: number): void {
    this.users = this.users.map((user, i) => i === index ? item : user)
  }

  find(id: string): User | null {
    return this.users.find(user => user.id === id) || null
  }

  *[Symbol.iterator](): IterableIterator<User> {
    for (const user of this.users) {
      yield user
    }
  }
}
