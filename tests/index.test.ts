import { equal, ok } from 'assert'
import {
  Fire,
  Up,
  Down,
  Left,
  Right,
  Place,
  playerX,
  playerY,
  bombs,
  map,
  inputs,
  gameOver,
  update,
  handleInputs,
  transformMap
} from '../src/index'

transformMap()

describe('bomb man', () => {
  it('place bomb', () => {
    inputs.push(new Place())
    inputs.push(new Place())
    handleInputs()
    equal(0, bombs)
  })

  it('move player', () => {
    map[playerY + 0][playerX + 1].move(1, 0)
    equal(2, playerX)
  })

  it('explode bomb', () => {
    map[1][2].explode(2, 1, new Fire())
    ok(map[1][2].isFire())
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
