import 'https://cdn.skypack.dev/dior'
import { render, html } from 'https://cdn.skypack.dev/spux'
import updateThis from 'https://unpkg.com/spux-modules/updatethis.js'
import JSONEditor from 'https://cdn.skypack.dev/jsoneditor'

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spux-assets/css/jsoneditor.css" />`
)

render(
  html`
    <div id="jsoneditor" style="width: 100%; height: 400px;"></div>
    <div id="view"></div>
  `,
  document.body
)

var id = 'data'

// create the editor
const container = document.getElementById('jsoneditor')
var options = {
  onChangeJSON: json => {
    console.log('updating', json)
    di.data = json
    updateThis(id)
    renderAll()
  }
}
const editor = new JSONEditor(container, options)

editor.set(di[id])

// get json
const updatedJson = editor.get()

function renderAll () {
  render(
    html`
      <hr />
      <h1>${di.data.name}</h1>
      <p>${di.data.description}</p>
      <video width="500" controls src="${di.data.contentUrl}"></video>
      <h5>Views: ${di.data.interactionStatistic.userInteractionCount}</h5>
      <p>Duration: ${di.data.duration}</p>
    `,
    view
  )
}

renderAll()
