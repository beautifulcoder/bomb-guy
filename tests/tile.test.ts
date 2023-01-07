import { equal, ok } from 'assert'
import { RawTile, Map, Player } from '../src/tile'

const rawMap: RawTile[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
]

const map = new Map(rawMap)
const player = new Player(map)

describe('tiles', () => {
  it('has air tile', () => {
    ok(map.getTile(0, 0).isAir())
  })

  it('has unbreakable tile', () => {
    ok(map.getTile(1, 0).isUnbreakable())
  })

  it('has stone tile', () => {
    ok(map.getTile(2, 0).isStone())
  })

  it('has bomb tile', () => {
    ok(map.getTile(3, 0).isBomb())
  })

  it('has bomb close tile', () => {
    ok(map.getTile(4, 0).isBombClose())
  })

  it('has bomb really close tile', () => {
    ok(map.getTile(5, 0).isBombReallyClose())
  })

  it('has tmp fire tile', () => {
    ok(map.getTile(6, 0).isTmpFire())
  })

  it('has fire tile', () => {
    ok(map.getTile(7, 0).isFire())
  })

  it('has extra bomb tile', () => {
    ok(map.getTile(8, 0).isExtraBomb())
  })

  it('has monster up tile', () => {
    ok(map.getTile(9, 0).isMonsterUp())
  })

  it('has monster right tile', () => {
    ok(map.getTile(10, 0).isMonsterRight())
  })

  it('has tmp monster right tile', () => {
    ok(map.getTile(11, 0).isTmpMonsterRight())
  })

  it('has monster down tile', () => {
    ok(map.getTile(12, 0).isMonsterDown())
  })

  it('has tmp monster down tile', () => {
    ok(map.getTile(13, 0).isTmpMonsterDown())
  })

  it('has monster left tile', () => {
    ok(map.getTile(14, 0).isMonsterLeft())
  })
})

describe('player', () => {
  it('initialize player', () => {
    equal(1, player.bombs)
    equal(1, player.x)
    equal(1, player.y)
    equal(0, player.delay)
    equal(false, player.gameOver)
  })
})
