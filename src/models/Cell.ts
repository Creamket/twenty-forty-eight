import { Tile } from './Tile'

export class Cell {
  readonly x: number
  readonly y: number
  readonly id: string
  tile: Tile | null

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.id = `${x}${y}`
    this.tile = null
  }
}
