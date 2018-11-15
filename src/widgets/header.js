import * as html from '@hyperapp/html'

const brandName = 'Iron Bank of Braavos'

export default function view(
  logUserOut,
  account /* {number, holder} */,
) {
  return html.div(
    {
      id: 'widget-header',
      class: 'flex flex-row justify-space-between'
    },
    [
      html.span(brandName),
      account === null
        ? null
        : html.span(
          {
          },
          [
            html.span(account.number),
            html.span(account.holder),
            logoutButton(() => logUserOut()),
          ]
        ),
    ],
  )
}

function logoutButton(onclick) {
  return html.button({class: 'warning', onclick}, 'Logout')
}
