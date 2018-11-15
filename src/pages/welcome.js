import * as html from '@hyperapp/html'

import circleButton from '../widgets/button-circle'
import {PageTypes} from '../pages'

export default function view(requestPageTransition) {
  return html.div(
    {
      id: 'page-welcome',
      class: 'page',
    },
    [
      html.button(
        {
          onclick: () => requestPageTransition(PageTypes.LOGIN),
        },
        ['touch to begin'],
      ),
    ],
  )
}
