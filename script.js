'use strict';

// Initialize variables
let scoreDisplay;
let flashMessageP1;
let score = 0;

// FUNCTIONS

// Updates the buildings list with the current array
function updateBuildings(playerNumber) {
  // Initialize an empty object to store the requested list of buildings
  // let list = document.querySelector('#currentBuildings--p1');
  let list = document.querySelector(`#currentBuildings--p${playerNumber}`);

  // Empty all the HTMl inside this list (which is an <ul>)
  list.innerHTML = '';

  // Loop over [buildings] to create a list of all current buildings of the player
  for (let i = 0; i < allBuildings.length; i++) {
    if (allBuildings[i]['player'] == playerNumber) {
      // Create new <li>
      const newItem = document.createElement('li');

      // Create content for the <li>
      const itemContent = document.createTextNode(
        `${allBuildings[i]['score']} - ${allBuildings[i]['color']}`
      );

      // Add the content to the item
      newItem.appendChild(itemContent);

      list.append(newItem);
    }
  }
}

// Calculate the total score of the player and update the front-end
function calculateTotal(playerNumber) {
  let total = 0;

  for (let i = 0; i < allBuildings.length; i++) {
    if (allBuildings[i]['player'] == playerNumber) {
      total += allBuildings[i]['score'];
    }
  }

  scoreDisplay.textContent = total;
}

// Get the currently checked radio button from <input>
function getCheckedRadioButton() {
  const elements = document.getElementsByName('building-color');

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) return elements[i].value;
  }
}

// Get the currently submitted building value from <input>
const getBuildingValue = () =>
  Number(document.querySelector('#building-value').value);

// Get the currently submitted player number from <input>
function getCheckedPlayerNumber() {
  const elements = document.getElementsByName('player-number');

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) return elements[i].value;
  }
}

// MAIN PROJECT
//TODO: Delete test data, just initialize as an empty array
let allBuildings = [
  {
    score: 7,
    color: 'red',
    player: 1,
    uniqueID: 100,
  },

  {
    score: 7,
    color: 'neutral',
    player: 1,
    uniqueID: 101,
  },
  {
    score: 100,
    color: 'red',
    player: 2,
    uniqueID: 102,
  },
];

// Initialize score & buildings

for (let i = 1; i <= 6; i++) {
  let htmlContent = `
  
  <div class="playercard">
  <h2 class="player" id="player--${i}">Player ${i}</h2>
  
  <div class="flash-message hidden" id="flash-p${i}"></div>
  <p>
  Current score: <span class="score" id="currentScore--player${i}"></span>
  </p>
  
  <h3>Current buildings</h3>
  
  <ul id="currentBuildings--p${i}">
  
  </ul>
  </div>
  
  `;

  document
    .querySelector('#scoreboard')
    .insertAdjacentHTML('beforeend', htmlContent);

  scoreDisplay = document.querySelector(`#currentScore--player${i}`);
  flashMessageP1 = document.querySelector(`#flash-p${i}`);

  updateBuildings(i);
  calculateTotal(i);
}

//TODO: Use a for loop to update buildings for all players

// TODO: Initiate the game with 6 players, creating all elements through JavaScript with a for loop

// Add a building and display a flash message

// Initialize the unique ID number, incrementing everytime a building is created
let uniqueID = 1;

document.querySelector('#add-building').addEventListener('click', function () {
  // Get input fields
  const buildingColor = getCheckedRadioButton();
  const buildingValue = getBuildingValue();
  const playerNumber = getCheckedPlayerNumber();

  // Construct object to add
  const newBuilding = {
    color: buildingColor,
    score: buildingValue,
    uniqueID: uniqueID,
    player: playerNumber,
  };

  // Increment uniqueID to keep it unique
  uniqueID += 1;

  // Push object to array
  allBuildings.push(newBuilding);

  // Update buildings list & total points
  updateBuildings(playerNumber);
  calculateTotal(playerNumber);

  // Flash a message on the screen
  flashMessageP1.textContent = `Added a ${buildingColor} building of score ${buildingValue}`;

  flashMessageP1.classList.remove('hidden');

  // Hide messages after 5 seconds
  setTimeout(() => {
    flashMessageP1.classList.add('hidden');
  }, '5000');
});

// TODO: Delete a building
// Select all delete buttons
const deleteBtns = document.querySelectorAll('.delete-btn');
// Loop over all buildings and add an event listener to the delete button
for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener('click', function () {
    console.log('btn clicked');
  });
}
