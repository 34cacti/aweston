import * as html from '@hyperapp/html'

export default function view(
  logUserOut,
  goBack,
  currentPage,
) {
  return html.div(
    {
      id: 'widget-header',
    },
    [
      html.div(
        {
          class: 'header-col',
        },
        goBack ? goBackButton(() => goBack()) : null,
      ),
      html.div(
        {
          class: 'header-col',
        },
        currentPage
      ),
      html.div(
        {
          class: 'header-col',
        },
        [
          html.button({onclick: () => {}}, 'EN'),
          logUserOut ? logoutButton(() => logUserOut()) : null,
        ]
      ),
    ]
  )
}

function logoutButton(onclick) {
  return html.button({class: 'warning', onclick}, 'Logout')
}

function goBackButton(onclick) {
  return html.button({class: 'warning', onclick}, 'Back')
}
