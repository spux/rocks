import 'https://unpkg.com/dataisland?module'
import { exec, init } from 'https://unpkg.com/spux-modules@0.0.4/pell.js'
import updateThis from 'https://unpkg.com/spux-modules@0.0.4/updatethis.js'

var id = 'data'

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
    {
      name: 'save',
      icon: `<svg viewBox="0 0 512 512" fill="currentColor">
              <path d="M465.94 119.76l-73.7-73.7A47.68 47.68 0 00358.3 32H96a64 64 0 00-64 64v320a64 64 0 0064 64h320a64 64 0 0064-64V153.7a47.68 47.68 0 00-14.06-33.94zM120 112h176a8 8 0 018 8v48a8 8 0 01-8 8H120a8 8 0 01-8-8v-48a8 8 0 018-8zm139.75 319.91a80 80 0 1176.16-76.16 80.06 80.06 0 01-76.16 76.16z" />
              <path d="M304 352 A48 48 0 0 1 256 400 A48 48 0 0 1 208 352 A48 48 0 0 1 304 352 z" />
            </svg>`,
      title: 'Save',
      result: () => {
        console.log('Save!')
        updateThis(id)
      }
    },

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
