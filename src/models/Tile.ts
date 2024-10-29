export class Tile {
  readonly id: number
  value: number

  constructor(value: number) {
    this.id = Date.now()
    this.value = value
  }
}
