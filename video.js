import 'https://unpkg.com/dior'
import { h, html, render, Component } from 'https://unpkg.com/spux?module'
import Plyr from 'https://jspm.dev/plyr'

globalThis.defaults = {
  provider: 'youtube',
  embedid: 'm3jNb7IdJHQ',
  t: 0,
  currentTime: 0
}

globalThis.spux = { ...defaults, ...di.data, ...qs }

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/plyr@3/dist/plyr.css" />`
)

render(
  html`
    <div class="container">
      <div
        id="player"
        data-plyr-provider="${spux.provider}"
        data-plyr-embed-id="${spux.embedid}"
      ></div>
    </div>
  `,
  document.body
)

globalThis.player = new Plyr('#player', {})
console.log(spux)

globalThis.player.on('ready', event => {
  globalThis.player.currentTime = parseInt(spux.currentTime || parseInt(spux.t))
})
