#!/usr/bin/env node

import Game from './game.js'
import makeTable from './table.js'
import { randBetweenInc } from './util.js'

import chalk from 'chalk'
import promptBuilder from 'prompt-sync'
const prompt = promptBuilder({ sigint: true })

const log = console.log
const warn = text => log(chalk.bold.red(text))
const ARGV = process.argv.splice(2)

function colorResult (result) {
  switch (result) {
    case 'Win': return chalk.green(result)
    case 'Lose': return chalk.red(result)
    case 'Draw': return chalk.yellow(result)
  }
  return result
}

function printAllNames (names) {
  for (const { index, name } of names) {
    log(`${index}   - ${name}`)
  }
}

function printHelp (game) {
  log(makeTable(
    'computer \\ user',
    [...game.enumerate()].map(x => x.name),
    (x, y) => {
      game.makeMove(y + 1)
      game.userMakeMove(x + 1)
      return colorResult(game.result)
    }
  ))
}

function printMoves () {
  log(chalk.bold('Available moves:'))
  printAllNames(game.enumerate())
  log('0,q - quit')
  log('?   - help')
}

let game
try {
  game = new Game(...ARGV)
} catch (e) {
  warn(`Illegal arguments: ${e.message}.`)
  process.exit(-1)
}
const size = game.size

/// //////////////////

printMoves()

for (; ;) {
  game.makeMove(randBetweenInc(1, size))

  const userMove = prompt(chalk.bold('Enter your move: ')).trim()

  if (['0', 'q'].includes(userMove)) {
    process.exit(0)
  }

  if (userMove === '') {
    continue
  }
  if (userMove === '?') {
    printHelp(game)
    continue
  }
  if (Number.isNaN(+userMove)) {
    warn('Provided move is not a number.')
    continue
  }

  try {
    game.userMakeMove(+userMove)
  } catch (e) {
    warn(`${e.message}.`)
    continue
  }

  log(chalk.bold('Your move: ') + game.nameByIndex(game.userMove))
  log(chalk.bold('Computer move: ') + game.nameByIndex(game.computerMove))
  log(chalk.bold(colorResult(game.result)))

  if (game.result !== 'Draw') {
    break
  }
}
