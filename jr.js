// IMPORTS
import { h, html, render, Component } from 'https://cdn.skypack.dev/spux'
import 'https://unpkg.com/dior'

// CSS
document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.21.0/themes/prism.min.css" />`
)

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/spux-components@0.0.6/css/spux.css" />`
)

// defaults
globalThis.defaults = {
  '@id': ''
}

// init
var id = 'data'
globalThis.qs = Object.fromEntries(
  new URLSearchParams(document.location.search)
)
globalThis.spux = {
  ...defaults,
  ...di[id],
  ...qs
}
spux.links = spux.links || []
spux.text = spux.text || ''
if (spux.links.length === 0 && spux.results && spux.results.length) {
  spux.links = spux.results.map(i => {
    return {
      href: i.url,
      text: i.title,
      link: 'https://json.rocks?uri=' + i.url
    }
  })
}
spux.title = spux.title || spux.query

// RENDER
function renderAll () {
  render(
    html`
      <div class="row">
        <h2>
          ${spux.logo
            ? html`
                <img width="32" height="32" src=${spux.logo} />
              `
            : ''}
          ${spux.title}
          <a target="_blank" href="${spux.canonicalLink || spux.uri || '#'}"
            >➥</a
          >
        </h2>
      </div>
      <div class="row">
        <div style="min-width: 500px" class="col 6">
          <div>${spux.description}</div>
          ${spux.image
            ? html`
                <img style="max-width: 500px" src=${spux.image} />
              `
            : ''}
          ${spux.links
            .filter(i => i.text)
            .filter(i => i.href)
            .map(i => {
              var itext = html([i.text.replace(/(<img[^>]*?) *\/?>/g, '$1 />')])
              return html`
                <a target="_blank" href="${new URL(i.href, spux.url).href}"
                  >➥</a
                >
                |
                <a
                  href="${location.origin}/?uri=${new URL(i.href, spux.url)
                    .href}"
                  >${itext}</a
                >
                <br />
              `
            })}
          <hr />
          <p>${html([spux.text.replace('\n', '<br />')])}</p>
          <hr />
          <p>
            ${spux.publisher} ${spux.copyright} ${spux.lang} ${spux.date}
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

// MAIN
const DELAY = 0
setTimeout(renderAll, DELAY)
