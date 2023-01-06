const TILE_SIZE = 30
const FPS = 30
const SLEEP = 1000 / FPS
const TPS = 2
const DELAY = FPS / TPS

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
  constructor (private readonly player: Player) { }

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
    map[this.player.y][this.player.x] = new Bomb(this.player)
  }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
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
  constructor (private readonly player: Player) { }

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
    if (Math.random() < 0.1) map[y][x] = new ExtraBomb(this.player)
    else map[y][x] = fire
  }
}

class Bomb implements Tile {
  constructor (private readonly player: Player) { }

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
    map[y][x] = new BombClose(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class BombClose implements Tile {
  constructor (private readonly player: Player) { }

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
    map[y][x] = new BombReallyClose(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class BombReallyClose implements Tile {
  constructor (private readonly player: Player) { }

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
    map[y - 1][x + 0].explode(x + 0, y - 1, new Fire(this.player))
    map[y + 1][x + 0].explode(x + 0, y + 1, new TmpFire(this.player))
    map[y + 0][x - 1].explode(x - 1, y + 0, new Fire(this.player))
    map[y + 0][x + 1].explode(x + 1, y + 0, new TmpFire(this.player))
    map[y][x].explode(x, y, new Fire(this.player))
    this.player.bombs++
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class TmpFire implements Tile {
  constructor (private readonly player: Player) { }

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
    map[y][x] = new Fire(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

export class Fire implements Tile {
  constructor (private readonly player: Player) { }

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
    map[y][x] = new Air(this.player)
  }

  placeBomb (): void {
    map[this.player.y][this.player.x] = new Bomb(this.player)
  }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class ExtraBomb implements Tile {
  constructor (private readonly player: Player) { }

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
    map[this.player.y][this.player.x] = new Air(this.player)
  }

  update (x: number, y: number): void { }

  placeBomb (): void {
    map[player.y][player.x] = new Bomb(this.player)
  }

  explode (x: number, y: number, fire: Tile): void {
    this.player.bombs++
    map[y][x] = fire
  }
}

class MonsterUp implements Tile {
  constructor (private readonly player: Player) { }

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
    if (map[y - 1][x].isAir()) {
      map[y][x] = new Air(this.player)
      map[y - 1][x] = new MonsterUp(this.player)
    } else map[y][x] = new MonsterRight(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class MonsterRight implements Tile {
  constructor (private readonly player: Player) { }

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
    if (map[y][x + 1].isAir()) {
      map[y][x] = new Air(this.player)
      map[y][x + 1] = new TmpMonsterRight(this.player)
    } else map[y][x] = new MonsterDown(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class TmpMonsterRight implements Tile {
  constructor (private readonly player: Player) { }

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
    map[y][x] = new MonsterRight(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class MonsterDown implements Tile {
  constructor (private readonly player: Player) { }

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
    if (map[y + 1][x].isAir()) {
      map[y][x] = new Air(this.player)
      map[y + 1][x] = new TmpMonsterDown(this.player)
    } else map[y][x] = new MonsterLeft(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class TmpMonsterDown implements Tile {
  constructor (private readonly player: Player) { }

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
    map[y][x] = new MonsterDown(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

class MonsterLeft implements Tile {
  constructor (private readonly player: Player) { }

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
    if (map[y][x - 1].isAir()) {
      map[y][x] = new Air(this.player)
      map[y][x - 1] = new MonsterLeft(this.player)
    } else map[y][x] = new MonsterUp(this.player)
  }

  placeBomb (): void { }

  explode (x: number, y: number, fire: Tile): void {
    map[y][x] = fire
  }
}

export class Player {
  x = 1
  y = 1

  delay = 0
  bombs = 1
  gameOver = false

  constructor (private readonly map: Tile[][]) { }

  moveUp (): void {
    this.map[this.y + -1][this.x + 0].move(0, -1)
  }

  moveDown (): void {
    this.map[this.y + 1][this.x + 0].move(0, 1)
  }

  moveLeft (): void {
    this.map[this.y + 0][this.x + -1].move(-1, 0)
  }

  moveRight (): void {
    this.map[this.y + 0][this.x + 1].move(1, 0)
  }

  placeBomb (): void {
    if (this.bombs > 0) {
      this.map[this.y][this.x].placeBomb()
      this.bombs--
    }
  }
}

interface Input {
  isUp: () => boolean
  isDown: () => boolean
  isLeft: () => boolean
  isRight: () => boolean
  isPlace: () => boolean
  handle: () => void
}

export class Up implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return true }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    this.player.moveUp()
  }
}

export class Down implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return false }
  isDown (): boolean { return true }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    this.player.moveDown()
  }
}

export class Left implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return true }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    this.player.moveLeft()
  }
}

export class Right implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return true }
  isPlace (): boolean { return false }
  handle (): void {
    this.player.moveRight()
  }
}

export class Place implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return true }
  handle (): void {
    this.player.placeBomb()
  }
}

export const rawMap: RawTile[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 2, 2, 2, 2, 2, 1],
  [1, 0, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 0, 0, 0, 1],
  [1, 2, 1, 2, 1, 0, 1, 0, 1],
  [1, 2, 2, 2, 2, 0, 0, 10, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1]
]

export const map: Tile[][] = new Array(rawMap.length)
export const player = new Player(map)

function transformTile (tile: RawTile): Tile {
  switch (tile) {
    case RawTile.AIR: return new Air(player)
    case RawTile.UNBREAKABLE: return new Unbreakable()
    case RawTile.STONE: return new Stone(player)
    case RawTile.BOMB: return new Bomb(player)
    case RawTile.BOMB_CLOSE: return new BombClose(player)
    case RawTile.BOMB_REALLY_CLOSE: return new BombReallyClose(player)
    case RawTile.TMP_FIRE: return new TmpFire(player)
    case RawTile.FIRE: return new Fire(player)
    case RawTile.EXTRA_BOMB: return new ExtraBomb(player)
    case RawTile.MONSTER_UP: return new MonsterUp(player)
    case RawTile.MONSTER_RIGHT: return new MonsterRight(player)
    case RawTile.TMP_MONSTER_RIGHT: return new TmpMonsterRight(player)
    case RawTile.MONSTER_DOWN: return new MonsterDown(player)
    case RawTile.TMP_MONSTER_DOWN: return new TmpMonsterDown(player)
    case RawTile.MONSTER_LEFT: return new MonsterLeft(player)
    default: throwExpression('Unexpected tile')
  }
}

export function transformMap (): void {
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length)
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x])
    }
  }
}

export const inputs: Input[] = []

export function update (): void {
  handleInputs()
  if (hasDelay()) return
  updateMap()
}

export function handleInputs (): void {
  while (inputs.length > 0 && !player.gameOver) {
    const input = inputs.pop() ?? throwExpression('Invalid key input')
    input.handle()
  }
  handleGameOver()
}

function handleGameOver (): void {
  if (
    map[player.y][player.x].isGameOver()
  ) player.gameOver = true
}

function hasDelay (): boolean {
  if (--player.delay > 0) return true
  player.delay = DELAY
  return false
}

function updateMap (): void {
  for (let y = 1; y < map.length; y++) {
    for (let x = 1; x < map[y].length; x++) {
      map[y][x].update(x, y)
    }
  }
}

function throwExpression (message: string): never {
  throw new Error(message)
}

function createGraphics (): CanvasRenderingContext2D {
  const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement
  const g = canvas.getContext('2d') ?? throwExpression('Cannot find the GameCanvas')

  g.clearRect(0, 0, canvas.width, canvas.height)
  return g
}

function draw (): void {
  const g = createGraphics()
  drawMap(g)
  drawPlayer(g)
}

function drawMap (g: CanvasRenderingContext2D): void {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y)
    }
  }
}

function drawPlayer (g: CanvasRenderingContext2D): void {
  g.fillStyle = '#00ff00'
  if (!player.gameOver) {
    g.fillRect(player.x * TILE_SIZE, player.y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }
}

function gameLoop (): void {
  const before = Date.now()
  update()
  draw()
  const after = Date.now()
  const frameTime = after - before
  const sleep = SLEEP - frameTime
  setTimeout(() => gameLoop(), sleep)
}

window.onload = () => {
  transformMap()
  gameLoop()
}

const LEFT_KEY = 'ArrowLeft'
const UP_KEY = 'ArrowUp'
const RIGHT_KEY = 'ArrowRight'
const DOWN_KEY = 'ArrowDown'
window.addEventListener('keydown', (e) => {
  if (e.key === LEFT_KEY || e.key === 'a') inputs.push(new Left(player))
  else if (e.key === UP_KEY || e.key === 'w') inputs.push(new Up(player))
  else if (e.key === RIGHT_KEY || e.key === 'd') inputs.push(new Right(player))
  else if (e.key === DOWN_KEY || e.key === 's') inputs.push(new Down(player))
  else if (e.key === ' ') inputs.push(new Place(player))
})
