// imports
import 'https://unpkg.com/dior'
import { h, html, render, Component } from 'https://unpkg.com/spux?module'
import Plyr from 'https://jspm.dev/plyr'

// defaults
globalThis.defaults = {
  '@id': '#1',
  '@type': 'MediaObject',
  contentUrl: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  startTime: 0
}

// init
globalThis.spux = { ...defaults, ...di.data[0], ...qs }

// render
document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/plyr@3/dist/plyr.css" />`
)

// render
document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://spux.org/css/spux.css" />`
)

const MediaObject = props => {
  if (props.contentUrl.includes('youtube.com')) {
    return html`
      <div class="container">
        <div
          id="player"
          data-plyr-provider="youtube"
          data-plyr-embed-id="${props.contentUrl}"
        ></div>
      </div>
    `
  } else if (props.contentUrl.includes('vimeo.com')) {
    return html`
      <div class="container">
        <div
          id="player"
          data-plyr-provider="vimeo"
          data-plyr-embed-id="${props.contentUrl}"
        ></div>
      </div>
    `
  } else {
    return html`
      <video id="player" playsinline controls>
        <source src="${props.contentUrl}" type="video/mp4" />
      </video>
    `
  }
}

class App extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    let item = e.target.getAttribute('item')
    let mo = di.data[item]
    console.log(mo)
    spux.contentUrl = mo.contentUrl
    let sources = []

    if (mo.contentUrl.includes('youtube.com')) {
      sources = [{ provider: 'youtube', src: mo.contentUrl.split('/').pop() }]
    } else if (mo.contentUrl.includes('vimeo.com')) {
      sources = [{ provider: 'vimeo', src: mo.contentUrl.split('/').pop() }]
    } else {
      sources = [{ type: 'video/mp4', src: mo.contentUrl }]
    }

    globalThis.player.source = {
      type: 'video',
      sources: sources
    }
  }

  render () {
    var that = this
    return html`
      <div class="row">Playlist</div>
      <div class="row" id="playlist">
        <div class="col 1 vc">
          <div class="row"></div>
          ${di.data.map((i, j) => {
            return html`
              <div
                key="${j}"
                item="${j}"
                onClick=${this.handleChange}
                class="row btn"
              >
                ${i.name}
              </div>
            `
          })}
        </div>
        <div class="col" id="target">
          <${MediaObject} contentUrl=${spux.contentUrl} />
        </div>
      </div>
    `
  }
}

render(h(App), document.body)

// main
globalThis.player = new Plyr('#player', {})

globalThis.player.on('ready', event => {
  var start =
    parseInt(spux.currentTime) || parseInt(spux.t) || parseInt(spux.startTime)
  globalThis.player.currentTime = start
})
