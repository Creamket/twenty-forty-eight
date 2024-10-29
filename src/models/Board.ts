import { Cell } from './Cell'
import { Tile } from './Tile'

export class Board {
  cells: Cell[][] = []
  availableCells: number = 16
  score: number = 0
  turn: number = 0
  bestScore: number = 0

  constructor(gameState?: string) {
    if (gameState === undefined) return

    const prevBoard: Board = JSON.parse(gameState)

    this.cells = prevBoard.cells
    this.availableCells = prevBoard.availableCells
    this.score = prevBoard.score
    this.turn = prevBoard.turn
    this.bestScore = prevBoard.bestScore
  }

  public initCells() {
    for (let i = 0; i < 4; i++) {
      const row: Cell[] = []

      for (let j = 0; j < 4; j++) {
        row.push(new Cell(j, i))
      }

      this.cells.push(row)
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board()
    newBoard.availableCells = this.availableCells
    newBoard.cells = this.cells
    newBoard.score = this.score
    newBoard.turn = this.turn
    newBoard.bestScore = this.score > this.bestScore ? this.score : this.bestScore

    localStorage.setItem('gameState', JSON.stringify(newBoard))

    return newBoard
  }

  public prepareForStart() {
    const gameState = localStorage.getItem('gameState')

    this.spawnTile()
    this.spawnTile()

    if (gameState !== null) {
      const prevBoard: Board = JSON.parse(gameState)

      this.bestScore = prevBoard.bestScore
    }

    localStorage.setItem('gameState', JSON.stringify(this))
  }

  public moveUp() {
    let needSpawn: boolean = false

    for (let i = 0; i < this.cells[0].length; i++) {
      let top = 0
      let bottom = 1

      while (bottom < this.cells.length) {
        if (this.cells[bottom][i].tile === null) {
          bottom++
          continue
        }

        if (this.cells[top][i].tile === null) {
          this.cells[top][i].tile = this.cells[bottom][i].tile
          this.cells[bottom][i].tile = null
          bottom++
          needSpawn = true
          continue
        }

        if (this.cells[top][i].tile?.value === this.cells[bottom][i].tile?.value) {
          const newValue: number = (this.cells[top][i].tile?.value || 1) * 2
          this.score += newValue

          this.cells[top][i].tile = new Tile(newValue)
          this.cells[bottom][i].tile = null
          this.availableCells++
          top++
          bottom++
          needSpawn = true
          continue
        }

        if (bottom - top > 1) {
          top++
          continue
        }

        top++
        bottom++
      }
    }

    if (needSpawn) {
      this.turn++
      this.spawnTile()
    }
  }

  public moveDown() {
    let needSpawn: boolean = false

    for (let i = 0; i < this.cells[0].length; i++) {
      let top = 2
      let bottom = 3

      while (top >= 0) {
        if (this.cells[top][i].tile === null) {
          top--
          continue
        }

        if (this.cells[bottom][i].tile === null) {
          this.cells[bottom][i].tile = this.cells[top][i].tile
          this.cells[top][i].tile = null
          top--
          needSpawn = true
          continue
        }

        if (this.cells[top][i].tile?.value === this.cells[bottom][i].tile?.value) {
          const newValue: number = (this.cells[top][i].tile?.value || 1) * 2
          this.score += newValue

          this.cells[bottom][i].tile = new Tile(newValue)
          this.cells[top][i].tile = null
          this.availableCells++
          top--
          bottom--
          needSpawn = true
          continue
        }

        if (bottom - top > 1) {
          bottom--
          continue
        }

        top--
        bottom--
      }
    }

    if (needSpawn) {
      this.turn++
      this.spawnTile()
    }
  }

  public moveLeft() {
    let needSpawn: boolean = false

    for (let i = 0; i < this.cells.length; i++) {
      let left = 0
      let right = 1

      while (right < this.cells[i].length) {
        if (this.cells[i][right].tile === null) {
          right++
          continue
        }

        if (this.cells[i][left].tile === null) {
          this.cells[i][left].tile = this.cells[i][right].tile
          this.cells[i][right].tile = null
          right++
          needSpawn = true
          continue
        }

        if (this.cells[i][left].tile?.value === this.cells[i][right].tile?.value) {
          const newValue: number = (this.cells[i][left].tile?.value || 1) * 2
          this.score += newValue

          this.cells[i][left].tile = new Tile(newValue)
          this.cells[i][right].tile = null
          this.availableCells++
          left++
          right++
          needSpawn = true
          continue
        }

        if (right - left > 1) {
          left++
          continue
        }

        left++
        right++
      }
    }

    if (needSpawn) {
      this.turn++
      this.spawnTile()
    }
  }

  public moveRight() {
    let needSpawn: boolean = false

    for (let i = 0; i < this.cells.length; i++) {
      let left = 2
      let right = 3

      while (left >= 0) {
        if (this.cells[i][left].tile === null) {
          left--
          continue
        }

        if (this.cells[i][right].tile === null) {
          this.cells[i][right].tile = this.cells[i][left].tile
          this.cells[i][left].tile = null
          left--
          needSpawn = true
          continue
        }

        if (this.cells[i][left].tile?.value === this.cells[i][right].tile?.value) {
          const newValue: number = (this.cells[i][left].tile?.value || 1) * 2
          this.score += newValue

          this.cells[i][right].tile = new Tile(newValue)
          this.cells[i][left].tile = null
          this.availableCells++
          left--
          right--
          needSpawn = true
          continue
        }

        if (right - left > 1) {
          right--
          continue
        }

        left--
        right--
      }
    }

    if (needSpawn) {
      this.turn++
      this.spawnTile()
    }
  }

  private spawnTile() {
    const tileId = Math.floor(Math.random() * this.availableCells + 1)
    let currentId = 1

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.cells[i][j].tile !== null) continue

        if (tileId === currentId) {
          this.cells[i][j].tile = new Tile(Math.random() > 0.9 ? 4 : 2)
          this.availableCells--
          return
        }

        currentId++
      }
    }
  }
}
