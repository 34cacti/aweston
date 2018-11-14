import * as html from '@hyperapp/html'

import circleButton from '../widgets/button-circle'
import {PageTypes} from '../pages'

export default function view(requestPageTransition) {
  return html.div(
    {
      id: 'page-menu',
      class: 'page',
    },
    [
      html.div(
        [
          'Menu',
          html.div([
            html.select({
              value: 'Checking',
            },
              [
                html.option('Checking'),
                html.option('Savings'),
                html.option('TFSA'),
              ]
            ),
            html.button('Transfer'),
            html.button('Deposit'),
            html.button('Withdraw'),
          ]),
        ],
      ),
    ],
  )
}
