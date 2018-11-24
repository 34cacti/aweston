import * as html from '@hyperapp/html'

import {PageTypes} from '../pages'

export default function view(requestPageTransition, account) {
  if (account === null) {
    requestPageTransition(PageTypes.WELCOME)
    return null
  }
  return html.div(
    {
      id: 'page-deposit',
      class: 'page',
    },
    [
      html.div(
        [
          html.select(
            {
              onchange: ev => console.log(ev),
            },
            Object.keys(account.accounts).map(
              accountName =>
              html.option(
                {value: accountName},
                `${accountName}  $${account.accounts[accountName]}`
              )
            )
          ),
          html.button(
            {onclick: () => requestPageTransition(PageTypes.MENU)},
            'Click to continue to Menu Screen',
          ),
        ]
      ),
    ],
  )
}
