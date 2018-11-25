import * as html from '@hyperapp/html'

export default function() {
  return html.div(
    {class: 'spinner'},
    [
      html.div({class: 'bounce1'}),
      html.div({class: 'bounce2'}),
      html.div({class: 'bounce3'}),
    ]
  )
}
