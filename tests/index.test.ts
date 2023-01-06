import { equal, ok } from 'assert'
import {
  Fire,
  Up,
  Down,
  Left,
  Right,
  Place,
  map,
  inputs,
  update,
  handleInputs,
  transformMap,
  player
} from '../src/index'

transformMap()

describe('bomb man', () => {
  it('place bomb', () => {
    inputs.push(new Place(player))
    inputs.push(new Place(player))
    handleInputs()
    equal(0, player.bombs)
  })

  it('move player', () => {
    player.moveRight()
    equal(2, player.x)
  })

  it('explode bomb', () => {
    map[1][2].explode(2, 1, new Fire(player))
    ok(map[1][2].isFire())
  })

  it('handle inputs', () => {
    inputs.push(new Up(player))
    inputs.push(new Down(player))
    inputs.push(new Left(player))
    inputs.push(new Right(player))
    inputs.push(new Place(player))
    inputs.push()
    handleInputs()
    equal(0, inputs.length)
  })

  it('run update', () => {
    update()
    ok(player.gameOver)
  })
})
