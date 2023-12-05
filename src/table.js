import Table from 'tty-table'

/** Creates a table (fn(i,j)) along with labels on both dimentions */
export default function makeTable (cornerText, labels, fn) {
  const header = [{
    headerColor: 'white',
    value: cornerText
  }]

  for (const label of labels) {
    header.push({
      headerColor: 'white',
      value: label
    })
  }

  const rows = [...labels.entries()].map(([y, labelY]) =>
    [labelY, ...[...labels.entries()].map(([x]) => fn(x, y))])

  const options = {
  }

  const tbl = Table(header, rows, options).render()
  return tbl.replaceAll('\n  ', '\n').replace(/^[^\n]*\n/s, '')
}
