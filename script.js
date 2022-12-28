'use strict';

// Function "highlightHighscore" has to be initialized separately because otherwise it will try to highlight a highscore at the beginning of the game
// Function "calculateTotal" is embedded into "updateBuildings" so should never be called separately

// Initialize variables
let scoreDisplay;
let flashmessage;
let score = 0;

// Initialize the unique ID number, incrementing everytime a building is created
let uniqueID = 1;

// FUNCTIONS

// Updates the buildings list with the current array
function updateBuildings(playerNumber) {
  // Grab the <ul> element of the requested player
  let list = document.querySelector(`#currentBuildings--p${playerNumber}`);

  // Empty all the HTMl inside this list
  list.innerHTML = '';

  // Loop over [buildings] to create a list of all current buildings of the player
  for (let i = 0; i < allBuildings.length; i++) {
    if (allBuildings[i]['player'] == playerNumber) {
      // Increment the total amount of buildings

      const htmlContent = `
      <li>${allBuildings[i]['score']} - ${allBuildings[i]['color']} <span class="delete-btn">verwijderen</span><span class="building-id hidden">${allBuildings[i]['uniqueID']}</span></li>
      `;

      list.insertAdjacentHTML('beforeend', htmlContent);

      // Create new <li>
      // const newItem = document.createElement('li');

      // // Create content for the <li>
      // const itemContent = document.createTextNode(
      //   `${allBuildings[i]['score']} - ${allBuildings[i]['color']}`
      // );

      // // Add the content to the item
      // newItem.appendChild(itemContent);

      // list.append(newItem);
    }
  }

  if (list.innerHTML == '') {
    const htmlContent = `
    This player curretly has no buildings.`;

    list.insertAdjacentHTML('beforeend', htmlContent);
  }

  calculateTotal(playerNumber);
  addDeleteButtons();
}

// Calculate the total score of the player and update the front-end
function calculateTotal(playerNumber) {
  let total = 0;
  let colors = [];
  let totalAmountBuildings = 0;

  // Loop over all the buildings and add the total to the score
  for (let i = 0; i < allBuildings.length; i++) {
    if (allBuildings[i]['player'] == playerNumber) {
      totalAmountBuildings += 1;

      total += allBuildings[i]['score'];

      // Add the color to the colors array
      colors.push(allBuildings[i]['color']);
    }
  }

  // Check if user has all colors, add 3 points and a list element
  if (
    colors.indexOf('red') != -1 &&
    colors.indexOf('green') != -1 &&
    colors.indexOf('blue') != -1 &&
    colors.indexOf('yellow') != -1 &&
    colors.indexOf('purple') != -1
  ) {
    total += 3;

    let list = document.querySelector(`#currentBuildings--p${playerNumber}`);

    const htmlContent = `
    <li>✅ 3 extra points awarded for having all colors</li>
    `;

    list.insertAdjacentHTML('afterBegin', htmlContent);
  }

  if (totalAmountBuildings >= 8) {
    total += 2;

    let list = document.querySelector(`#currentBuildings--p${playerNumber}`);

    const htmlContent = `
    <li>✅ 2 extra points awarded for having 8 buildings or more</li>
    `;

    list.insertAdjacentHTML('afterBegin', htmlContent);
  }

  scoreDisplay = document.querySelector(`#currentScore--player${playerNumber}`);

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

function highlightHighscore() {
  let allHighscores = document.querySelectorAll('.score');
  let highscore = 0;
  let allPlayerCards = document.querySelectorAll('.playercard');

  // Delete all highlight classes

  for (let i = 0; i < allPlayerCards.length; i++) {
    allPlayerCards[i].classList.remove('highscore');
  }

  // Loop over all the highscores and find the highest score

  for (let i = 0; i < allHighscores.length; i++) {
    let playerScore = Number(allHighscores[i].innerHTML);

    if (playerScore >= highscore) {
      highscore = playerScore;
      console.log(`Highscore updated to ${highscore}`);
    }
  }

  // Loop over all the highscores again and add 'highscore' class to highest score(s)

  for (let i = 0; i < allHighscores.length; i++) {
    let playerScore = Number(allHighscores[i].innerHTML);

    if (playerScore == highscore) {
      document
        .querySelector(`#playercard--p${i + 1}`)
        .classList.add('highscore');
    }
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
    color: 'blue',
    player: 1,
    uniqueID: 101,
  },

  {
    score: 1,
    color: 'green',
    player: 1,
    uniqueID: 102,
  },

  {
    score: 100,
    color: 'yellow',
    player: 1,
    uniqueID: 103,
  },

  {
    score: 100,
    color: 'purple',
    player: 1,
    uniqueID: 104,
  },
];

// Initialize score & buildings

for (let i = 1; i <= 6; i++) {
  let htmlContent = `
  
  <div class="playercard" id="playercard--p${i}">
  <h2 class="player" id="player--${i}">Player ${i}</h2>
  
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

  updateBuildings(i);
  // calculateTotal(i);
}

// Add a building and display a flash message

document.querySelector('#add-building').addEventListener('click', function () {
  // Get input fields
  const buildingColor = getCheckedRadioButton();
  const buildingValue = getBuildingValue();
  const playerNumber = getCheckedPlayerNumber();

  if (
    buildingColor != undefined &&
    buildingValue != undefined &&
    playerNumber != undefined
  ) {
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

    highlightHighscore();
  }
});

// Pop-up the 'add building' screen
document
  .querySelector('#add-building-pop-up')
  .addEventListener('click', function () {
    document.querySelector('form').classList.remove('hidden');
  });

// Select all delete buttons

function addDeleteButtons() {
  let deleteBtns = document.querySelectorAll('.delete-btn');

  // Loop over all buildings and add an event listener to the delete button
  for (let i = 0; i < deleteBtns.length; i++) {
    // Execute when a delete button is clicked
    deleteBtns[i].addEventListener('click', function () {
      // get the itemID of the clicked item
      let itemID = Number(deleteBtns[i].nextSibling.innerHTML);
      console.log(itemID);
      let player = 0;

      // Loop over allBuildings and delete that item
      for (let i = 0; i < allBuildings.length; i++) {
        if (allBuildings[i]['uniqueID'] == itemID) {
          // Grab the player id so you can call updateBuildings
          player = allBuildings[i]['player'];

          // TODO: Delete this item
          allBuildings.splice(i, 1);
          console.log(`Item with id ${itemID} deleted`);
          break;
        }
      }

      if (player != 0) {
        updateBuildings(player);
        highlightHighscore();
        deleteBtns = document.querySelectorAll('.delete-btn');
      }
    });
  }
}
