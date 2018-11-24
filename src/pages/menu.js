import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'

export default function view(requestPageTransition, account) {
  return html.div(
    {
      id: 'page-menu',
      class: 'page',
    },
    [
      html.div(
        [
          html.div(
            {
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
