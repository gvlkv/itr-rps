import { areAllUniq, modPostitve } from './util.js'

export default class Game {
  #names
  #computerMove
  #userMove

  /** Names should be present and be all distinct */
  constructor (...names) {
    if (names.length === 0) {
      throw new Error('Names should be present')
    }
    if (!areAllUniq(names)) {
      throw new Error('Names should be all distinct')
    }
    if (!(names.length % 2)) {
      throw new Error('The number of names provided should be odd')
    }
    this.#names = names
  }

  nameByIndex (ind) {
    return this.#names[modPostitve(ind - 1, this.size)]
  }

  get size () {
    return this.#names.length
  }

  #checkMove (move) {
    if (move < 1) {
      throw new Error('Provided move is too low')
    }
    if (move > this.size) {
      throw new Error('Provided move is too high')
    }
  }

  makeMove (move) {
    this.#checkMove(move)
    this.#computerMove = move
  }

  userMakeMove (move) {
    this.#checkMove(move)
    this.#userMove = move
  }

  /** Result with respect to the user */
  get result () {
    if (this.computerMove === undefined ||
        this.userMove === undefined ||
        this.computerMove === this.userMove) {
      return 'Draw'
    }
    if (modPostitve(this.userMove - this.computerMove, this.size) <=
        Math.floor(this.size / 2)) {
      return 'Win'
    }
    return 'Lose'
  }

  get computerMove () {
    return this.#computerMove
  }

  get userMove () {
    return this.#userMove
  }

  * enumerate () {
    for (const ind in this.#names) {
      yield {
        index: +ind + 1,
        name: this.#names[+ind]
      }
    }
  }
}
