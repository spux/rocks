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
        <h2>
          ${di.data.title}
          <a target="_blank" href="${di.data.canonicalLink || '#'}">➥</a>
        </h2>
      </div>
      <div class="row">
        <div style="min-width: 500px" class="col 6">
          <div>${di.data.description}</div>
          ${di.data.image
            ? html`
                <img style="max-width: 500px" src=${di.data.image} />
              `
            : ''}
          ${di[id].links.map(i => {
            var itext = html([i.text.replace(/(<img[^>]*?) *\/?>/g, '$1 />')])
            return html`
              <a href="${i.link}">➥</a> |
              <a href="${i.href}">${itext}</a>
              <br />
            `
          })}
          <hr />
          <p>${di.data.text.replace('\n', '')}</p>
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
