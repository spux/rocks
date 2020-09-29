import { h, html, render, Component } from 'https://cdn.skypack.dev/spux'
import 'https://unpkg.com/dior'
document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css" />`
)

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/spux-components@0.0.6/css/spux.css" />`
)

var id = 'data'

function renderAll () {
  render(
    html`
      <div class="row">
        <h2>${di.data.title}</h2>
      </div>
      <div class="row">
        <div style="min-width: 500px" class="col 6">
          <p>${di.data.description}</p>
          <h3>Links</h3>
          ${di[id].links.map(i => {
            var itext = html([i.text])
            return html`
              <a href="${i.link}">➥</a> |
              <a href="${i.href}">${itext}</a>
              <br />
            `
          })}
          <hr />
          <p>${di.data.text.replace('\n', '<br/>')}</p>
          <hr />
          <p>
            ${di.data.publisher} ${di.data.copyright} ${di.data.lang}
            ${di.data.date}
          </p>
        </div>
        <div class="col 6">
          <pre><code class="language-json">${JSON.stringify(
            di.data,
            null,
            2
          )}</code></pre>
        </div>
      </div>
    `,
    document.body
  )
  Prism.highlightAll()
}

const DELAY = 1
setTimeout(renderAll, DELAY)
