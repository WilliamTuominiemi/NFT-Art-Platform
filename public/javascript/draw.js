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

let eraserOn = false

// Toggle eraser
const eraser = () => {
    if (eraserOn) {
        eraserOn = false
    } else {
        eraserOn = true
    }
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

    // Set text and border to the current pen color, which is defined by three sliders, one for each color
    document.getElementById('dashboard').style.borderColor = `rgb(
        ${Math.floor(document.getElementById('red_slider').value)},
        ${Math.floor(document.getElementById('green_slider').value)},
        ${Math.floor(document.getElementById('blue_slider').value)}
    )`
    document.getElementById('colorText').style.color = `rgb(
        ${Math.floor(document.getElementById('red_slider').value)},
        ${Math.floor(document.getElementById('green_slider').value)},
        ${Math.floor(document.getElementById('blue_slider').value)}
    )`

    // Set pen thickness as user defined thickness
    ctx.lineWidth = document.getElementById('thickness_slider').value

    ctx.lineCap = 'round'

    // Set pen color as the user selected rgb
    // Check if eraser is toggled
    if (eraserOn) {
        ctx.strokeStyle = 'rgb(255,255,255)' // When eraser is toggled, pen color is white
    } else {
        ctx.strokeStyle = `rgb(
            ${Math.floor(document.getElementById('red_slider').value)},
            ${Math.floor(document.getElementById('green_slider').value)},
            ${Math.floor(document.getElementById('blue_slider').value)}
        )`
    }

    ctx.moveTo(pos.x, pos.y) // from
    setPosition(e)
    ctx.lineTo(pos.x, pos.y) // to

    ctx.stroke() // draw it!
}

// Convert canvas to Base64 JPEG
function toImage() {
    var img = canvas.toDataURL('image/jpeg', 0.1)
    var element = document.getElementById('src')

    element.setAttribute('value', img)
    document.getElementById('submit_button').style.visibility = 'visible'
}

// Refresh page to clear the whole drawing board
function _clear() {
    console.log('clear')
    location.reload()
}
