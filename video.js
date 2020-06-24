import 'https://jspm.dev/dior'
import { h, html, render, Component } from 'https://unpkg.com/spux?module'
import Plyr from 'https://jspm.dev/plyr'

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/plyr@3/dist/plyr.css" />`
)

render(
  html`
    <div class="container">
      <div
        id="player"
        data-plyr-provider="youtube"
        data-plyr-embed-id="${di.data.youtubeid}"
      ></div>
    </div>
  `,
  document.body
)

new Plyr('#player', {})
