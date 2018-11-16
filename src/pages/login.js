import * as html from '@hyperapp/html'

import keypad from '../widgets/keypad'
import {PageTypes} from '../pages'

export default function view(loginUser) {
  return html.div(
    {
      id: 'page-login',
      class: 'page',
    },
    [
      html.div([
        html.h3('Please enter pin'),
        keypad(),
        html.input(
          {
            type: 'password',
          },
        ),
        html.button(
          {
            class: 'btn',
            onclick: () => loginUser(),
          },
          [
            'Verify Pin',
          ]
        ),
      ]),
    ],
  )
}
