let color = '#000000'

// create canvas element and append it to document body
var canvas = document.createElement('canvas')
document.body.appendChild(canvas)

document.body.style.margin = 0
canvas.style.position = 'fixed'

// get canvas 2D context and set him correct size
var ctx = canvas.getContext('2d')
resize()

// last known position
var pos = { x: 100, y: 100 }

window.addEventListener('resize', resize)
document.addEventListener('mousemove', draw)
document.addEventListener('mousedown', setPosition)
document.addEventListener('mouseenter', setPosition)

// Set pen color as custom user inputted hex
function customColor() {
    console.log(document.getElementById('hex_color').value)
    color = document.getElementById('hex_color').value
}

// Set color as one of predefined hexes
function changeColor(_color) {
    console.log(_color)
    if (_color === 0) {
        console.log('black')
        color = '#000000'
    } else if (_color === 1) {
        console.log('red')
        color = '#d94c4c'
    } else if (_color === 2) {
        console.log('blue')
        color = '#378bde'
    } else if (_color === 'eraser') {
        console.log('eraser')
        color = '#ffffff '
    }
}

// Set pen color as defined color
function getColor() {
    return color
}

// new position from mouse event
function setPosition(e) {
    pos.x = e.clientX
    pos.y = e.clientY
}

// resize canvas
function resize() {
    ctx.canvas.width = 500
    ctx.canvas.height = 500
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return
    ctx.beginPath() // begin

    // Set pen thickness as user defined thickness
    ctx.lineWidth = document.getElementById('thickness_slider').value

    ctx.lineCap = 'round'

    // Set pen color as user defined color
    ctx.strokeStyle = getColor()

    ctx.moveTo(pos.x, pos.y) // from
    setPosition(e)
    ctx.lineTo(pos.x, pos.y) // to

    ctx.stroke() // draw it!
}

// Convert canvas to Base64 JPEG
function toImage() {
    var img = canvas.toDataURL('image/jpeg', 0.1)

    var element = document.getElementById('src')

    console.log(element)

    element.setAttribute('value', img)

    document.getElementById('submit_button').style.visibility = 'visible'
}

// Refresh page to clear the whole drawing board
function _clear() {
    console.log('clear')
    location.reload()
}
