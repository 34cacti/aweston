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
              html.button(
                {onclick: () => requestPageTransition(PageTypes.TRANSFER)},
                'Transfer'
              ),
              html.button(
                {onclick: () => requestPageTransition(PageTypes.DEPOSIT)},
                'Deposit'
              ),
              html.button(
                {onclick: () => requestPageTransition(PageTypes.WITHDRAW)},
                'Withdraw'
              ),
            ]
          ),
        ],
      ),
    ],
  )
}
