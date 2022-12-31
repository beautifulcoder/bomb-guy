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
  draw: (g: CanvasRenderingContext2D, x: number, y: number) => void
  move: (x: number, y: number) => void
}

class Air implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
  }

  move (x: number, y: number): void {
    playerY += y
    playerX += x
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#999999'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class Stone implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#0000cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class Bomb implements Tile {
  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return true }
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#770000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class BombClose implements Tile {
  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return true }
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc0000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class BombReallyClose implements Tile {
  isAir (): boolean { return false }
  isUnbreakable (): boolean { return false }
  isStone (): boolean { return false }
  isBomb (): boolean { return false }
  isBombClose (): boolean { return false }
  isBombReallyClose (): boolean { return true }
  isTmpFire (): boolean { return false }
  isFire (): boolean { return false }
  isExtraBomb (): boolean { return false }
  isMonsterUp (): boolean { return false }
  isMonsterRight (): boolean { return false }
  isTmpMonsterRight (): boolean { return false }
  isMonsterDown (): boolean { return false }
  isTmpMonsterDown (): boolean { return false }
  isMonsterLeft (): boolean { return false }

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#ff0000'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class TmpFire implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

export class Fire implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#ffcc00'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void {
    playerY += y
    playerX += x
  }
}

class ExtraBomb implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#00cc00'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void {
    playerY += y
    playerX += x
    bombs++
    map[playerY][playerX] = new Air()
  }
}

class MonsterUp implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class MonsterRight implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class TmpMonsterRight implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class MonsterDown implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class TmpMonsterDown implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
}

class MonsterLeft implements Tile {
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

  draw (g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#cc00cc'
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
  }

  move (x: number, y: number): void { }
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
  isUp (): boolean { return true }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    map[playerY + -1][playerX + 0].move(0, -1)
  }
}

export class Down implements Input {
  isUp (): boolean { return false }
  isDown (): boolean { return true }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    map[playerY + 1][playerX + 0].move(0, 1)
  }
}

export class Left implements Input {
  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return true }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    map[playerY + 0][playerX + -1].move(-1, 0)
  }
}

export class Right implements Input {
  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return true }
  isPlace (): boolean { return false }
  handle (): void {
    map[playerY + 0][playerX + 1].move(1, 0)
  }
}

export class Place implements Input {
  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return true }
  handle (): void { placeBomb() }
}

export let playerX = 1
export let playerY = 1
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

export let map: Tile[][]

function transformTile (tile: RawTile): Tile {
  switch (tile) {
    case RawTile.AIR: return new Air()
    case RawTile.UNBREAKABLE: return new Unbreakable()
    case RawTile.STONE: return new Stone()
    case RawTile.BOMB: return new Bomb()
    case RawTile.BOMB_CLOSE: return new BombClose()
    case RawTile.BOMB_REALLY_CLOSE: return new BombReallyClose()
    case RawTile.TMP_FIRE: return new TmpFire()
    case RawTile.FIRE: return new Fire()
    case RawTile.EXTRA_BOMB: return new ExtraBomb()
    case RawTile.MONSTER_UP: return new MonsterUp()
    case RawTile.MONSTER_RIGHT: return new MonsterRight()
    case RawTile.TMP_MONSTER_RIGHT: return new TmpMonsterRight()
    case RawTile.MONSTER_DOWN: return new MonsterDown()
    case RawTile.TMP_MONSTER_DOWN: return new TmpMonsterDown()
    case RawTile.MONSTER_LEFT: return new MonsterLeft()
    default: throwExpression('Unexpected tile')
  }
}

export function transformMap (): void {
  map = new Array(rawMap.length)
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length)
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x])
    }
  }
}

export const inputs: Input[] = []

let delay = 0
export let bombs = 1
export let gameOver = false

export function explode (x: number, y: number, type: Tile): void {
  if (map[y][x].isStone()) {
    if (Math.random() < 0.1) map[y][x] = new ExtraBomb()
    else map[y][x] = type
  } else if (!map[y][x].isUnbreakable()) {
    if (
      map[y][x].isBomb() ||
      map[y][x].isBombClose() ||
      map[y][x].isBombReallyClose()
    ) {
      bombs++
    }
    map[y][x] = type
  }
}

export function placeBomb (): void {
  if (bombs > 0) {
    map[playerY][playerX] = new Bomb()
    bombs--
  }
}

export function update (): void {
  handleInputs()
  if (hasDelay()) return
  updateMap()
}

export function handleInputs (): void {
  while (inputs.length > 0 && !gameOver) {
    const input = inputs.pop() ?? throwExpression('Invalid key input')
    input.handle()
  }
  handleGameOver()
}

function handleGameOver (): void {
  if (
    map[playerY][playerX].isFire() ||
    map[playerY][playerX].isMonsterDown() ||
    map[playerY][playerX].isMonsterUp() ||
    map[playerY][playerX].isMonsterLeft() ||
    map[playerY][playerX].isMonsterRight()
  ) gameOver = true
}

function hasDelay (): boolean {
  if (--delay > 0) return true
  delay = DELAY
  return false
}

function updateMap (): void {
  for (let y = 1; y < map.length; y++) {
    for (let x = 1; x < map[y].length; x++) {
      updateTile(x, y)
    }
  }
}

function updateTile (x: number, y: number): void {
  if (map[y][x].isBomb()) {
    map[y][x] = new BombClose()
  } else if (map[y][x].isBombClose()) {
    map[y][x] = new BombReallyClose()
  } else if (map[y][x].isBombReallyClose()) {
    explode(x + 0, y - 1, new Fire())
    explode(x + 0, y + 1, new TmpFire())
    explode(x - 1, y + 0, new Fire())
    explode(x + 1, y + 0, new TmpFire())
    map[y][x] = new Fire()
    bombs++
  } else if (map[y][x].isTmpFire()) {
    map[y][x] = new Fire()
  } else if (map[y][x].isFire()) {
    map[y][x] = new Air()
  } else if (map[y][x].isTmpMonsterDown()) {
    map[y][x] = new MonsterDown()
  } else if (map[y][x].isTmpMonsterRight()) {
    map[y][x] = new MonsterRight()
  } else if (map[y][x].isMonsterRight()) {
    if (map[y][x + 1].isAir()) {
      map[y][x] = new Air()
      map[y][x + 1] = new TmpMonsterRight()
    } else {
      map[y][x] = new MonsterDown()
    }
  } else if (map[y][x].isMonsterDown()) {
    if (map[y + 1][x].isAir()) {
      map[y][x] = new Air()
      map[y + 1][x] = new TmpMonsterDown()
    } else {
      map[y][x] = new MonsterLeft()
    }
  } else if (map[y][x].isMonsterLeft()) {
    if (map[y][x - 1].isAir()) {
      map[y][x] = new Air()
      map[y][x - 1] = new MonsterLeft()
    } else {
      map[y][x] = new MonsterUp()
    }
  } else if (map[y][x].isMonsterUp()) {
    if (map[y - 1][x].isAir()) {
      map[y][x] = new Air()
      map[y - 1][x] = new MonsterUp()
    } else {
      map[y][x] = new MonsterRight()
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
  if (!gameOver) {
    g.fillRect(playerX * TILE_SIZE, playerY * TILE_SIZE, TILE_SIZE, TILE_SIZE)
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
  if (e.key === LEFT_KEY || e.key === 'a') inputs.push(new Left())
  else if (e.key === UP_KEY || e.key === 'w') inputs.push(new Up())
  else if (e.key === RIGHT_KEY || e.key === 'd') inputs.push(new Right())
  else if (e.key === DOWN_KEY || e.key === 's') inputs.push(new Down())
  else if (e.key === ' ') inputs.push(new Place())
})
