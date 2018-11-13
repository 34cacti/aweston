import * as html from '@hyperapp/html'
import {app as hyperapp} from 'hyperapp'
import devtools from 'hyperapp-redux-devtools'

import {getLogger} from './logger'

const logger = getLogger('main')

const state = {
}

const actions = {
  oncreate: el => (state, actions) => {
  },
}

function view(state, actions) {
  return html.div(
    {
      id: 'app',
      oncreate: el => actions.oncreate(el),
    },
    [
      'hello world',
    ]
  )
}

function registerEventHandlers(el, actions) {
  window.addEventListener('resize', () => {
    actions.onWindowResize({height: el.offsetHeight, width: el.offsetWidth})
  })
}

const app = devtools(hyperapp)(state, actions, view, document.querySelector('#root'))
