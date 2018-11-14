import * as html from '@hyperapp/html'

import circleButton from '../widgets/button-circle'
import {PageTypes} from '../pages'

export default function view(requestPageTransition) {
  return html.div(
    {
      id: 'page-login',
      class: 'page',
      onclick: () => requestPageTransition(PageTypes.MENU),
    },
    [
      html.div(
        'Login',
      ),
    ],
  )
}
