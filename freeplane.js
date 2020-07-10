import 'https://unpkg.com/dataisland?module'
import { h, html, render } from 'https://unpkg.com/spux?module'
import updateThis from 'https://unpkg.com/spux-modules@0.0.4/updatethis.js'

var arr
var id = 'data'

const Node = props => {
  return html`
    <ul>
      <li>${props.node.TEXT}</li>

      <ul>
        ${props.node?.node?.map(i => {
          return html`
            <${Node} node=${i} />
          `
        })}
      </ul>
    </ul>
  `
}

render(
  html`
    <div><${Node} node=${di.data.map.node} /></div>
  `,
  document.body
)
