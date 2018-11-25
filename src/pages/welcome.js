import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'

export default function view(requestPageTransition) {
  return html.div(
    {
      id: 'page-welcome',
      class: 'page',
    },
    [
      html.button(
        {
          class: 'very-large-button',
          onclick: () => requestPageTransition(PageTypes.LOGIN),
        },
        ['touch to begin'],
      ),
    ],
  )
}
