const coin = document.getElementById('coin')
const reset = document.getElementById('reset')
const buttonTest = document.getElementById('button1')
const block = document.getElementById('block1')
const character = document.getElementById('character')
const blocks = document.getElementsByClassName('blocks')
const body = document.getElementById('body')
body.style.backgroundColor = 'burlywood'
const tablet = document.getElementById('tablet')
tablet.style.backgroundColor = 'royalblue'
const lController = document.getElementById('controllerLeft')
const rController = document.getElementById('controllerRight')
rController.style.backgroundColor = 'blueviolet'
let hitBlock = false
let checkDead
character.style.position = 'relative'
character.style.top = '179px'
character.style.left = '0px'
const tabPrice = document.getElementById('tablet Price')
const tabButton = document.getElementById('tablet Button')
const conPrice = document.getElementById('controller Price')
const conButton = document.getElementById('controller Button')
const backPrice = document.getElementById('')
const backButton = document.getElementById('')
const charPrice = document.getElementById('')
const charButton = document.getElementById('')
const tableButtons = document.getElementsByClassName('tableButton')
const prices = document.getElementsByClassName('tablePrice')





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


// The starting parameters of the game. places the characters and blocks in starting position
function startingParams(){
  for(let block of blocks){
    clearInterval(colorSwitch)
    block.style.backgroundColor = 'brown'
    block.style.animation = ""
  }
  character.style.top = '179px'
  character.style.left = '0px'
}

// Starts the animation and changes blocks background color through intervals
function startGame(){
  for(let block of blocks){
    block.style.backgroundColor = 'brown'
    block.style.animation = `block ${getRandomArbitrary(5, 10)}s infinite linear`
    colorSwitch = setInterval(() => {
        if(hitBlock === false){
          block.style.backgroundColor = 'green'
        }
        else if(hitBlock === true){
        clearInterval(colorSwitch)
        }
        setTimeout(() => {
          if(hitBlock === false){
            block.style.backgroundColor = 'brown'
          }
        }, 5000)
    }, getRandomInt(3000, 18000));
  }
}
startGame()

// how to check collision detection between rectangles? https://www.youtube.com/watch?v=r0sy-Cr6WHY
// getBoundingClientRect() returns an object providing the size of an element and its position relative to the viewport : https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
function checkCollision(){
  checkHit = setInterval(() =>{
    for(let block of blocks){
      let blockrect = block.getBoundingClientRect()
      let characterRect = character.getBoundingClientRect()
    
      if(characterRect.x < blockrect.x +characterRect.width &&
        characterRect.x + characterRect.width > blockrect.x &&
        characterRect.y < blockrect.y + blockrect.height &&
        characterRect.y + characterRect.height > blockrect.y &&
        block.style.backgroundColor === 'brown'
        ){
          startingParams()
          hitBlock = true
          clearInterval(checkHit)
          console.log('hit detected')
        }
      else if(characterRect.x < blockrect.x +characterRect.width &&
        characterRect.x + characterRect.width > blockrect.x &&
        characterRect.y < blockrect.y + blockrect.height &&
        characterRect.y + characterRect.height > blockrect.y &&
        block.style.backgroundColor === 'green'
        ){  
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

// console.log(tabPrice.id.split(' ')[0])
// console.log(tabButton.id.split(' ')[0])

//////////

for (let button of tableButtons){
  button.addEventListener('click', ()=>{
    let color
    // get's the first word of Id
    buttonName = button.id.split(' ')[0]
    // first word of Price Id === First word of button Id
    price = document.getElementById(`${buttonName} Price`)
    console.log(price.innerText)

    // if(parseInt(coin.innerText) >= parseInt(price.innerText)){

      // coin.innerText = parseInt(coin.innerText) - parseInt(price.innerText)
      // Example of switch. if switch(param) === 'tablet', run code
      switch(buttonName){
        case 'tablet':
          tablet.style.backgroundColor = null
          while(true){
            if(tablet.style.backgroundColor === ""){
              color = prompt(`What color would you like your ${buttonName} to be?`)
              tablet.style.backgroundColor = color
            }
            else{break}
          }
        break
          break
        case 'controller':
          rController.style.backgroundColor = null
          lController.style.backgroundColor = null
          while(true){
            if(rController.style.backgroundColor === ""){
              color = prompt(`What color would you like your ${buttonName} to be?`)
              rController.style.backgroundColor = color
            }
            else{break}
          }
          lController.style.backgroundColor = color
          break
        case 'background':
          body.style.backgroundColor = null
          while(true){
            if(body.style.backgroundColor === ""){
              color = prompt(`What color would you like your ${buttonName} to be?`)
              body.style.backgroundColor = color
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
            }
            else{break}
          }
        break
      }
    // }

  })
}




// preparing before doing forLoop
tabButton.addEventListener('click', ()=>{
  // console.log(tabButton)
  if(parseInt(coin.innerText) >= parseInt(tabPrice.innerText)){
    priceName = tabPrice.id.split(' ')[0]
    buttonName = tabButton.id.split(' ')[0]
    coin.innerText = parseInt(coin.innerText) - parseInt(tabPrice.innerText)
    // let color = prompt(`What color would you like your ${buttonName} to be?`)
    // tablet.style.backgroundColor = color
    //  form = document.createElement('form')
    //  form.setAttribute('id', `${priceName}Form`)
    //  label = document.createElement('label')
    //  input1 = document.createElement('input')
    //  input1.setAttribute()
    //  input2 = document.createElement('input')
  }
})
















// interval that checks if the block css style "left" is less than 0 pixels
// once it checks, the block's animation is null and give it 50 ms to start back up
// The reason for this is to have different speeds through each itteration
setInterval(() => {
  for(let block of blocks){
    blockStyle = window.getComputedStyle(block)
    if(parseInt(blockStyle.getPropertyValue('left')) < 0 && hitBlock === false){
      block.style.animation = ""
      setTimeout(() => {
        block.style.animation = `block ${getRandomInt(5, 10)}s infinite linear`
      }, 50);
    }
  }
}, 50);



function startOver(){
  hitBlock = false
  startingParams()
  setTimeout(()=>{startGame()}, 500)
  checkCollision()
}

reset.addEventListener('click', ()=>{
  startOver()
})




// Sources to help improve knowledege of switch
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
    case 32:
      startOver()
      break;
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






