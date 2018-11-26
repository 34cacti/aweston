import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'
import {LoginStates} from '../types/login-states'
import loadingIcon from '../widgets/loading-icon'

export default function view(state, logUserIn) {
  return html.div(
    {
      id: 'page-login',
      class: 'page',
    },
    renderViewBasedOnState(state, logUserIn),
  )
}

function renderViewBasedOnState(state, logUserIn) {
  switch (state.currentMode) {
    case LoginStates.INITIAL:
      return initialView(state.message, logUserIn)

    case LoginStates.VERIFYING:
      return verifyingView()

    default:
      return 'Unknown login mode'
  }
}

function initialView(message, logUserIn) {
  return html.div([
    html.h3([
      html.div('Please insert or swipe card.'),
      html.div('Alternatively you may enter account number and pin.'),
      message ? html.div({style: 'color: red'}, message) : null,
    ]),
    credentialForms(logUserIn),
  ])
}

function credentialForms(logUserIn) {
  return html.form(
    {
      onsubmit: ev => onSubmit(ev, logUserIn),
    },
    [
      html.label('Account number'),
      html.input(
        {
          oncreate: el => {
            el.focus()
            el.value = '2347823894215673'
          },
        },
      ),

      html.label('Pin'),
      html.input(
        {
          type: 'password',
          oncreate: el => {
            el.value = 'pin#'
          },
        },
      ),

      html.button('Verify Pin'),
    ],
  )
}

function verifyingView() {
  return html.div(
    {
      class: 'login-verifying',
    },
    [
      html.div('Verifying. Please wait...'),
      loadingIcon(),
    ]
  )
}

function onSubmit(ev, logUserIn) {
  ev.preventDefault()
  logUserIn()
}
