const coin = document.getElementById('coin')
const reset = document.getElementById('reset')
const character = document.getElementById('character')
character.style.position = 'relative'
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
let klk = false
let invervalArr = []
const tableButtons = document.getElementsByClassName('tableButton')
const prices = document.getElementsByClassName('tablePrice')
const rButtons = document.getElementsByClassName('rightButton')


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
    block.style.backgroundColor = 'brown'
    block.style.animation = ""
  }
  console.log('klk1')
  character.style.top = '179px'
  character.style.left = '0px'
  hitBlock = true
}
startingParams()


// Starts the animation and changes blocks background color through intervals
async function startGame(ranNum1, ranNum2){
  console.log('klk2')
  for(let block of blocks){
    setTimeout(() => {block.style.animation = `block ${getRandomArbitrary(ranNum1, ranNum2)}s infinite linear`}, 50); 
    if(invervalArr.length === 10){
      for(i =0; i < invervalArr.length; i++){ 
        console.log(invervalArr[i]) 
        await clearInterval(invervalArr[i])
        console.log('colorSwitch Before Pop: ' ,colorSwitch)
        await invervalArr.pop(i)
        console.log('colorSwitch After Pop: ' ,colorSwitch)
      }
      // console.log(invervalArr)
    }
  }
}
startGame(5, 10)



hitBlock = false


// changes blocks background color through intervals
// puts the intervals in an array to avoid glitches with the interval when reseting the game
async function switchColor(ranNum1, ranNum2){
  console.log('klk3')
  for(let block of blocks){
    if(invervalArr.length < 10){
      colorSwitch = await setInterval(() => {  
        // console.log(colorSwitch)  
        console.log(invervalArr)
        if(hitBlock === false){
          block.style.backgroundColor = 'green'
          setTimeout(() => {
            block.style.backgroundColor = 'brown'
          }, 5000)
        }
      }, getRandomInt(ranNum1, ranNum2));
      await invervalArr.push(colorSwitch)
      console.log('PUSHING ARRAY', invervalArr, colorSwitch)
    }

 
  }
}
switchColor(10000, 50000)



function checkCollision(){
  console.log('klk4')
  // how to check collision detection between rectangles? https://www.youtube.com/watch?v=r0sy-Cr6WHY
  // getBoundingClientRect() returns an object providing the size of an element and its position relative to the viewport : https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
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


function animationChange(ranNum1, ranNum2){
  console.log('klk5')
  // interval that checks if the block css style "left" is less than 0 pixels
  // once it checks, the block's animation is null and give it 50 ms to start back up
  // The reason for this is to have different speeds through each itteration
  // The Window.getComputedStyle() method returns an object containing the values of all CSS properties of an element, after applying active stylesheets and resolving any basic computation those values may contain.
  change = setInterval(() => {
    if(hitBlock === false){
      for(let block of blocks){
        blockStyle = window.getComputedStyle(block)
        if(parseInt(blockStyle.getPropertyValue('left')) < 0){
          block.style.animation = ""
          setTimeout(() => {
            block.style.animation = `block ${getRandomInt(ranNum1, ranNum2)}s infinite linear`
          }, 50);
        }
      }
    }
    else{clearInterval(change)}
  }, 50);
}
animationChange(5, 10)


for (let button of tableButtons){
  button.addEventListener('click', ()=>{
    let color
    // get's the first word of Id
    buttonName = button.id.split(' ')[0]
    // first word of Price Id === First word of button Id
    price = document.getElementById(`${buttonName} Price`)
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
            }
            else{break}
          }
        break
        case 'controller':
          rController.style.backgroundColor = null
          while(true){
            if(rController.style.backgroundColor === ""){
              color = prompt(`What color would you like your ${buttonName} to be?`)
              rController.style.backgroundColor = color
              lController.style.backgroundColor = color
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
    }
  })
}


async function startOver(ranNum1, ranNum2, ranNum3, ranNum4){
  await startingParams()
  await startGame(ranNum1, ranNum2)
  hitBlock = false
  await switchColor(ranNum3, ranNum4)
  await checkCollision()
  await animationChange(ranNum1, ranNum2)
}

for(let button of rButtons){
  button.addEventListener('click', ()=>{
    bttnName = button.id
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






