import * as html from '@hyperapp/html'

import {DeviceStates} from '../types/device-states'

export default function view(deviceState, onclick = () => {}) {
  return html.div(
    {
      id: 'card-swiper-widget',
      class: deviceState === DeviceStates.WAITING_FOR_USER
        ? 'card-swiper-waiting-for-user'
        : null,
      onclick: () => onclick(),
    },
    [
      html.div(
        {
          id: 'card-swiper-indicator',
          style: {
            background: deviceState,
          },
        },
      ),
    ],
  )
}
