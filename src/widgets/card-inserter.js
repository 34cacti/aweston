import {DeviceStates} from '../device-states'
import * as html from '@hyperapp/html'

export default function view(deviceState, onclick = () => {}) {
  return html.div(
    {
      id: 'card-inserter-widget',
      class: deviceState === DeviceStates.WAITING_FOR_USER
        ? 'card-inserter-waiting-for-user'
        : null,
      onclick: () => onclick(),
    },
    [
      html.div(
        {
          id: 'card-inserter-indicator',
          style: {
            background: deviceState,
          },
        },
      ),
    ],
  )
}
