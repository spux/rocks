// imports
import 'https://unpkg.com/dior'
import { h, html, render, Component } from 'https://unpkg.com/spux?module'
import Plyr from 'https://jspm.dev/plyr'

// defaults
globalThis.defaults = globalThis.defaults || {}
globalThis.defaults['@id'] = '#1'
globalThis.defaults['@type'] = 'MediaObject'
globalThis.defaults['contentUrl'] =
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
globalThis.defaults['startTime'] = 0

globalThis.defaults._target = globalThis.defaults._target || document.body

// init
globalThis.spux = { ...defaults, ...di.data, ...qs }

console.log('target', defaults._target)

// render
document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/plyr@3/dist/plyr.css" />`
)

if (spux.contentUrl.includes('youtube.com')) {
  render(
    html`
      <div class="container">
        <div
          id="player"
          data-plyr-provider="youtube"
          data-plyr-embed-id="${spux.contentUrl}"
        ></div>
      </div>
    `,
    document.body
  )
} else if (spux.contentUrl.includes('vimeo.com')) {
  render(
    html`
      <div class="container">
        <div
          id="player"
          data-plyr-provider="vimeo"
          data-plyr-embed-id="${spux.contentUrl}"
        ></div>
      </div>
    `,
    document.body
  )
} else {
  render(
    html`
      <video id="player" playsinline controls>
        <source src="${spux.contentUrl || spux.src}" type="video/mp4" />
      </video>
    `,
    defaults._target
  )
}

// main
globalThis.player = new Plyr('#player', {})

globalThis.player.on('ready', event => {
  var start =
    parseInt(spux.currentTime) || parseInt(spux.t) || parseInt(spux.startTime)
  globalThis.player.currentTime = start
  setTimeout(() => {
    console.log('start', start)

    globalThis.player.currentTime = start
  }, 2000)
})
