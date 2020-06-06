import 'https://unpkg.com/dataisland?module'

var arr
var id = 'data'

if (di[id].links) {
  arr = di[id].links.filter(i => i).map(i => i.href)
} else {
  arr = di[id]
}

function displayImage (uri) {
  var i = window.document.createElement('img')
  i.src = uri
  i.onclick = () => displayRandomImage(arr)
  i.height = Math.floor(window.innerHeight * 0.96)
  window.document.body.innerHTML = ''
  window.document.body.appendChild(i)
}

function displayRandomImage (images) {
  let random = Math.floor(Math.random() * images.length)
  let randomImage = images[random]
  displayImage(randomImage)
}

displayRandomImage(arr)
