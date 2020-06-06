import 'https://unpkg.com/dataisland?module'

var id = 'data'
var arr = di[id]

function displayImage (uri) {
  var i = window.document.createElement('img')
  i.src = uri
  i.onclick = displayRandomImage
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
