import * as html from '@hyperapp/html'

export default function view() {
  return html.div(
    {
      id: 'widget-keypad',
    },
    [
      keyRow(1, 2, 3, 'del'),
      keyRow(4, 5, 6, 'clear'),
      keyRow(7, 8, 9, ''),
      keyRow('', 0, '.', 'enter'),
    ],
  )
}

function keyRow(k1, k2, k3, k4) {
  return html.div(
    {
      class: 'keypad-row',
    },
    [k1, k2, k3, k4].map(key),
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
              : k === 'del'
                ? 'keypad-key-delete'
                : null
        }
      `,
    },
    k
  )
}
