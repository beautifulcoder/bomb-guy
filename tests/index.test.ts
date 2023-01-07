import { equal, ok } from 'assert'
import {
  Fire,
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
    player.moveRight()
    equal(2, player.x)
  })

  it('explode bomb', () => {
    map.getTile(2, 1).explode(2, 1, new Fire(player, map))
    ok(map.getTile(2, 1).isFire())
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
