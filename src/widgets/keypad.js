import * as html from '@hyperapp/html'

export default function view() {
  return html.div(
    {
      id: 'widget-keypad',
    },
    [
      keyRow(1, 2, 3),
      keyRow(5, 6, 7),
      keyRow(8, 9, 0),
      keyRow('clear', 0, 'enter'),
    ],
  )
}

function keyRow(k1, k2, k3) {
  return html.div(
    {
      class: 'keypad-row',
    },
    [k1, k2, k3].map(key),
  )
}

function key(k) {
  return html.div(
    {
      class: `
        keypad-key
        ${
          k === 'enter'
            ? 'keypad-key-enter'
            : k === 'clear'
              ? 'keypad-key-clear'
              : ''
        }
      `,
    },
    k
  )
}
