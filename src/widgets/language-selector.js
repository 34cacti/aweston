import * as html from '@hyperapp/html'

export default function(language, languages, setLanguage) {
  return html.div(
    {
      id: 'widget-language-selector',
    },
    [
      html.form([
        html.label('Language'),
        html.select(
          {
            oncreate: el => { el.value = language },
            onchange: ev => setLanguage(ev.target.value),
          },
          languages.map(lang => html.option({value: lang}, lang))
        ),
      ]),
    ],
  )
}
