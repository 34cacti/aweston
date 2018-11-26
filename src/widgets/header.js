import * as html from '@hyperapp/html'

export default function view(
  logUserOut,
  goBack,
  currentPage,
  language,
  openLanguageSelector,
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
          // NOTE: Reverse order of element, but styling will render in the other order
          logUserOut ? logoutButton(() => logUserOut()) : null,
          languageSelectorButton(language, openLanguageSelector),
        ]
      ),
    ]
  )
}

function logoutButton(onclick) {
  return html.button({class: 'warning', style: {zIndex: 10}, onclick}, 'Logout')
}

function goBackButton(onclick) {
  return html.button({onclick}, 'Back')
}

function languageSelectorButton(language, onClick) {
  return html.button({onclick: () => onClick()}, language)
}
