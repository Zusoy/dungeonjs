import { VectorTuple } from 'services/socket'

export enum BlockType {
  Wall = 'wall',
  Floor = 'floor',
  Pillar = 'pillar'
}

export interface IBlock {
  readonly id: string
  readonly type: BlockType
  readonly position: VectorTuple
  readonly rotation: VectorTuple
}

export interface ICustomizableBlock<T extends object> extends IBlock {
  readonly customization: T
}

export class FloorBlock implements IBlock {
  readonly type = BlockType.Floor

  constructor(
    public readonly id: string,
    public readonly position: VectorTuple,
    public readonly rotation: VectorTuple
  ) {
  }
}

export class PillarBlock implements IBlock {
  readonly type = BlockType.Pillar

  constructor(
    public readonly id: string,
    public readonly position: VectorTuple,
    public readonly rotation: VectorTuple
  ) {
  }
}

export type FoundationBlock =
  FloorBlock |
  PillarBlock