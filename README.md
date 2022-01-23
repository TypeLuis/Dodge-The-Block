# Luis-first-project





What I learned:

Sources: https://www.youtube.com/watch?v=xDY1TTM9sGs , https://www.w3schools.com/jsref/jsref_switch.asp 

[JS Code found in 164, 224, 250, 266]

 - One thing I learned was the switch statement. This is almost like a an if else statement only written in cleaner code and more efficient.



Sources: https://keycode.info , https://www.codegrepper.com/code-examples/javascript/addeventlistener+arrow+keys 

[JS code found in line 246]

- EventListener has a 'keydown' parameter that if grabbed by the document (not an element) and the parameter has the event, theres a key in the object called 'keycode'. grabbing this will get the code of the key you press. you can use switch(event.keycode){} to determine to switch code after someone presses a key. Inside the curly brackets, you use case 23(keycodes are in different nums): then run the code below it


[JS code found in line 135]

- parseInt() not only changes a number's data type from a string to an integer, it also removes anything that's not an integer.




Sources: https://www.youtube.com/watch?v=r0sy-Cr6WHY , https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect , https://stackoverflow.com/questions/37472799/how-can-i-detect-if-two-elements-are-touching

[JS Code found in line 95]

- element.getBoundingClientRect() returns the x, y, width, height of an element. Using help found from a youtube video on colision detection, I set an interval to constantly get axis point of element and checks for collision detection on the the elements.






Sources: https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp, https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle

[JS Code found in line 136]

- window.getComputedStyle('element') returns a computated StyleSheet of that element. You can then use 
element.getPropertyValue('CSS property') to get the value of the computated StyleSheet. The reason I needed this was because I have an animation of blocks, and wanted to change animation speed. To determine when the animation speed was finished, in an interval I got the computed style of the block and got the value of the 'left' property.




Sources: Caroline, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

[JS Code found in line 49, 70, etc]

- using Async function and Await in the code makes the console wait until that code is finished.



- if by ANY reason the interval doesn't want to clear, you can push it into an array


[CSS Code found in line 177]

- z-index in CSS moves the selected element to 1 or -1 which brings the element to the from or back position. I believe this can only be used if you set the position on element.

















_______________________________________________________________________________________________________________

OTHER SOURCES THAT HELPED:
- Helped get a random integer from a function provided here , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

- This Youtube video helped me setup the beginning of my project , https://www.youtube.com/watch?v=bG2BmmYr9NQ 

- Background image of game provided here , https://www.vecteezy.com/vector-art/2184697-abstract-blue-circuit-technology-background

- Different colors one can change in game , https://www.w3schools.com/cssref/css_colors.asp

- Know how spread syntax works , https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 


_______________________________________________________________________________________________________________


I will be building a platformer that will have multiple objects thrown at you through diffent stages.
the project will have a difficulty settings. The scores is how much coins you're collecting. prizes will be determined by how many coins you've collected. the page will be displayed in a format like a portable device.

game rule:
Dodge as many obsticles in your way, collect coins and reach to the next level. complete all 3 levels to win the game. You lose if obsticle hits you


as a user when you press down a key, you will jump, another to duck

mvp:
- function to determine how to win a game
- function to jump
- function to duck
- determine detection between player and object
- keep track of coin
- have a dictionary of prizes the user recives

IceBox:
Depending on how many coins the player will recieve  they'll win a certain type of prize


prize tier one: allow player to change theme of the console