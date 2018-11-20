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
      keyRow(null, 0, null),
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
  return html.button(
    {
      class: 'keypad-key',
    },
    k
  )
}
