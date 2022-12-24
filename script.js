'use strict';

// Initlalize variables & update DOM

let score = 0;
let scoreDisplay = document.querySelector('#currentScore--player1');

//TODO: Delete test data, just initialize as an empty array
let allBuildings = [
  {
    score: 7,
    color: 'red',
    player: 1,
    buildingID: 100,
  },

  {
    score: 7,
    color: 'neutral',
    player: 1,
    buildingID: 101,
  },
  {
    score: 100,
    color: 'red',
    player: 2,
    buildingID: 102,
  },
];

let flashMessageP1 = document.querySelector('#flash-p1');

// FUNCTIONS

// Update the buildings list with the current array
function updateBuildings(playerNumber) {
  // Initialize an empty object to store the requested list of buildings
  let list = {};

  // Use a switch statement to determine list of which player to initiate
  switch (playerNumber) {
    case 1:
      list = document.querySelector('#currentBuildings--p1');
      break;
    case 2:
      list = document.querySelector('#currentBuildings--p2');
      break;
    case 3:
      list = document.querySelector('#currentBuildings--p2');
      break;
    case 4:
      list = document.querySelector('#currentBuildings--p4');
      break;
    case 5:
      list = document.querySelector('#currentBuildings--p5');
      break;
    case 6:
      list = document.querySelector('#currentBuildings--p6');
      break;
  }

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

// Calculate the total score and update the front-end

function calculateTotal(playerNumber) {
  let total = 0;

  for (let i = 0; i < allBuildings.length; i++) {
    if (allBuildings[i]['player'] == playerNumber) {
      total += allBuildings[i]['score'];
    }
  }

  scoreDisplay.textContent = total;
}

// Get the currently checked radio button
function getCheckedRadioButton() {
  const elements = document.getElementsByName('building-color');

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) return elements[i].value;
  }
}

// Get the currently submitted building value from <input>
const getBuildingValue = () =>
  Number(document.querySelector('#building-value').value);

function getCheckedPlayerNumber() {
  const elements = document.getElementsByName('player-number');

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) return elements[i].value;
  }
}

// MAIN PROJECT

// Initialize score & buildings

//TODO: Use a for loop to update buildings for all players
updateBuildings(1);
calculateTotal(1);

// Add a building and display a flash message
//TODO: Add a unique ID

// Initialize the unique ID number, incrementing everytime a building is created
let uniqueID = 1;

document.querySelector('#add-building').addEventListener('click', function () {
  // Get input fields
  const buildingColor = getCheckedRadioButton();
  const buildingValue = getBuildingValue();

  // Construct object to add
  const newBuilding = {
    color: buildingColor,
    score: buildingValue,
    uniqueID: uniqueID,
  };

  // Increment uniqueID to keep it unique
  uniqueID += 1;

  // Push object to array
  allBuildings.push(newBuilding);

  // Update buildings list & total points
  updateBuildings();
  calculateTotal();

  // Flash a message on the screen
  flashMessageP1.textContent = `Added a ${buildingColor} building of score ${buildingValue}`;

  flashMessageP1.classList.remove('hidden');

  // Hide messages after 5 seconds
  setTimeout(() => {
    flashMessageP1.classList.add('hidden');
  }, '5000');
});

// Delete a building
// Select all delete buttons
const deleteBtns = document.querySelectorAll('.delete-btn');
// Loop over all buildings and add an event listener to the delete button
for (let i = 0; i < deleteBtns.length; i++) {
  deleteBtns[i].addEventListener('click', function () {
    console.log('btn clicked');
  });
}
