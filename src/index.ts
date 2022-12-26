const TILE_SIZE = 30
const FPS = 30
const SLEEP = 1000 / FPS
const TPS = 2
const DELAY = FPS / TPS

export enum Tile {
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
  MONSTER_LEFT,
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
  handle (): void { move(0, -1) }
}

export class Down implements Input {
  isUp (): boolean { return false }
  isDown (): boolean { return true }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }
  handle (): void { move(0, 1) }
}

export class Left implements Input {
  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return true }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }
  handle (): void { move(-1, 0) }
}

export class Right implements Input {
  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return true }
  isPlace (): boolean { return false }
  handle (): void { move(1, 0) }
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
export const map: Tile[][] = [
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

export const inputs: Input[] = []

let delay = 0
export let bombs = 1
export let gameOver = false

export function explode (x: number, y: number, type: Tile): void {
  if (map[y][x] === Tile.STONE) {
    if (Math.random() < 0.1) map[y][x] = Tile.EXTRA_BOMB
    else map[y][x] = type
  } else if (map[y][x] !== Tile.UNBREAKABLE) {
    if (
      map[y][x] === Tile.BOMB ||
      map[y][x] === Tile.BOMB_CLOSE ||
      map[y][x] === Tile.BOMB_REALLY_CLOSE
    ) {
      bombs++
    }
    map[y][x] = type
  }
}

export function move (x: number, y: number): void {
  if (
    map[playerY + y][playerX + x] === Tile.AIR ||
    map[playerY + y][playerX + x] === Tile.FIRE
  ) {
    playerY += y
    playerX += x
  } else if (map[playerY + y][playerX + x] === Tile.EXTRA_BOMB) {
    playerY += y
    playerX += x
    bombs++
    map[playerY][playerX] = Tile.AIR
  }
}

export function placeBomb (): void {
  if (bombs > 0) {
    map[playerY][playerX] = Tile.BOMB
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
    const current = inputs.pop() ?? throwExpression('Invalid key input')
    handleInput(current)
  }
  handleGameOver()
}

function handleInput (input: Input): void {
  input.handle()
}

function handleGameOver (): void {
  if (
    map[playerY][playerX] === Tile.FIRE ||
    map[playerY][playerX] === Tile.MONSTER_DOWN ||
    map[playerY][playerX] === Tile.MONSTER_UP ||
    map[playerY][playerX] === Tile.MONSTER_LEFT ||
    map[playerY][playerX] === Tile.MONSTER_RIGHT
  ) gameOver = true
}

export function hasDelay (): boolean {
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
  if (map[y][x] === Tile.BOMB) {
    map[y][x] = Tile.BOMB_CLOSE
  } else if (map[y][x] === Tile.BOMB_CLOSE) {
    map[y][x] = Tile.BOMB_REALLY_CLOSE
  } else if (map[y][x] === Tile.BOMB_REALLY_CLOSE) {
    explode(x + 0, y - 1, Tile.FIRE)
    explode(x + 0, y + 1, Tile.TMP_FIRE)
    explode(x - 1, y + 0, Tile.FIRE)
    explode(x + 1, y + 0, Tile.TMP_FIRE)
    map[y][x] = Tile.FIRE
    bombs++
  } else if (map[y][x] === Tile.TMP_FIRE) {
    map[y][x] = Tile.FIRE
  } else if (map[y][x] === Tile.FIRE) {
    map[y][x] = Tile.AIR
  } else if (map[y][x] === Tile.TMP_MONSTER_DOWN) {
    map[y][x] = Tile.MONSTER_DOWN
  } else if (map[y][x] === Tile.TMP_MONSTER_RIGHT) {
    map[y][x] = Tile.MONSTER_RIGHT
  } else if (map[y][x] === Tile.MONSTER_RIGHT) {
    if (map[y][x + 1] === Tile.AIR) {
      map[y][x] = Tile.AIR
      map[y][x + 1] = Tile.TMP_MONSTER_RIGHT
    } else {
      map[y][x] = Tile.MONSTER_DOWN
    }
  } else if (map[y][x] === Tile.MONSTER_DOWN) {
    if (map[y + 1][x] === Tile.AIR) {
      map[y][x] = Tile.AIR
      map[y + 1][x] = Tile.TMP_MONSTER_DOWN
    } else {
      map[y][x] = Tile.MONSTER_LEFT
    }
  } else if (map[y][x] === Tile.MONSTER_LEFT) {
    if (map[y][x - 1] === Tile.AIR) {
      map[y][x] = Tile.AIR
      map[y][x - 1] = Tile.MONSTER_LEFT
    } else {
      map[y][x] = Tile.MONSTER_UP
    }
  } else if (map[y][x] === Tile.MONSTER_UP) {
    if (map[y - 1][x] === Tile.AIR) {
      map[y][x] = Tile.AIR
      map[y - 1][x] = Tile.MONSTER_UP
    } else {
      map[y][x] = Tile.MONSTER_RIGHT
    }
  }
}

function throwExpression (message: string): never {
  throw new Error(message)
}

function createGraphics (): CanvasRenderingContext2D {
  const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement
  const g = canvas.getContext('2d')

  if (g === null) throw new Error('Cannot find the GameCanvas')
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
      if (map[y][x] === Tile.UNBREAKABLE) g.fillStyle = '#999999'
      else if (map[y][x] === Tile.STONE) g.fillStyle = '#0000cc'
      else if (map[y][x] === Tile.EXTRA_BOMB) g.fillStyle = '#00cc00'
      else if (map[y][x] === Tile.FIRE) g.fillStyle = '#ffcc00'
      else if (
        map[y][x] === Tile.MONSTER_UP ||
        map[y][x] === Tile.MONSTER_LEFT ||
        map[y][x] === Tile.MONSTER_RIGHT ||
        map[y][x] === Tile.MONSTER_DOWN
      ) g.fillStyle = '#cc00cc'
      else if (map[y][x] === Tile.BOMB) g.fillStyle = '#770000'
      else if (map[y][x] === Tile.BOMB_CLOSE) g.fillStyle = '#cc0000'
      else if (map[y][x] === Tile.BOMB_REALLY_CLOSE) g.fillStyle = '#ff0000'

      if (map[y][x] !== Tile.AIR) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
      }
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
