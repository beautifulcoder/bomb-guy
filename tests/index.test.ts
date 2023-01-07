import { equal, ok } from 'assert'
import {
  Fire,
  map,
  playerInput,
  update,
  transformMap,
  player
} from '../src/index'

transformMap()

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
    map[1][2].explode(2, 1, new Fire(player))
    ok(map[1][2].isFire())
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
