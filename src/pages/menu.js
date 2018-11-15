import * as html from '@hyperapp/html'

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
          html.h3('Menu'),
          html.div(
            {
              class: 'flex flex-column',
            },
            [
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
            ]
          ),
        ],
      ),
    ],
  )
}
