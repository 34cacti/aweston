import * as html from '@hyperapp/html'

import circleButton from '../widgets/button-circle'
import {PageTypes} from '../pages'

export default function view(requestPageTransition) {
  return html.div(
    {
      id: 'page-404',
      class: 'page',
      onclick: () => requestPageTransition(PageTypes.WELCOME),
    },
    [
      html.div(
        '404',
        circleButton('404'),
      ),
    ],
  )
}
