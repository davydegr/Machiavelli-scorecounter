# Machiavelli-scorecounter

A tool to count scores in the Machiavelli game.

## How it works

## Roadmap functionalities

- DONE: Make a default version for 1 player
- DONE: Add a card with a score & a specific color
- DONE: Calculate the total score per player~
- Delete buildings
- Make it able to change player names from 'Player 1' to something chosen
- Automate the start of the game to ask for player names
- DONE: Update functions so they can be used independently from the total amount of players
- DONE: Calculate extra points if player has all colors
- Calculate extra points if player has 8 buildings for the first time
- Calculate extra points if player has 8 buildings after someone else has got 8 buildings
- Disable buttons after one person reaches 7 buildings and the whole round is played

## Specific to do's

- Determine how you can get the unique DOM identifier for the element you just created, add it to the {allBuildings} as a new property. Use it to later identify the item that a user wants to delete.
- DONE: Add a hidden 'id' number to every building <li> item, making it easy to identify which one to delete
- Make the flash message be of position absolute and animate it

## Learnings

- You can create a html element by using backticks. Than add that element inside or outside an already existing element by using .insertAdjacentHTML('beforeend', htmlContent);`
- You can combine string interpolation and for loops in document.querySelectors
