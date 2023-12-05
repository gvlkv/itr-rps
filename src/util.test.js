import * as util from './util.js'

import test from 'ava'

test('areAllUniq checks uniqueness', (t) => {
  t.true(util.areAllUniq(['a', 'b']))
  t.false(util.areAllUniq(['a', 'b', 'a']))
})

test('randBetweenInc covers all variants inclusive', (t) => {
  const arr = []
  for (let i = 0; i < 1000; i++) { arr[util.randBetweenInc(0, 1)] = 0 }
  t.deepEqual(arr, [0, 0])
})
