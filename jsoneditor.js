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
      <div id="jsoneditor" style="width: 400px; height: 400px;"></div>
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
    }
  }
  const editor = new JSONEditor(container, options)

  editor.set(di[id])

  // get json
  const updatedJson = editor.get()

