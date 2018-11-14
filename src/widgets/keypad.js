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
    ],
  )
}

function keyRow(k1, k2, k3) {
  return html.div(
    {
      class: 'flex flex-row flex-justify-center',
    },
    [k1, k2, k3].map(key),
  )
}

function key(k) {
  return html.div(
    {
      class: 'widget-key',
    },
    k
  )
}
