import * as html from '@hyperapp/html'

import {DeviceStates} from '../types/device-states'

export default function view(deviceState, onclick = () => {}) {
  return html.div(
    {
      id: 'cash-slot-widget',
      onclick: () => onclick(),
    },
    [
      html.div(
        {
          class: deviceState === DeviceStates.WAITING_FOR_USER
            ? 'indicator-flashing'
            : null,
          id: 'cash-slot-indicator',
        },
      ),
    ],
  )
}