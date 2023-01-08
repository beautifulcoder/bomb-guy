import { equal, ok } from 'assert'
import {
  map,
  playerInput,
  update,
  player
} from '../src/index'

describe('bomb man', () => {
  it('place bomb', () => {
    playerInput.keyPress(' ')
    playerInput.keyPress(' ')
    playerInput.handle()
    equal(0, player.bombs)
  })

  it('move player', () => {
    playerInput.keyPress('ArrowRight')
    playerInput.handle()
    equal(2, player.x)
  })

  it('explode bomb', () => {
    map.explodeWithFire(2, 1, player)
    ok(map.isFire(2, 1))
  })

  it('handle inputs', () => {
    playerInput.keyPress('ArrowUp')
    playerInput.keyPress('ArrowDown')
    playerInput.keyPress('ArrowLeft')
    playerInput.keyPress('ArrowRight')
    playerInput.keyPress(' ')
    playerInput.handle()
    equal(0, playerInput.count())
  })

  it('run update', () => {
    update()
    ok(player.gameOver)
  })
})
