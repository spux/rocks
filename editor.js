import 'https://unpkg.com/dataisland?module'
import { exec, init } from 'https://unpkg.com/spux-modules@0.0.3/pell.js'
var id = 'data'

function updateThis (id) {
  fetch(location.href).then(response =>
    response.text().then(html => {
      var newhtml = html.replace(
        /(<script[^>]*type="application[^>]*>)([\s\S]*?)(<\/script>)/gim,
        '$1' + JSON.stringify(di[id], null, 2) + '$3'
      )
      if (newhtml !== html) {
        fetch(location.href, {
          method: 'PUT',
          body: newhtml,
          headers: {
            'content-type': 'text/html'
          }
        }).then(console.log)
      }
    })
  )
}

// Initialize pell on an HTMLElement
var editor = init({
  methods: {
    ensureHTTP: str => (/^https?:\/\//.test(str) && str) || `http://${str}`
  },

  // <HTMLElement>, required
  element: document.body,

  // <Function>, required
  // Use the output html, triggered by element's `oninput` event
  onChange: html => {
    console.log(html)
    di.data = html
  },

  // <string>, optional, default = 'div'
  // Instructs the editor which element to inject via the return key
  defaultParagraphSeparator: 'div',

  // <boolean>, optional, default = false
  // Outputs <span style="font-weight: bold;"></span> instead of <b></b>
  styleWithCSS: false,

  // <Array[string | Object]>, string if overwriting, object if customizing/creating
  // action.name<string> (only required if overwriting)
  // action.icon<string> (optional if overwriting, required if custom action)
  // action.title<string> (optional)
  // action.result<Function> (required)
  // Specify the actions you specifically want (in order)
  actions: [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'heading1',
    'heading2',
    'paragraph',
    'quote',
    'olist',
    'ulist',
    'code',
    'line',
    {
      name: 'image',
      result: () => {
        const url = window.prompt('Enter the image URL')
        if (url) exec('insertImage', url)
      }
    },
    {
      name: 'link',
      result: () => {
        const url = window.prompt('Enter the link URL')
        if (url) exec('createLink', url)
      }
    },
    {
      name: 'save',
      icon: 'S',
      title: 'Save',
      result: () => {
        console.log('Save!')
        updateThis('data')
      }
    }
  ],

  // classes<Array[string]> (optional)
  // Choose your custom class names
  classes: {
    actionbar: 'pell-actionbar',
    button: 'pell-button',
    content: 'pell-content',
    selected: 'pell-button-selected'
  }
})

editor.content.innerHTML = di.data

// Execute a document command, see reference:
// https://developer.mozilla.org/en/docs/Web/API/Document/execCommand
// this is just `document.execCommand(command, false, value)`
//   exec(command<string>, value<string>)
