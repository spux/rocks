import { h, html, render, Component } from 'https://cdn.skypack.dev/spux'
import 'https://unpkg.com/dior'
document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css" />`
)

var id = 'data'

function renderAll () {
  render(
    html`
      <h2>${di.data.title}</h2>
      <p>${di.data.description}</p>
      <hr />
      <pre><code class="language-json">${JSON.stringify(
        di.data,
        null,
        2
      )}</code></pre>
      <hr />
      <h3>Links</h3>
      ${di[id].links.map(i => {
        return html`
          <a href="${i.link}">➥</a> | <a href="${i.href}">${i.text}</a> <br />
        `
      })}
    `,
    document.body
  )
  Prism.highlightAll()
}

const DELAY = 1
setTimeout(renderAll, DELAY)
