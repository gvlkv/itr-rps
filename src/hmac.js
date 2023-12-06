import { createHmac, randomBytes } from 'node:crypto'

export class HmacKey {
  #randBytes

  constructor (len) {
    this.#randBytes = randomBytes(len)
  }

  get bytes () {
    return this.#randBytes
  }

  toString () {
    return this.#randBytes.toString('hex')
  }
}

export class HmacCalc {
  #hmac

  constructor (algo, key) {
    this.#hmac = createHmac(algo, key)
  }

  update (msg) {
    this.#hmac.update(msg)
  }

  toString () {
    return this.#hmac.digest('hex')
  }
}
