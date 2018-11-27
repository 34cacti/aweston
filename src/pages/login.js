import * as html from '@hyperapp/html'

import {PageTypes} from '../types/pages'
import {LoginStates} from '../types/login-states'
import loadingIcon from '../widgets/loading-icon'

export default function view(state, logUserIn, credentialsClick) {
  return html.div(
    {
      id: 'page-login',
      class: 'page',
    },
    renderViewBasedOnState(state, logUserIn, credentialsClick),
  )
}

function renderViewBasedOnState(state, logUserIn, credentialsClick) {
  switch (state.currentMode) {
    case LoginStates.INITIAL:
      return initialView(state, logUserIn, credentialsClick)

    case LoginStates.VERIFYING:
      return verifyingView()

    default:
      return 'Unknown login mode'
  }
}

function initialView(state, logUserIn, credentialsClick) {
  return html.div([
    html.h3([
      html.div('Please insert or swipe card.'),
      html.div('Alternatively you may enter account number and pin.'),
      state.message ? html.div({style: 'color: red'}, state.message) : null,
    ]),
    credentialForms(state, logUserIn, credentialsClick),
  ])
}

function credentialForms(state, logUserIn, credentialsClick) {
  const [isFormValid, warningMessage] = formValid(state)

  return html.form(
    {
      onsubmit: ev => onSubmit(ev, logUserIn),
    },
    [
      html.label('Account number'),
      html.input(
        {
          value: state.accountNumber,
          readonly: true,
          onclick: () => credentialsClick(),
        },
      ),

      html.label('Pin'),
      html.input(
        {
          value: state.pin,
          readonly: true,
          onclick: () => credentialsClick(),
          type: 'password',
        },
      ),

      html.div(
        {
          style: {
            display: 'flex',
          },
        },
        [
        html.button(
          {
            disabled: !isFormValid,
          },
          'Login'
        ),
        warningMessage ? html.div({class: 'warning'}, warningMessage) : null,
      ]),
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

function formValid(state) {
  return (state.accountNumber && state.pin)
    ? [true, null]
    : [false, 'Please enter account number and pin']
}
