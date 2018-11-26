import * as html from '@hyperapp/html'

export default function(languages, setLanguage) {
  return html.div(
    {
      id: 'widget-language-selector',
    },
    [
      html.form([
        html.label('Language'),
        html.select(
          {
            onchange: ev => setLanguage(ev.target.value),
          },
          languages.map(lang => html.option({value: lang}, lang))
        ),
      ]),
    ],
  )
}
