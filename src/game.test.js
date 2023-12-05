import Game from './game.js'

import test from 'ava'

test('new Game should throw when empty', (t) => {
  t.throws(() => new Game())
})

test('new Game should throw when there are duplicates', (t) => {
  t.throws(() => new Game('a', 'b', 'a'))
})

test('new Game should throw when even', (t) => {
  t.throws(() => new Game('a', 'b'))
})

test('tie if equal', (t) => {
  const game = new Game('a', 'b', 'c', 'd', 'e')
  t.deepEqual(game.result, 'Draw')
  game.makeMove(1)
  game.userMakeMove(1)
  t.deepEqual(game.result, 'Draw')
  game.makeMove(5)
  game.userMakeMove(5)
  t.deepEqual(game.result, 'Draw')
})

test('win if slightly above', (t) => {
  const game = new Game('a', 'b', 'c', 'd', 'e')
  game.makeMove(1)
  game.userMakeMove(2)
  t.deepEqual(game.result, 'Win')
  game.makeMove(5)
  game.userMakeMove(1)
  t.deepEqual(game.result, 'Win')
})

test('win if above as can go', (t) => {
  const game = new Game('a', 'b', 'c', 'd', 'e')
  game.makeMove(1)
  game.userMakeMove(3)
  t.deepEqual(game.result, 'Win')
  game.makeMove(5)
  game.userMakeMove(2)
  t.deepEqual(game.result, 'Win')
})

test('lose if slightly below', (t) => {
  const game = new Game('a', 'b', 'c', 'd', 'e')
  game.makeMove(1)
  game.userMakeMove(5)
  t.deepEqual(game.result, 'Lose')
  game.makeMove(5)
  game.userMakeMove(4)
  t.deepEqual(game.result, 'Lose')
})

test('lose if below as can go', (t) => {
  const game = new Game('a', 'b', 'c', 'd', 'e')
  game.makeMove(1)
  game.userMakeMove(4)
  t.deepEqual(game.result, 'Lose')
  game.makeMove(5)
  game.userMakeMove(3)
  t.deepEqual(game.result, 'Lose')
})
