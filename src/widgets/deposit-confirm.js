import * as html from '@hyperapp/html'

export default function(account, value, continueCallback) {
  return html.div([
    html.div(`$${value} deposited into ${account} account.`),
    html.button({onclick: () => continueCallback()}, 'Continue'),
  ])
}
