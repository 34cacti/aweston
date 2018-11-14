import * as html from '@hyperapp/html'

export default function view(content, onclick = () => {}, color = 'yellow') {
  return html.div(
    {
      class: 'btn btn-circle',
      style: {
        background: color,
      },
    },
    content,
  )
}
