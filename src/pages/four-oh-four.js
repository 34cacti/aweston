import * as html from '@hyperapp/html'

import {PageTypes} from '../pages'

export default function view(requestPageTransition) {
  return html.div(
    {
      id: 'page-404',
      class: 'page',
    },
    [
      html.div(
        html.h3('$404'),
        html.button(
          {onclick: requestPageTransition(PageTypes.WELCOME)},
          'Click to continueto Welcome Screen',
        )
      ),
    ],
  )
}
