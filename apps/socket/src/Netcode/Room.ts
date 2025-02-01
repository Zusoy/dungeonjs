import INetcodeItem from 'Netcode/INetcodeItem'

export default class Room implements INetcodeItem {
  constructor(
    public readonly roomId: string,
    public readonly createdById: string
  ) {
  }

  public getId(): string {
    return this.roomId
  }
}
