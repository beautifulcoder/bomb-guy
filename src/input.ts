import { throwExpression } from './exception.js'
import { Player } from './tile.js'

interface Input {
  isUp: () => boolean
  isDown: () => boolean
  isLeft: () => boolean
  isRight: () => boolean
  isPlace: () => boolean
  handle: () => void
}

class Up implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return true }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    this.player.moveUp()
  }
}

class Down implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return false }
  isDown (): boolean { return true }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    this.player.moveDown()
  }
}

class Left implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return true }
  isRight (): boolean { return false }
  isPlace (): boolean { return false }

  handle (): void {
    this.player.moveLeft()
  }
}

class Right implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return true }
  isPlace (): boolean { return false }
  handle (): void {
    this.player.moveRight()
  }
}

class Place implements Input {
  constructor (private readonly player: Player) { }

  isUp (): boolean { return false }
  isDown (): boolean { return false }
  isLeft (): boolean { return false }
  isRight (): boolean { return false }
  isPlace (): boolean { return true }
  handle (): void {
    this.player.placeBomb()
  }
}

export class PlayerInput {
  private readonly inputs: Input[] = []

  private readonly LEFT_KEY = 'ArrowLeft'
  private readonly UP_KEY = 'ArrowUp'
  private readonly RIGHT_KEY = 'ArrowRight'
  private readonly DOWN_KEY = 'ArrowDown'

  constructor (private readonly player: Player) { }

  handle (): void {
    while (this.inputs.length > 0 && !this.player.gameOver) {
      const input = this.inputs.pop() ?? throwExpression('Invalid key input')
      input.handle()
    }
  }

  keyPress (key: string): void {
    this.keyLeft(key)
    this.keyUp(key)
    this.keyRight(key)
    this.keyDown(key)
    this.keyPlace(key)
  }

  count (): number {
    return this.inputs.length
  }

  private keyLeft (key: string): void {
    if (key === this.LEFT_KEY || key === 'a') this.inputs.push(new Left(this.player))
  }

  private keyUp (key: string): void {
    if (key === this.UP_KEY || key === 'w') this.inputs.push(new Up(this.player))
  }

  private keyRight (key: string): void {
    if (key === this.RIGHT_KEY || key === 'd') this.inputs.push(new Right(this.player))
  }

  private keyDown (key: string): void {
    if (key === this.DOWN_KEY || key === 's') this.inputs.push(new Down(this.player))
  }

  private keyPlace (key: string): void {
    if (key === ' ') this.inputs.push(new Place(this.player))
  }
}
