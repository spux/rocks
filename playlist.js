// imports
import 'https://unpkg.com/dior'
import { h, html, render, Component } from 'https://unpkg.com/spux?module'
import Plyr from 'https://jspm.dev/plyr'
import MediaObject from 'https://unpkg.com/spux-components/MediaObject.js'
import updateThis from 'https://unpkg.com/spux-modules@0.0.4/updatethis.js'

// defaults
globalThis.defaults = {
  '@id': '',
  currentTrack: '#1'
}

// init
globalThis.spux = {
  ...defaults,
  ...getThingsByType('MediaObject')[0],
  ...qs
}

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

function getThingsByType (type) {
  return di.data.filter(i => {
    return i.type === type || i['@type'] === type
  })
}

class App extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    let item = e.target.getAttribute('item')
    console.log('item', item)
    di.data[0].currentTrack = item
    let mo = getThingsByType('MediaObject').find(i => i['@id'] === item)
    console.log('mo', mo)

    // let mo = di.data[item]
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
          ${getThingsByType('MediaObject').map((i, j) => {
            return html`
              <div
                key="${j}"
                item="${i['@id']}"
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

  function saveOnPause () {
    player.on('pause', e => {
      console.log('setting startTime', e)
      di.data.find(
        i => di.data[1].currentTrack === i['@id']
      ).startTime = Math.floor(player.currentTime)
      document.getElementById('data').innerText = JSON.stringify(
        di.data,
        null,
        2
      )
      updateThis()
    })
  }

  setTimeout(saveOnPause, 2000)
})
