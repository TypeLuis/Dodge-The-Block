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


character.style.position = 'relative'
character.style.top = '179px'
console.log(parseInt(character.style.top))







function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


// Sources to help improve knowledege of switch
// https://www.youtube.com/watch?v=xDY1TTM9sGs
// https://www.w3schools.com/jsref/jsref_switch.asp

document.addEventListener('keydown', function(e) {
  // inside of switch, we place a parameter, this case is the document
  // (e)"e can be anything" declares the document that we selected
  // keyCode are different codes that defines the characters on a keyboard
  switch (e.keyCode) {
    // case are different cases that can happen in a switch like a conditional. this one is saying if keycode 38('up arrow') is pressed, run this following command
      case 37:
          console.log('left');
          break;
      case 38:
        if(parseInt(character.style.top) > -1){
          console.log('up');
          let moveUp = parseInt(character.style.top) - 20 
          character.style.top = `${moveUp}px`
          console.log(character.style.top)
        }
        break;
      case 39:
        console.log('right');
          break;
      case 40:
        if(parseInt(character.style.top) < 179){
          let moveDown = parseInt(character.style.top) + 20
          character.style.top = `${moveDown}px`
          console.log('down');
        }
          break;
  }
});