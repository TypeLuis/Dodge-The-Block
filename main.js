// let canvas = document.querySelector('canvas')

// // window.inner width and height gets the width of current page

// canvas.width = window.innerWidth
// canvas.height = window.innerHeight


// // C in canvas is = to context
// // get context has a ton of functions we can use to draw inside canvas
// let c = canvas.getContext('2d')

// // takes x, y, width, height
// c.fillRect(100, 100, 100, 100)
// c.fillRect(200, 400, 100, 100)
// c.fillRect(400, 400, 200, 200)


const character = document.getElementById('character')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }