import * as html from '@hyperapp/html'

export default function view(
  logUserOut,
  account /* {number, holder} */,
  currentPage,
) {
  return html.div(
    {
      id: 'widget-header',
    },
    [
      html.div(
        {
          id: 'header-account',
          class: 'header-col',
        },
        account ? `Hi, ${account.holder}` : null
      ),
      html.div({class: 'header-col'}, currentPage),
      html.div(
        {
          id: 'header-logout',
          class: 'header-col',
        },
        [
          html.button({onclick: () => {}}, 'EN'),
          account ? logoutButton(() => logUserOut()) : null,
        ]
      ),
    ]
  )
}

function logoutButton(onclick) {
  return html.button({class: 'warning', onclick}, 'Logout')
}
