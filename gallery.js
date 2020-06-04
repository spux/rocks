import 'https://unpkg.com/dataisland?module'

var id = 'data'

function displayImage (uri) {
  var i = window.document.createElement('img')
  i.src = uri
  i.onclick = displayRandomImage
  i.width = Math.floor(screen.width * 0.8)
  window.document.body.innerHTML = ''
  window.document.body.appendChild(i)
}

function displayRandomImage () {
  let random = Math.floor(Math.random() * (di[id].length - 1)) + 1
  let randomImage = di[id][random]
  displayImage(randomImage)
}

displayRandomImage()
