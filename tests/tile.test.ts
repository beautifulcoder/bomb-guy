import { equal, ok } from 'assert'
import { RawTile, Map, Player } from '../src/tile'

const rawTileMap: RawTile[][] = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
]

const rawMonsterMap: RawTile[][] = [
  [1, 1, 1, 1],
  [1, 10, 0, 1],
  [1, 0, 0, 1],
  [1, 1, 1, 1]
]

const tileMap = new Map(rawTileMap)
const tilePlayer = new Player(tileMap)

const monsterMap = new Map(rawMonsterMap)
const monsterPlayer = new Player(monsterMap)

describe('tiles', () => {
  it('has air tile', () => {
    ok(tileMap.getTile(0, 0).isAir())
  })

  it('has unbreakable tile', () => {
    ok(tileMap.getTile(1, 0).isUnbreakable())
  })

  it('has stone tile', () => {
    ok(tileMap.getTile(2, 0).isStone())
  })

  it('has bomb tile', () => {
    ok(tileMap.getTile(3, 0).isBomb())
  })

  it('has bomb close tile', () => {
    ok(tileMap.getTile(4, 0).isBombClose())
  })

  it('has bomb really close tile', () => {
    ok(tileMap.getTile(5, 0).isBombReallyClose())
  })

  it('has tmp fire tile', () => {
    ok(tileMap.getTile(6, 0).isTmpFire())
  })

  it('has fire tile', () => {
    ok(tileMap.getTile(7, 0).isFire())
  })

  it('has extra bomb tile', () => {
    ok(tileMap.getTile(8, 0).isExtraBomb())
  })

  it('has monster up tile', () => {
    ok(tileMap.getTile(9, 0).isMonsterUp())
  })

  it('has monster right tile', () => {
    ok(tileMap.getTile(10, 0).isMonsterRight())
  })

  it('has tmp monster right tile', () => {
    ok(tileMap.getTile(11, 0).isTmpMonsterRight())
  })

  it('has monster down tile', () => {
    ok(tileMap.getTile(12, 0).isMonsterDown())
  })

  it('has tmp monster down tile', () => {
    ok(tileMap.getTile(13, 0).isTmpMonsterDown())
  })

  it('has monster left tile', () => {
    ok(tileMap.getTile(14, 0).isMonsterLeft())
  })
})

describe('player', () => {
  it('initialize player', () => {
    equal(1, tilePlayer.bombs)
    equal(1, tilePlayer.x)
    equal(1, tilePlayer.y)
    equal(0, tilePlayer.delay)
    equal(false, tilePlayer.gameOver)
  })
})

describe('monster', () => {
  it('game over player', () => {
    monsterPlayer.handleGameOver()
    ok(monsterPlayer.gameOver)
  })

  it('move monster right', () => {
    monsterMap.update()
    monsterMap.update()
    ok(monsterMap.getTile(2, 1).isMonsterDown())
  })

  it('move monster down', () => {
    monsterMap.update()
    monsterMap.update()
    ok(monsterMap.getTile(2, 2).isMonsterLeft())
  })

  it('move monster left', () => {
    monsterMap.update()
    monsterMap.update()
    ok(monsterMap.getTile(1, 2).isMonsterUp())
  })

  it('move monster up', () => {
    monsterMap.update()
    monsterMap.update()
    ok(monsterMap.getTile(1, 1).isMonsterRight())
  })
})
