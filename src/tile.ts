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
  isAir: () => boolean
  isUnbreakable: () => boolean
  isStone: () => boolean
  isBomb: () => boolean
  isBombClose: () => boolean
  isBombReallyClose: () => boolean
  isTmpFire: () => boolean
  isFire: () => boolean
  isExtraBomb: () => boolean
  isMonsterUp: () => boolean
  isMonsterRight: () => boolean
  isTmpMonsterRight: () => boolean
  isMonsterDown: () => boolean
  isTmpMonsterDown: () => boolean
  isMonsterLeft: () => boolean
  isGameOver: () => boolean
  draw: (g: CanvasRenderingContext2D, x: number, y: number) => void
  move: (x: number, y: number) => void
  update: (x: number, y: number) => void
  placeBomb: () => void
  explode: (x: number, y: number, fire: Tile) => void
}

class Air implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return true }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
  }

  move (x: number, y: number): void {
    this.player.y += y
    this.player.x += x
  }

  update (x: number, y: number): void { }

  placeBomb (): void {
    this.map.setTile(this.player.x, this.player.y, new Bomb(this.player, this.map))
  }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }
}

class Unbreakable implements Tile {
  isAir (): boolean { return false }
  isUnbreakable (): boolean { return true }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
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

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return true }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#0000cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
  update (x: number, y: number): void { }
  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    if (Math.random() < 0.1) this.map.setTile(x, y, new ExtraBomb(this.player, this.map))
    else this.map.setTile(x, y, fire)
  }
}

class Bomb implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return true }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return true }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#770000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.setTile(x, y, new BombClose(this.player, this.map))
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }
}

class BombClose implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return true }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return true }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc0000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.setTile(x, y, new BombReallyClose(this.player, this.map))
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }
}

class BombReallyClose implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return true }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return true }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#ff0000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.explodeWithFire(x, y - 1)
    this.explodeWithTmpFire(x, y + 1)
    this.explodeWithFire(x - 1, y)
    this.explodeWithTmpFire(x + 1, y)
    this.explodeWithFire(x, y)
    this.player.bombs++
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }

  private explodeWithFire (x: number, y: number): void {
    this.map.getTile(x, y).explode(x, y, new Fire(this.player, this.map))
  }

  private explodeWithTmpFire (x: number, y: number): void {
    this.map.getTile(x, y).explode(x, y, new TmpFire(this.player, this.map))
  }
}

class TmpFire implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return true }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.setTile(x, y, new Fire(this.player, this.map))
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }
}

export class Fire implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return true }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
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
    this.map.setTile(x, y, new Air(this.player, this.map))
  }

  placeBomb (): void {
    this.map.setTile(this.player.x, this.player.y, new Bomb(this.player, this.map))
  }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }
}

class ExtraBomb implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return true }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#00cc00'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void {
    this.player.y += y
    this.player.x += x
    this.player.bombs++
    this.map.setTile(this.player.x, this.player.y, new Air(this.player, this.map))
  }

  update (x: number, y: number): void { }

  placeBomb (): void {
    this.map.setTile(this.player.x, this.player.y, new Bomb(this.player, this.map))
  }

  explode (x: number, y: number, fire: Tile): void {
    this.player.bombs++
    this.map.setTile(x, y, fire)
  }
}

class MonsterUp implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return true }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.moveRight(x, y)
    this.moveUp(x, y)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }

  private moveUp (x: number, y: number): void {
    if (this.map.getTile(x, y - 1).isAir()) {
      this.map.setTile(x, y, new Air(this.player, this.map))
      this.map.setTile(x, y - 1, new MonsterUp(this.player, this.map))
    }
  }

  private moveRight (x: number, y: number): void {
    if (!this.map.getTile(x, y - 1).isAir()) {
      this.map.setTile(x, y, new MonsterRight(this.player, this.map))
    }
  }
}

class MonsterRight implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return true }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.moveDown(x, y)
    this.moveRight(x, y)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }

  private moveRight (x: number, y: number): void {
    if (this.map.getTile(x + 1, y).isAir()) {
      this.map.setTile(x, y, new Air(this.player, this.map))
      this.map.setTile(x + 1, y, new TmpMonsterRight(this.player, this.map))
    }
  }

  private moveDown (x: number, y: number): void {
    if (!this.map.getTile(x + 1, y).isAir()) {
      this.map.setTile(x, y, new MonsterDown(this.player, this.map))
    }
  }
}

class TmpMonsterRight implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return true }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.setTile(x, y, new MonsterRight(this.player, this.map))
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }
}

class MonsterDown implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return true }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.moveLeft(x, y)
    this.moveDown(x, y)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }

  private moveDown (x: number, y: number): void {
    if (this.map.getTile(x, y + 1).isAir()) {
      this.map.setTile(x, y, new Air(this.player, this.map))
      this.map.setTile(x, y + 1, new TmpMonsterDown(this.player, this.map))
    }
  }

  private moveLeft (x: number, y: number): void {
    if (!this.map.getTile(x, y + 1).isAir()) {
      this.map.setTile(x, y, new MonsterLeft(this.player, this.map))
    }
  }
}

class TmpMonsterDown implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return true }
  isMonsterLeft (): boolean { return false }
  isGameOver (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.map.setTile(x, y, new MonsterDown(this.player, this.map))
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }
}

class MonsterLeft implements Tile {
  constructor (private readonly player: Player, private readonly map: Map) { }

  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return false }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return true }
  isGameOver (): boolean { return true }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }

  update (x: number, y: number): void {
    this.moveUp(x, y)
    this.moveLeft(x, y)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    this.map.setTile(x, y, fire)
  }

  private moveLeft (x: number, y: number): void {
    if (this.map.getTile(x - 1, y).isAir()) {
      this.map.setTile(x, y, new Air(this.player, this.map))
      this.map.setTile(x - 1, y, new MonsterLeft(this.player, this.map))
    }
  }

  private moveUp (x: number, y: number): void {
    if (!this.map.getTile(x - 1, y).isAir()) {
      this.map.setTile(x, y, new MonsterUp(this.player, this.map))
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

  getTile (x: number, y: number): Tile {
    return this.map[y][x]
  }

  setTile (x: number, y: number, tile: Tile): void {
    this.map[y][x] = tile
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
    this.map.getTile(this.x, this.y - 1).move(0, -1)
  }

  moveDown (): void {
    this.map.getTile(this.x, this.y + 1).move(0, 1)
  }

  moveLeft (): void {
    this.map.getTile(this.x - 1, this.y).move(-1, 0)
  }

  moveRight (): void {
    this.map.getTile(this.x + 1, this.y).move(1, 0)
  }

  placeBomb (): void {
    if (this.bombs > 0) {
      this.map.getTile(this.x, this.y).placeBomb()
      this.bombs--
    }
  }

  hasDelay (): boolean {
    if (--this.delay > 0) return true
    this.delay = this.DELAY
    return false
  }

  handleGameOver (): void {
    if (this.map.getTile(this.x, this.y).isGameOver()) this.gameOver = true
  }

  draw (g: CanvasRenderingContext2D): void {
    if (!this.gameOver) {
      g.fillStyle = '#00ff00'
      g.fillRect(this.x * TILE_SIZE, this.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
    }
  }
}
