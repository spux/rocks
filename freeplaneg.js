// imports
import 'https://cdn.skypack.dev/dataisland'
import { h, html, render, Component } from 'https://cdn.skypack.dev/spux'
import updateThis from 'https://unpkg.com/spux-modules/updatethis.js'
import Navbar from 'https://unpkg.com/spux-components/Navbar.js'
import MediaObject from 'https://unpkg.com/spux-components/MediaObject.js'
import Plyr from 'https://jspm.dev/plyr'
import handleMutation from 'https://unpkg.com/spux-modules/handlemutation.js'
import refreshThis from 'https://unpkg.com/spux-modules/refreshthis.js'
//import 'https://cdn.skypack.dev/gun/gun'
//import 'https://spux.net/gun'
// import 'https://cdn.skypack.dev/gun/sea'
// import 'https://cdn.skypack.dev/gun/lib/webrtc'
// import 'https://cdn.skypack.dev/gun/lib/open'

var updatesUri = 'wss://melvincarvalho.com:3000/gun'
if (location.href.match(/localhost/)) {
  updatesUri = 'ws://localhost:8765/gun'
}

var gun = Gun(updatesUri)

var user = gun.user()
var username = 'test'
var jsonuri = location.href.substr(0, location.href.lastIndexOf('.')) + '.json'
var uri = location.href.match(/localhost/)
  ? 'https://melvincarvalho.com/mm/index.json'
  : jsonuri

var data
globalThis.data = data

/** Used to map HTML entities to characters. */
const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'"
}

/** Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|apos|quot|#(0+)?39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)

function unescape (string) {
  return string && reHasEscapedHtml.test(string)
    ? string.replace(reEscapedHtml, entity => htmlUnescapes[entity] || "'")
    : string || ''
}

gun
  .get(username)
  .get(uri)
  .open(d => {
    data = d
    globalThis.data = data
    console.log('data', data)
    di.data = JSON.parse(data)
    render(h(App), globalThis.defaults._target)
  })

globalThis.refreshThis = refreshThis

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
  var icon
  var cdn1 = 'https://unpkg.com/spux-assets@0.0.2/images/icons/'
  var cdn2 = 'https://twemoji.maxcdn.com/v/12.1.4/svg/'
  var extension = '.svg'
  if (props.node.icon && props.node.icon['@_BUILTIN']) {
    if (props.node.icon['@_BUILTIN'].match(/^emoji-/)) {
      icon =
        cdn2 +
        props.node.icon['@_BUILTIN']
          .split('-')
          .pop()
          .toLowerCase() +
        extension
    } else {
      icon = cdn1 + props.node.icon['@_BUILTIN'] + extension
    }
  }
  const Icon = () => {
    return icon
      ? html`
          <img height="16" width="16" src=${icon} />
        `
      : ''
  }
  if (props.node['@_LINK']) {
    function absoluteOrigin (href) {
      var a = document.createElement('a')
      a.href = href
      return new URL(a.href).origin
    }
    var weblink = props.node['@_LINK'].replace(/\.mm$/, '.html')
    var origin = absoluteOrigin(location.origin)
    var linkOrigin = absoluteOrigin(props.node['@_LINK'])
    var color = origin === linkOrigin || !linkOrigin ? '#3B5998' : 'green'
    var target = origin === linkOrigin || !linkOrigin ? '' : '_blank'

    if (
      props.node['@_LINK'] &&
      props.node['@_LINK'].match &&
      props.node['@_LINK'].match(/.png$/)
    ) {
      var maxHeight = 100
      return html`
        <span style=${style} class="${props.caret ? 'caret' : ''}"
          ><img height="${maxHeight}" src=${props.node['@_LINK']}
        /></span>
      `
    } else {
      return html`
        <span class="${props.caret ? 'caret' : ''}"
          ><${Icon} /><a
            target="${target}"
            style="color: ${color}; font-weight: bold"
            href="${weblink}"
            >➥ ${unescape(props.node['@_TEXT'])}</a
          ></span
        >
      `
    }
  } else if (
    props.node &&
    props.node['@_TEXT'] &&
    props.node['@_TEXT'].match &&
    props.node['@_TEXT'].match(/.png$/) &&
    props.node['@_LINK'] &&
    props.node['@_LINK'].match &&
    props.node['@_LINK'].match(/.png$/)
  ) {
    return html`
      <span style=${style} class="${props.caret ? 'caret' : ''}"
        ><img src=${props.node.hook['@_LINK']}
      /></span>
    `
  } else {
    var style = ''
    var factor = 1.6
    if (props.node && props.node.font && props.node.font['@_BOLD']) {
      style += `font-weight: bold;`
    }
    if (props.node && props.node.font && props.node.font['@_SIZE']) {
      style += `font-size: ${Math.floor(props.node.font['@_SIZE'] * factor)};`
    }
    if (props.node && props.node['@_COLOR']) {
      style += `color: ${props.node['@_COLOR']};`
    }
    return html`
      <span style=${style} class="${props.caret ? 'caret' : ''}"
        ><${Icon} />${unescape(props.node['@_TEXT'])}</span
      >
    `
  }
}

const Node = props => {
  var children = props.node.node ? [].concat(props.node.node) : []
  var caret = !!children.length
  console.log('TEXT', props.node['@_TEXT'])
  console.log('@_TEXT', props.node['@_TEXT'])
  console.log('children', children)
  return html`
    <ul class="active">
      <li id="${props.node['@_ID']}" title="${props.node['@_ID']}">
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

class App extends Component {
  constructor (props) {
    super(props)
    this.processMutation = this.processMutation.bind(this)
    this.state = {
      updates: 0
    }
  }

  componentDidMount () {
    handleMutation(id, this.processMutation)
  }

  processMutation () {
    //   this.forceReload()
    console.log('mutation')
    this.setState({ updates: this.state.updates + 1 })
  }

  render () {
    setTimeout(() => {
      var videos = [...document.getElementsByTagName('li')].filter(i =>
        i.children[0]?.children[0]?.href?.match(/youtube.com/)
      )
      console.log(MediaObject)
      if (videos && videos[0]) {
        render(
          html`
            <${MediaObject}
              style="max-width: 854px; height: 480px;"
              contentUrl="${videos[0]?.children[0]?.children[0]?.href}"
            />
          `,
          videos[0]
        )
        globalThis.player = new Plyr('#player', {})
      }
    }, 500)

    setTimeout(() => {
      let id = location.hash
      document.getElementById(location.hash.split('#')[1])?.scrollIntoView()
    }, 600)

    var title = di?.data?.map?.node ? di?.data?.map?.node['@_TEXT'] : 'webmaps'
    return html`
      <div id="myUL">
        <${Navbar} title="${title}" />
        <${Node} node=${di.data.map.node} title=${this.state.updates} />
      </div>
    `
  }
}

render(h(App), globalThis.defaults._target)
