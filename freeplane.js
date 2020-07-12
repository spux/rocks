import 'https://unpkg.com/dataisland?module'
import { h, html, render } from 'https://unpkg.com/spux?module'
import updateThis from 'https://unpkg.com/spux-modules@0.0.4/updatethis.js'
import Navbar from 'https://unpkg.com/spux-components/Navbar.js'
import MediaObject from 'https://unpkg.com/spux-components/MediaObject.js'
import Plyr from 'https://jspm.dev/plyr'

var arr
var id = 'data'

globalThis.defaults = globalThis.defaults || {}
globalThis.defaults._target = globalThis.defaults._target || document.body

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/spux-rocks/freeplane.css" />`
)

// render
document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/plyr@3/dist/plyr.css" />`
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
        ><a style="color: #3B5998; font-weight: bold" href="${weblink}"
          >➥ ${props.node.TEXT}</a
        ></span
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
      <li id=${props.node.ID}>
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
    <${Navbar} title="${di.data.map.node.TEXT}" />
    <div id="myUL"><${Node} node=${di.data.map.node} /></div>
  `,
  globalThis.defaults._target
)

var videos = [...document.getElementsByTagName('li')].filter(i =>
  i.children[0]?.children[0]?.href.match(/youtube.com/)
)

setTimeout(() => {
  if (!videos || videos.length == 0) return
  console.log(MediaObject)
  render(
    html`
      <${MediaObject}
        style="max-width: 854px; height: 480px;"
        contentUrl="${videos[0].children[0]?.children[0]?.href}"
      />
    `,
    videos[0]
  )

  globalThis.player = new Plyr('#player', {})
}, 500)
