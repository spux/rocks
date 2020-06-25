import 'https://jspm.dev/dior'
import { h, html, render, Component } from 'https://unpkg.com/spux?module'
import Plyr from 'https://jspm.dev/plyr'

globalThis.qs = Object.fromEntries(
  new URLSearchParams(document.location.search)
)

globalThis.defaults = {
  provider: 'youtube',
  embedid: 'm3jNb7IdJHQ'
}

var provider, embedid

if (di && di.data) {
  provider = di.data.provider
  embedid = di.data.embedid
}

provider = qs.provider || provider || defaults.provider
embedid = qs.embedid || embedid || defaults.embedid

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/plyr@3/dist/plyr.css" />`
)

render(
  html`
    <div class="container">
      <div
        id="player"
        data-plyr-provider="${provider}"
        data-plyr-embed-id="${embedid}"
      ></div>
    </div>
  `,
  document.body
)

new Plyr('#player', {})
