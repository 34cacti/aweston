import * as html from '@hyperapp/html'

export default function(amount) {
  return html.div(`You are about to withdraw $${amount}. Please open the cash slot to continue.`)
}
