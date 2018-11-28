import * as html from '@hyperapp/html'

export default function(from, to, value, continueCallback) {
  return html.div([
    html.div(`$${value} transfered from ${from} account into ${to} account.`),
    html.button({onclick: () => continueCallback()}, 'Continue'),
  ])
}
