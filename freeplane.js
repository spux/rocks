import 'https://unpkg.com/dataisland?module'
import { h, html, render } from 'https://unpkg.com/spux?module'
import updateThis from 'https://unpkg.com/spux-modules@0.0.4/updatethis.js'

var arr
var id = 'data'

const NodeText = props => {
  if (props.node.LINK) {
    var weblink = props.node.LINK.replace(/\.[^.]+$/, '.html')
    return html`
      <a href="${weblink}">${props.node.TEXT}</a>
    `
  } else {
    return html`
      ${props.node.TEXT}
    `
  }
}

const Node = props => {
  var children = props.node.node ? [].concat(props.node.node) : []
  console.log('TEXT', props.node.TEXT)
  console.log('children', children)
  return html`
    <ul>
      <li>
        <${NodeText} node="${props.node}" />
      </li>
      <ul>
        ${children.map(i => {
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
