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

const block = document.getElementById('block1')
const character = document.getElementById('character')
const blocks = document.getElementsByClassName('blocks')
let checkDead

//The Window.getComputedStyle() method returns an object containing the values of all CSS properties of an element, after applying active stylesheets and resolving any basic computation those values may contain.
// characterStyle = window.getComputedStyle(character)

// console.log(characterStyle)
// console.log(characterStyle.getPropertyValue('background-color'))


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

character.style.position = 'relative'
character.style.top = '179px'
character.style.left = '0px'

console.log(block.style.animation)

for(let block of blocks){
  console.log(block)
  block.style.animation = `block ${getRandomArbitrary(1, 5)}s infinite linear`
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
        if(parseInt(character.style.left) > 0){
          let moveLeft = parseInt(character.style.left) - 50 
          character.style.left = `${moveLeft}px`  
        }
        break;
      case 38:
        if(parseInt(character.style.top) > -1){
          let moveUp = parseInt(character.style.top) - 20 
          character.style.top = `${moveUp}px`
        }
        break;
      case 39:
        if(parseInt(character.style.left) < 450){
          let moveRight = parseInt(character.style.left) + 50 
          character.style.left = `${moveRight}px`
        }
          break;
      case 40:
        if(parseInt(character.style.top) < 179){
          let moveDown = parseInt(character.style.top) + 20
          character.style.top = `${moveDown}px`
        }
          break;
  }
});




// how to check collision detection between rectangles? https://www.youtube.com/watch?v=r0sy-Cr6WHY

// getBoundingClientRect() returns an object providing the size of an element and its position relative to the viewport : https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

checkDead = setInterval(() =>{
  for(let block of blocks){
    let blockrect = block.getBoundingClientRect()
    let characterRect = character.getBoundingClientRect()
  
    if(characterRect.x < blockrect.x +characterRect.width &&
      characterRect.x + characterRect.width > blockrect.x &&
      characterRect.y < blockrect.y + blockrect.height &&
      characterRect.y + characterRect.height > blockrect.y
      ){
        clearInterval(checkDead)
        console.log('hit detected')
      }
  }
})