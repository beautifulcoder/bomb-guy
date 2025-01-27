import { equal, ok } from 'assert'
import { RawTile, Map, Player } from '../src/tile'

describe('tiles', () => {
  const rawMap: RawTile[][] = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  ]

  const map = new Map(rawMap)
  const player = new Player(map)

  it('has air tile', () => {
    ok(map.isAir(0, 0))
  })

  it('has unbreakable tile', () => {
    ok(map.isUnbreakable(1, 0))
  })

  it('has stone tile', () => {
    ok(map.isStone(2, 0))
  })

  it('has bomb tile', () => {
    ok(map.isBomb(3, 0))
  })

  it('has bomb close tile', () => {
    ok(map.isBombClose(4, 0))
  })

  it('has bomb really close tile', () => {
    ok(map.isBombReallyClose(5, 0))
  })

  it('has tmp fire tile', () => {
    ok(map.isTmpFire(6, 0))
  })

  it('has fire tile', () => {
    ok(map.isFire(7, 0))
  })

  it('has extra bomb tile', () => {
    ok(map.isExtraBomb(8, 0))
  })

  it('has monster up tile', () => {
    ok(map.isMonsterUp(9, 0))
  })

  it('has monster right tile', () => {
    ok(map.isMonsterRight(10, 0))
  })

  it('has tmp monster right tile', () => {
    ok(map.isTmpMonsterRight(11, 0))
  })

  it('has monster down tile', () => {
    ok(map.isMonsterDown(12, 0))
  })

  it('has tmp monster down tile', () => {
    ok(map.isTmpMonsterDown(13, 0))
  })

  it('has monster left tile', () => {
    ok(map.isMonsterLeft(14, 0))
  })

  it('initialize player', () => {
    equal(1, player.bombs)
    equal(1, player.x)
    equal(1, player.y)
    equal(0, player.delay)
    equal(false, player.gameOver)
  })
})

describe('monster', () => {
  const rawMap: RawTile[][] = [
    [1, 1, 1, 1],
    [1, 10, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1]
  ]

  const map = new Map(rawMap)
  const player = new Player(map)

  it('game over player', () => {
    player.handleGameOver()
    ok(player.gameOver)
  })

  it('move monster right', () => {
    map.update()
    map.update()
    ok(map.isMonsterDown(2, 1))
  })

  it('move monster down', () => {
    map.update()
    map.update()
    ok(map.isMonsterLeft(2, 2))
  })

  it('move monster left', () => {
    map.update()
    map.update()
    ok(map.isMonsterUp(1, 2))
  })

  it('move monster up', () => {
    map.update()
    map.update()
    ok(map.isMonsterRight(1, 1))
  })
})

describe('bomb', () => {
  const rawMap: RawTile[][] = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
  ]

  const map = new Map(rawMap)
  const player = new Player(map)
  player.bombs = 2

  it('move player', () => {
    player.moveRight()
    player.moveDown()
    player.moveDown()
    equal(2, player.x)
  })

  it('place first bomb', () => {
    player.placeBomb()
    map.update()
    equal(1, player.bombs)
  })

  it('place second bomb', () => {
    player.moveUp()
    player.placeBomb()
    map.update()
    equal(0, player.bombs)
  })

  it('explode bombs', () => {
    map.update()
    map.update()
    map.update()
    equal(1, player.bombs)
  })
})

describe('player move', () => {
  const rawMap: RawTile[][] = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1]
  ]

  const map = new Map(rawMap)
  const player = new Player(map)

  beforeEach(() => {
    player.x = 1
    player.y = 1
  })

  it('into air', () => {
    map.makeAir(2, 1, player)
    player.moveRight()
    equal(2, player.x)
  })

  it('into unbreakable', () => {
    map.makeUnbreakable(2, 1)
    player.moveRight()
    equal(1, player.x)
  })

  it('into stone', () => {
    map.makeStone(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into bomb', () => {
    map.makeBomb(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into bomb close', () => {
    map.makeBombClose(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into bomb really close', () => {
    map.makeBombReallyClose(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into tmp fire', () => {
    map.makeTmpFire(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into fire', () => {
    map.makeFire(2, 1, player)
    player.moveRight()
    equal(2, player.x)
  })

  it('into extra bomb', () => {
    map.makeExtraBomb(2, 1, player)
    player.moveRight()
    equal(2, player.x)
  })

  it('into monster up', () => {
    map.makeMonsterUp(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into monster right', () => {
    map.makeMonsterRight(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into tmp monster right', () => {
    map.makeTmpMonsterRight(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into monster down', () => {
    map.makeMonsterDown(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into tmp monster down', () => {
    map.makeTmpMonsterDown(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })

  it('into monster left', () => {
    map.makeMonsterLeft(2, 1, player)
    player.moveRight()
    equal(1, player.x)
  })
})

describe('bomb explode', () => {
  const rawMap: RawTile[][] = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1]
  ]

  const map = new Map(rawMap)
  const player = new Player(map)

  const explodeBomb = (): void => {
    for (let i = 0; i < 4; i++) map.update()
  }

  beforeEach(() => {
    player.bombs = 1
  })

  it('into air', () => {
    map.makeAir(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into unbreakable', () => {
    map.makeUnbreakable(2, 1)
    player.placeBomb()
    explodeBomb()
    ok(map.isUnbreakable(2, 1))
  })

  it('into stone', () => {
    map.makeStone(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into bomb', () => {
    map.makeBomb(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into bomb close', () => {
    map.makeBombClose(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into bomb really close', () => {
    map.makeBombReallyClose(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into tmp fire', () => {
    map.makeTmpFire(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into fire', () => {
    map.makeFire(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into extra bomb', () => {
    map.makeExtraBomb(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into monster up', () => {
    map.makeMonsterUp(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into monster right', () => {
    map.makeMonsterRight(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into tmp monster right', () => {
    map.makeTmpMonsterRight(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into monster down', () => {
    map.makeMonsterDown(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into tmp monster down', () => {
    map.makeTmpMonsterDown(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })

  it('into monster left', () => {
    map.makeMonsterLeft(2, 1, player)
    player.placeBomb()
    explodeBomb()
    ok(map.isAir(2, 1))
  })
})
