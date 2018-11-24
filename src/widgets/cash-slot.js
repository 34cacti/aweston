import * as html from '@hyperapp/html'

import {DeviceStates} from '../types/device-states'

export default function view(deviceState, onclick = () => {}) {
  return html.div(
    {
      id: 'cash-slot-widget',
      class: deviceState === DeviceStates.WAITING_FOR_USER
        ? 'cash-slot-waiting-for-user'
        : null,
      onclick: () => onclick(),
    },
    [
      html.div(
        {
          id: 'cash-slot-indicator',
          style: {
            background: deviceState,
          },
        },
      ),
    ],
  )
}
