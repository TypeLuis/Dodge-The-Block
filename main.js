const coin = document.getElementById('coin')
const reset = document.getElementById('reset')
const character = document.getElementById('character')
character.style.position = 'relative'
const blocks = document.getElementsByClassName('blocks')
const body = document.getElementById('body')
body.style.backgroundColor = 'aqua'
const tablet = document.getElementById('tablet')
tablet.style.backgroundColor = 'royalblue'
const lController = document.getElementById('controllerLeft')
const rController = document.getElementById('controllerRight')
rController.style.backgroundColor = 'blueviolet'
let hitBlock = false
const tableButtons = document.getElementsByClassName('tableButton')
const prices = document.getElementsByClassName('tablePrice')

const rButtons = document.getElementsByClassName('rightButton')
const lButtons = document.getElementsByClassName('leftButtons')


const modal = document.getElementById("myModal");
const modalClose = document.getElementsByClassName("close")[0];


window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
}, false);


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}



const checkColor = () => {
  const tabletStorage = localStorage.getItem('tablet')
  const lControllerStorage = localStorage.getItem('lController')
  const rControllerStorage = localStorage.getItem('rController')
  const bgStorage = localStorage.getItem('bg')
  const characterStorage = localStorage.getItem('character')

  if (tabletStorage){
    tablet.style.backgroundColor = tabletStorage
  }
  if (lControllerStorage && rControllerStorage){
    lController.style.backgroundColor = lControllerStorage
    rController.style.backgroundColor = rControllerStorage
  }
  if (bgStorage){
    body.style.backgroundColor = bgStorage
  }
  if (characterStorage){
    character.style.backgroundColor = characterStorage
  }
}

checkColor()


// The starting parameters of the game. places the characters and blocks in starting position
function startingParams(){
  for(let block of blocks){
    block.style.backgroundColor = 'brown'
    block.style.animation = ""
  }
  character.style.top = '179px'
  character.style.left = '0px'
  hitBlock = true
}
startingParams()


// Starts the animation and changes blocks background color through intervals
function startGame(ranNum1, ranNum2){
  for(let block of blocks){
    setTimeout(() => {block.style.animation = `block ${getRandomArbitrary(ranNum1, ranNum2)}s infinite linear`}, 50); 

  }
}
startGame(5, 10)



hitBlock = false


// changes blocks background color through intervals
// puts the intervals in an array to avoid glitches with the interval when reseting the game
function switchColor(ranNum1, ranNum2){

  
  for(let block of blocks){
    colorSwitch = setInterval(() => { 

      if(hitBlock === false){
        block.style.backgroundColor = 'green'
        setTimeout(() => {block.style.backgroundColor = 'brown'}, 5000)
      }

    }, getRandomInt(ranNum1, ranNum2));

  }
}
// switchColor(10000, 50000)
switchColor(ranNum2= 50000, ranNum1 = 10000)



function checkCollision(){
  // how to check collision detection between rectangles? https://www.youtube.com/watch?v=r0sy-Cr6WHY
  // getBoundingClientRect() returns an object providing the size of an element and its position relative to the viewport : https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
  checkHit = setInterval(() =>{
    for(let block of blocks){
      let blockrect = block.getBoundingClientRect()
      let characterRect = character.getBoundingClientRect()

      const checking = (color) => {
        return characterRect.x < blockrect.x +characterRect.width &&
        characterRect.x + characterRect.width > blockrect.x &&
        characterRect.y < blockrect.y + blockrect.height &&
        characterRect.y + characterRect.height > blockrect.y &&
        block.style.backgroundColor === color
      }
    
      if(checking('brown')){
          startingParams()
          hitBlock = true
          clearInterval(checkHit)
          modal.style.display = 'block'
          modalClose.addEventListener('click', () => {
            modal.style.display = 'none'
          })

          window.addEventListener('click', (e) => {
            if (e.target == modal) {
              modal.style.display = "none";
            }
          })
          console.log('hit detected')
        }
      else if(checking('green')){  
          coin.innerText = parseInt(coin.innerText) + 1
          block.style.backgroundColor = 'chocolate'
          setTimeout(() => {
            block.style.backgroundColor = 'brown'
          }, 750);
        }
    }
  }, 10)
}
checkCollision()


function animationChange(ranNum1, ranNum2){
  // interval that checks if the block css style "left" is less than 0 pixels
  // once it checks, the block's animation is null and give it 50 ms to start back up
  // The reason for this is to have different speeds through each itteration
  // The Window.getComputedStyle() method returns an object containing the values of all CSS properties of an element, after applying active stylesheets and resolving any basic computation those values may contain.
  change = setInterval(async () => {
    if(hitBlock === false){
      for(let block of blocks){
        blockStyle = window.getComputedStyle(block)
        if(parseInt(blockStyle.getPropertyValue('left')) < 0){
          block.style.animation = ""
          setTimeout(async () => {
            block.style.animation = `block ${getRandomInt(ranNum1, ranNum2)}s infinite linear`
          }, 50);
        }
      }
    }
  }, 50);
}
animationChange(5, 10)


for (let button of tableButtons){
  button.addEventListener('click', ()=>{
    let color
    // get's the first word of Id
    const buttonName = button.id.split(' ')[0]
    // first word of Price Id === First word of button Id
    const price = document.getElementById(`${buttonName} Price`)
    console.log(price.innerText)

    if(parseInt(coin.innerText) >= parseInt(price.innerText)){

      coin.innerText = parseInt(coin.innerText) - parseInt(price.innerText)
      // Example of switch. if switch(param) === 'tablet', run code
      switch(buttonName){
        case 'tablet':
          tablet.style.backgroundColor = null
          while(true){
            if(tablet.style.backgroundColor === ""){
              color = prompt(`What color would you like your ${buttonName} to be?`)
              tablet.style.backgroundColor = color
              localStorage.setItem('tablet', color)
            }
            else{ break}
          }
          break
          case 'controller':
            rController.style.backgroundColor = null
            while(true){
              if(rController.style.backgroundColor === ""){
                color = prompt(`What color would you like your ${buttonName} to be?`)
                rController.style.backgroundColor = color
                lController.style.backgroundColor = color
                localStorage.setItem('lController', color)
                localStorage.setItem('rController', color)
              }
              else{break}
            }
            break
            case 'background':
              body.style.backgroundColor = null
              while(true){
                if(body.style.backgroundColor === ""){
                  color = prompt(`What color would you like your ${buttonName} to be?`)
                  body.style.backgroundColor = color
                  console.log(color)
                  localStorage.setItem('bg', color)
                }
                else{break}
              }
              break
              case 'character':
                character.style.backgroundColor = null
                while(true){
                  if(character.style.backgroundColor === ""){
                    color = prompt(`What color would you like your ${buttonName} to be?`)
                    character.style.backgroundColor = color
                    localStorage.setItem('character', color)
            }
            else{break}
          }
        break
      }
    }
  })
}


function startOver(ranNum1, ranNum2, ranNum3, ranNum4){


  // https://stackoverflow.com/questions/8635502/how-do-i-clear-all-intervals

  // Get a reference to the last interval + 1
  const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

  // Clear any timeout/interval up to that id
  for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
  }
  startingParams()
  startGame(ranNum1, ranNum2)
  hitBlock = false
  switchColor(ranNum3, ranNum4)
  checkCollision()
  animationChange(ranNum1, ranNum2)
}

for(let button of rButtons){
  button.addEventListener('click', ()=>{
    const bttnName = button.id
    switch(bttnName){
      case 'easy':
        startOver(8, 13, 15000, 60000)
        break
      case 'normal':
        startOver(5, 10, 10000, 50000)
        break
      case 'hard':
        startOver(2, 6, 7000, 40000)
        break
      case 'reset':
        startOver(5, 10, 10000, 50000)
        break
    }
  })
}

for(let button of lButtons){
  button.addEventListener('click', () => {
    switch(button.id){
      case 'button1':
        if(parseInt(character.style.top) > -1){
          let moveUp = parseInt(character.style.top) - 20 
          character.style.top = `${moveUp}px`
        }
        break

      case 'button2':
        if(parseInt(character.style.left) > 0){
          let moveLeft = parseInt(character.style.left) - 20 
          character.style.left = `${moveLeft}px`  
        }
        break

      case 'button3':
        if(parseInt(character.style.top) < 179){
          let moveDown = parseInt(character.style.top) + 20
          character.style.top = `${moveDown}px`
        }
        break

      case 'button4':
        if(parseInt(character.style.left) < 440){
          let moveRight = parseInt(character.style.left) + 20 
          character.style.left = `${moveRight}px`
        }
        break
    }
  })
}


// Sources to help improve knowledge of switch
// https://www.youtube.com/watch?v=xDY1TTM9sGs
// https://www.w3schools.com/jsref/jsref_switch.asp

document.addEventListener('keydown', function(e) {
  // inside of switch, we place a parameter, this case is the document
  // (e)"e can be anything" declares the document that we selected
  // keyCode are different codes that defines the characters on a keyboard
  switch(e.keyCode){
    case 27:
      startingParams()
      hitBlock = true
      break;
    case 49:
      startOver(5, 10, 10000, 50000)
      break;
    case 50:
      startOver(8, 13, 15000, 60000)
      break
    case 51:
      startOver(2, 6, 7000, 40000)
      break
  }
  if(hitBlock === false){
    switch (e.keyCode) {
      // case are different cases that can happen in a switch like a conditional. this one is saying if keycode 38('up arrow') is pressed, run this following command
        case 37:
          if(parseInt(character.style.left) > 0){
            let moveLeft = parseInt(character.style.left) - 20 
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
          if(parseInt(character.style.left) < 440){
            let moveRight = parseInt(character.style.left) + 20 
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
  }
});  






