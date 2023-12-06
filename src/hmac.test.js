import * as hmac from './hmac.js'

import test from 'ava'

test('should produce correct digest', t => {
  const hmacCalc = new hmac.HmacCalc('sha3-256', Buffer.from('def'))
  hmacCalc.update('abc')
  t.deepEqual(
    '49FB57FE9E3AC0828F52486E07ECD491E3A6B70539678741D21C6A514F583CD5',
    String(hmacCalc).toUpperCase())
})
