import 'https://jspm.dev/dior'

import Grid from 'https://jspm.dev/gridjs'

document.head.insertAdjacentHTML(
  'beforeend',
  `<link rel="stylesheet" href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css" />`
)

document.body.insertAdjacentHTML('beforeend', `<div class="wrapper"></div>`)

var columns = Object.keys([].concat(di.data)[0])
var values = [].concat(di.data).map(Object.values)

const grid = new Grid.Grid({
  columns: columns,
  data: values,
  pagination: true,
  sort: true,
  search: true
}).render(document.getElementById('wrapper'))

console.table(di.data)
