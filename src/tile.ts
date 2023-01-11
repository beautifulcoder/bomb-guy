import { throwExpression } from './exception.js'
import {
  TILE_SIZE,
  FPS,
  TPS
} from './constant.js'

export enum RawTile {
  AIR,
  UNBREAKABLE,
  STONE,
  BOMB,
  BOMB_CLOSE,
  BOMB_REALLY_CLOSE,
  TMP_FIRE,
  FIRE,
  EXTRA_BOMB,
  MONSTER_UP,
  MONSTER_RIGHT,
  TMP_MONSTER_RIGHT,
  MONSTER_DOWN,
  TMP_MONSTER_DOWN,
  MONSTER_LEFT
}

interface Tile {
  isGameOver: () => boolean
  draw: (g: CanvasRenderingContext2D, x: number, y: number) => void
  move: (x: number, y: number) => void
  update: (x: number, y: number) => void
  placeBomb: () => void
  explode: (x: number, y: number, fire: Tile) => void
}

class Air implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
  }

  move (x: number, y: number): void {
    this.player.y += y
    this.player.x += x
  }

  update (x: number, y: number): void { }

  placeBomb (): void {
    this.map.makeBomb(this.player.x, this.player.y, this.player)
  }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }
}

class Unbreakable implements Tile {
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#999999'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
  update (x: number, y: number): void { }
  placeBomb (): void { }
  explode (x: number, y: number, fire: Tile): void { }
}

class Stone implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#0000cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
  update (x: number, y: number): void { }
  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    if (Math.random() < 0.1) this.map.makeExtraBomb(x, y, this.player)
    else this.map.makeFireWithTile(x, y, fire)
  }
}

class Bomb implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#770000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.makeBombClose(x, y, this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }
}

class BombClose implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc0000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.makeBombReallyClose(x, y, this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }
}

class BombReallyClose implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#ff0000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.explodeWithFire(x, y - 1, this.player)
    this.map.explodeWithTmpFire(x, y + 1, this.player)
    this.map.explodeWithFire(x - 1, y, this.player)
    this.map.explodeWithTmpFire(x + 1, y, this.player)
    this.map.explodeWithFire(x, y, this.player)
    this.player.bombs++
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }
}

class TmpFire implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.makeFire(x, y, this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }
}

class Fire implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#ffcc00'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void {
    this.player.y += y
    this.player.x += x
  }

  update (x: number, y: number): void {
    this.map.makeAir(x, y, this.player)
  }

  placeBomb (): void {
    this.map.makeBomb(this.player.x, this.player.y, this.player)
  }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }
}

class ExtraBomb implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#00cc00'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void {
    this.player.y += y
    this.player.x += x
    this.player.bombs++
    this.map.makeAir(this.player.x, this.player.y, this.player)
  }

  update (x: number, y: number): void { }

  placeBomb (): void {
    this.map.makeBomb(this.player.x, this.player.y, this.player)
  }

  explode (x: number, y: number, fire: Tile): void {
    this.player.bombs++
    this.map.makeFireWithTile(x, y, fire)
  }
}

class MonsterUp implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    const isAir = this.map.isAir(x, y - 1)
    this.moveRight(x, y, isAir)
    this.moveUp(x, y, isAir)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }

  private moveUp (x: number, y: number, isAir: boolean): void {
    if (isAir) {
      this.map.makeAir(x, y, this.player)
      this.map.makeMonsterUp(x, y - 1, this.player)
    }
  }

  private moveRight (x: number, y: number, isAir: boolean): void {
    if (!isAir) {
      this.map.makeMonsterRight(x, y, this.player)
    }
  }
}

class MonsterRight implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    const isAir = this.map.isAir(x + 1, y)
    this.moveDown(x, y, isAir)
    this.moveRight(x, y, isAir)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }

  private moveRight (x: number, y: number, isAir: boolean): void {
    if (isAir) {
      this.map.makeAir(x, y, this.player)
      this.map.makeTmpMonsterRight(x + 1, y, this.player)
    }
  }

  private moveDown (x: number, y: number, isAir: boolean): void {
    if (!isAir) {
      this.map.makeMonsterDown(x, y, this.player)
    }
  }
}

class TmpMonsterRight implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.makeMonsterRight(x, y, this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }
}

class MonsterDown implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    const isAir = this.map.isAir(x, y + 1)
    this.moveLeft(x, y, isAir)
    this.moveDown(x, y, isAir)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }

  private moveDown (x: number, y: number, isAir: boolean): void {
    if (isAir) {
      this.map.makeAir(x, y, this.player)
      this.map.makeTmpMonsterDown(x, y + 1, this.player)
    }
  }

  private moveLeft (x: number, y: number, isAir: boolean): void {
    if (!isAir) {
      this.map.makeMonsterLeft(x, y, this.player)
    }
  }
}

class TmpMonsterDown implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.makeMonsterDown(x, y, this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }
}

class MonsterLeft implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    const isAir = this.map.isAir(x - 1, y)
    this.moveUp(x, y, isAir)
    this.moveLeft(x, y, isAir)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.makeFireWithTile(x, y, fire)
  }

  private moveLeft (x: number, y: number, isAir: boolean): void {
    if (isAir) {
      this.map.makeAir(x, y, this.player)
      this.map.makeMonsterLeft(x - 1, y, this.player)
    }
  }

  private moveUp (x: number, y: number, isAir: boolean): void {
    if (!isAir) {
      this.map.makeMonsterUp(x, y, this.player)
    }
  }
}

export class Map {
  private readonly map: Tile[][]

  constructor (private readonly rawMap: RawTile[][]) {
    this.map = new Array(rawMap.length)
  }

  initialize (player: Player): void {
    for (let y = 0; y < this.rawMap.length; y++) {
      this.map[y] = new Array(this.rawMap[y].length)
      for (let x = 0; x < this.rawMap[y].length; x++) {
        this.map[y][x] = this.transformTile(player, this.rawMap[y][x])
      }
    }
  }

  isAir (x: number, y: number): boolean {
    return this.map[y][x] instanceof Air
  }

  isUnbreakable (x: number, y: number): boolean {
    return this.map[y][x] instanceof Unbreakable
  }

  isStone (x: number, y: number): boolean {
    return this.map[y][x] instanceof Stone
  }

  isBomb (x: number, y: number): boolean {
    return this.map[y][x] instanceof Bomb
  }

  isBombClose (x: number, y: number): boolean {
    return this.map[y][x] instanceof BombClose
  }

  isBombReallyClose (x: number, y: number): boolean {
    return this.map[y][x] instanceof BombReallyClose
  }

  isTmpFire (x: number, y: number): boolean {
    return this.map[y][x] instanceof TmpFire
  }

  isFire (x: number, y: number): boolean {
    return this.map[y][x] instanceof Fire
  }

  isExtraBomb (x: number, y: number): boolean {
    return this.map[y][x] instanceof ExtraBomb
  }

  isMonsterUp (x: number, y: number): boolean {
    return this.map[y][x] instanceof MonsterUp
  }

  isMonsterRight (x: number, y: number): boolean {
    return this.map[y][x] instanceof MonsterRight
  }

  isTmpMonsterRight (x: number, y: number): boolean {
    return this.map[y][x] instanceof TmpMonsterRight
  }

  isMonsterDown (x: number, y: number): boolean {
    return this.map[y][x] instanceof MonsterDown
  }

  isTmpMonsterDown (x: number, y: number): boolean {
    return this.map[y][x] instanceof TmpMonsterDown
  }

  isMonsterLeft (x: number, y: number): boolean {
    return this.map[y][x] instanceof MonsterLeft
  }

  isGameOver (x: number, y: number): boolean {
    return this.map[y][x].isGameOver()
  }

  move (playerX: number, playerY: number, x: number, y: number): void {
    this.map[playerY][playerX].move(x, y)
  }

  placeBomb (x: number, y: number): void {
    this.map[y][x].placeBomb()
  }

  explodeWithFire (x: number, y: number, player: Player): void {
    this.map[y][x].explode(x, y, new Fire(player, this))
  }

  explodeWithTmpFire (x: number, y: number, player: Player): void {
    this.map[y][x].explode(x, y, new TmpFire(player, this))
  }

  makeAir (x: number, y: number, player: Player): void {
    this.map[y][x] = new Air(player, this)
  }

  makeBomb (x: number, y: number, player: Player): void {
    this.map[y][x] = new Bomb(player, this)
  }

  makeBombClose (x: number, y: number, player: Player): void {
    this.map[y][x] = new BombClose(player, this)
  }

  makeBombReallyClose (x: number, y: number, player: Player): void {
    this.map[y][x] = new BombReallyClose(player, this)
  }

  makeExtraBomb (x: number, y: number, player: Player): void {
    this.map[y][x] = new ExtraBomb(player, this)
  }

  makeFireWithTile (x: number, y: number, fire: Tile): void {
    this.map[y][x] = fire
  }

  makeFire (x: number, y: number, player: Player): void {
    this.map[y][x] = new Fire(player, this)
  }

  makeMonsterUp (x: number, y: number, player: Player): void {
    this.map[y][x] = new MonsterUp(player, this)
  }

  makeMonsterRight (x: number, y: number, player: Player): void {
    this.map[y][x] = new MonsterRight(player, this)
  }

  makeTmpMonsterRight (x: number, y: number, player: Player): void {
    this.map[y][x] = new TmpMonsterRight(player, this)
  }

  makeMonsterDown (x: number, y: number, player: Player): void {
    this.map[y][x] = new MonsterDown(player, this)
  }

  makeTmpMonsterDown (x: number, y: number, player: Player): void {
    this.map[y][x] = new TmpMonsterDown(player, this)
  }

  makeMonsterLeft (x: number, y: number, player: Player): void {
    this.map[y][x] = new MonsterLeft(player, this)
  }

  update (): void {
    for (let y = 1; y < this.map.length; y++) {
      for (let x = 1; x < this.map[y].length; x++) {
        this.map[y][x].update(x, y)
      }
    }
  }

  draw (g: CanvasRenderingContext2D): void {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        this.map[y][x].draw(g, x, y)
      }
    }
  }

  private transformTile (player: Player, tile: RawTile): Tile {
    switch (tile) {
      case RawTile.AIR: return new Air(player, this)
      case RawTile.UNBREAKABLE: return new Unbreakable()
      case RawTile.STONE: return new Stone(player, this)
      case RawTile.BOMB: return new Bomb(player, this)
      case RawTile.BOMB_CLOSE: return new BombClose(player, this)
      case RawTile.BOMB_REALLY_CLOSE: return new BombReallyClose(player, this)
      case RawTile.TMP_FIRE: return new TmpFire(player, this)
      case RawTile.FIRE: return new Fire(player, this)
      case RawTile.EXTRA_BOMB: return new ExtraBomb(player, this)
      case RawTile.MONSTER_UP: return new MonsterUp(player, this)
      case RawTile.MONSTER_RIGHT: return new MonsterRight(player, this)
      case RawTile.TMP_MONSTER_RIGHT: return new TmpMonsterRight(player, this)
      case RawTile.MONSTER_DOWN: return new MonsterDown(player, this)
      case RawTile.TMP_MONSTER_DOWN: return new TmpMonsterDown(player, this)
      case RawTile.MONSTER_LEFT: return new MonsterLeft(player, this)
      default: throwExpression('Unexpected tile')
    }
  }
}

export class Player {
  x = 1
  y = 1

  delay = 0
  bombs = 1
  gameOver = false

  private readonly DELAY = FPS / TPS

  constructor (private readonly map: Map) {
    this.map.initialize(this)
  }

  moveUp (): void {
    this.map.move(this.x, this.y - 1, 0, -1)
  }

  moveDown (): void {
    this.map.move(this.x, this.y + 1, 0, 1)
  }

  moveLeft (): void {
    this.map.move(this.x - 1, this.y, -1, 0)
  }

  moveRight (): void {
    this.map.move(this.x + 1, this.y, 1, 0)
  }

  placeBomb (): void {
    if (this.bombs > 0) {
      this.map.placeBomb(this.x, this.y)
      this.bombs--
    }
  }

  hasDelay (): boolean {
    if (--this.delay > 0) return true
    this.delay = this.DELAY
    return false
  }

  handleGameOver (): void {
    if (this.map.isGameOver(this.x, this.y)) this.gameOver = true
  }

  draw (g: CanvasRenderingContext2D): void {
    if (!this.gameOver) {
      g.fillStyle = '#00ff00'
      g.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }
  }
}
