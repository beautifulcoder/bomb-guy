import { equal, ok } from 'assert'
import {
  Tile,
  playerX,
  bombs,
  map,
  gameOver,
  placeBomb,
  move,
  update,
  explode
} from '../src/index'

describe('bomb man', () => {
  it('place bomb', () => {
    placeBomb()
    equal(0, bombs)
  })

  it('move player', () => {
    move(1, 0)
    equal(2, playerX)
  })

  it('explode bomb', () => {
    explode(2, 1, Tile.FIRE)
    equal(Tile.FIRE, map[1][2])
  })

  it('run update', () => {
    update()
    ok(gameOver)
  })
})
