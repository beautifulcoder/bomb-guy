import { equal, ok } from 'assert'
import {
  Tile,
  Up,
  Down,
  Left,
  Right,
  Place,
  playerX,
  bombs,
  map,
  inputs,
  gameOver,
  placeBomb,
  move,
  update,
  handleInputs,
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

  it('handle inputs', () => {
    inputs.push(new Up())
    inputs.push(new Down())
    inputs.push(new Left())
    inputs.push(new Right())
    inputs.push(new Place())
    inputs.push()
    handleInputs()
    equal(0, inputs.length)
  })

  it('run update', () => {
    update()
    ok(gameOver)
  })
})
