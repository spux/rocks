import 'https://unpkg.com/dataisland?module'
import { h, html, render } from 'https://unpkg.com/spux?module'
import updateThis from 'https://unpkg.com/spux-modules@0.0.4/updatethis.js'
import Navbar from 'https://unpkg.com/spux-components/Navbar.js'

var arr
var id = 'data'

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/spux-rocks/freeplane.css" />`
)

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/spux-components/css/spux.css" />`
)

const NodeText = props => {
  if (props.node.LINK) {
    var weblink = props.node.LINK.replace(/\.mm$/, '.html')
    return html`
      <span class="${props.caret ? 'caret' : ''}"
        ><a href="${weblink}">${props.node.TEXT}</a></span
      >
    `
  } else {
    return html`
      <span class="${props.caret ? 'caret' : ''}">${props.node.TEXT}</span>
    `
  }
}

const Node = props => {
  var children = props.node.node ? [].concat(props.node.node) : []
  var caret = !!children.length
  console.log('TEXT', props.node.TEXT)
  console.log('children', children)
  return html`
    <ul class="active">
      <li>
        <${NodeText} caret=${caret} node="${props.node}" />
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
    <${Navbar} title="${di.data.map.TEXT}" />
    <div id="myUL"><${Node} node=${di.data.map.node} /></div>
  `,
  document.body
)
