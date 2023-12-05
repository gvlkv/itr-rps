export function areAllUniq (array) {
  return (new Set(array)).size === array.length
}

export function randBetweenInc (from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + +from
}

export function modPostitve (a, b) {
  return ((a % b) + b) % b
}
