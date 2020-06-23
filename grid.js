import 'https://jspm.dev/dior'

import Grid from 'https://jspm.dev/gridjs'

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
