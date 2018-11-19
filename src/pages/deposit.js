import * as html from '@hyperapp/html'

import {PageTypes} from '../pages'

export default function view(requestPageTransition) {
  return html.div(
    {
      id: 'page-deposit',
      class: 'page',
    },
    [
      html.div(
        [
          html.h3('Deposit'),
          html.button(
            {onclick: () => requestPageTransition(PageTypes.MENU)},
            'Click to continue to Menu Screen',
          ),
        ]
      ),
    ],
  )
}
