import * as html from '@hyperapp/html'

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
        html.input(
          {
            type: 'password',
            oncreate: el => {
              el.focus()
            },
            onkeydown: ev => {
              if (ev.code === 'Enter')
                loginUser()
            },
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
