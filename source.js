import 'https://unpkg.com/dataisland?module'
import { h, html, render } from 'https://unpkg.com/spux?module'
import updateThis from 'https://unpkg.com/spux-modules@0.0.4/updatethis.js'

var arr
var id = 'data'
var desc = JSON.stringify(di[id], null, 2)
var rows = desc ? desc.split('\n').length + 1 : 2
var cols = 80
const editStyle =
  'font-family: monospace; font-size: 100%; min-width:60em; margin: 1em 0.2em 1em 0.2em; padding: 1em; border: 0.1em solid #888; border-radius: 0.5em;'

function save () {
  updateThis(id)
  //   alert('save not yet implemented')
}

render(
  html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon icon-tabler icon-tabler-code"
      width="44"
      height="44"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <polyline points="7 8 3 12 7 16" />
      <polyline points="17 8 21 12 17 16" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>

    <hr />
    <textarea cols="${cols}" rows="${rows}">
        ${desc}
    </textarea
    >
    <hr />
    <span onclick=${save}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-floppy-disk"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#2c3e50"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" />
        <path
          d="M18 20h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9l5 5v9a2 2 0 0 1 -2 2"
        />
        <circle cx="12" cy="13" r="2" />
        <polyline points="4 8 10 8 10 4" />
      </svg>
    </span>
  `,
  document.body
)
