import * as html from '@hyperapp/html'

export default function view(onClick) {
  return html.div(
    {
      id: 'widget-keypad',
      onclick: () => onClick(),
    },
    [
      keyRow(1, 2, 3, '⌫'),
      keyRow(4, 5, 6, 'clear'),
      keyRow(7, 8, 9, null),
      keyRow(null, 0, '.', 'enter'),
    ],
  )
}

function keyRow(...keys) {
  return html.div(
    {
      class: 'keypad-row',
    },
    keys.map(key),
  )
}

function key(k) {
  let specialClass
  switch (k) {
    case 'enter':
      specialClass = 'keypad-key-enter'
      break
    case '⌫':
      specialClass = 'keypad-key-delete'
      break
    case 'clear':
      specialClass = 'keypad-key-clear'
      break
    default:
      specialClass = ''
  }

  const displayKeyClass = k === null ? 'empty-key' : ''

  return html.div({class: `keypad-key ${specialClass} ${displayKeyClass}`}, k)
}
