import { throwExpression } from './exception.js'
import { SLEEP } from './constant.js'
import {
  Player,
  Map,
  RawTile
} from './tile.js'
import { PlayerInput } from './input.js'

const rawMap: RawTile[][] = [
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

export const map = new Map(rawMap)
export const player = new Player(map)
export const playerInput = new PlayerInput(player)

export function update (): void {
  playerInput.handle()
  player.handleGameOver()
  if (player.hasDelay()) return
  map.update()
}

function createGraphics (): CanvasRenderingContext2D {
  const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement
  const g = canvas.getContext('2d') ?? throwExpression('Cannot find the GameCanvas')

  g.clearRect(0, 0, canvas.width, canvas.height)
  return g
}

function draw (): void {
  const g = createGraphics()
  map.draw(g)
  player.draw(g)
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

window.addEventListener('keydown', (e) => {
  playerInput.keyPress(e.key)
})
