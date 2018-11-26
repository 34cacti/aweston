import * as html from '@hyperapp/html'

export default function(closeModal, component, data) {
  return html.div(
    {
      id: 'widget-modal',
    },
    [
      html.div({class: 'close-icon', onclick: () => closeModal()}),
      component(...data),
    ]
  )
}
