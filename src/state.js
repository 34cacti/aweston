import {PageTypes} from './pages'
import {DeviceStates} from './device-states'

export const state = {
  page: PageTypes.WELCOME,
  loggedInAccount: null,
  cardInserterState: DeviceStates.IDLE,
  cardSwiperState: DeviceStates.IDLE,
  cashSlotState: DeviceStates.IDLE,
}

