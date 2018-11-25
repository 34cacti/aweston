import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'

export default function view(requestPageTransition, account) {
  return html.div(
    {
      id: 'page-withdraw',
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
          withdrawForms(),
        ]
      ),
    ],
  )
}

function withdrawForms() {
    return html.form(
    [
      html.label('Enter Amount'),
      html.input(
        {
          oncreate: el => {
            el.focus()
            el.value = '$20.00'
          },
        },
      ),

      html.button(
        {
          class: 'btn',
        },
        [
          'Withdraw',
        ]
      ),
    ],
  )
}