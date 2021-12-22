import { convertCrToXp, addListener, getXpValueFromPlayerSummary, convertNumPlayersToString, convertChallengeRating } from './modules/tools.js';

//--Global Variables
const defaultApiUrl = "https://api.open5e.com/monsters/?limit=2000";

let monsterArray = [];
let encounterArray = [];

let keyStats = {
  xpTotal: 0,
  monsterCount: 0,
  groupMultiplier: 1
}


//////////////////////////////Populating the page

//--Event Listeners
document.addEventListener("DOMContentLoaded", function() {
  fetchMonsters(defaultApiUrl);
  createCollapsibleMonsterSections();
  updatePlayerList();
});

addListener("change", "number-of-players", updatePlayerList);
addListener("change", "player-one", updateXpThresholds);

//--Data Retrieval
async function fetchMonsters() {
  return fetch(defaultApiUrl, {})
    .then((response) => response.json())
    .then((data) => data);

    // passOutData(data).then(initAfterFetch());
  // })
}

// async function passOutData(data){
//   monsterArray = (data);
// }

async function initApp(){
  const monsters = await fetchMonsters();
  //Still need to store the api data globally to access it in the 
  //add/remove monster from encounter. Haven't found a way around this yet
  monsterArray = await monsters;
  renderMonsters(monsters.results);
  hideLoadingScreen();
}

initApp();

//--Page Structure
function hideLoadingScreen(){
  document.getElementById("loading-screen").style.display = "none";
}

function createCollapsibleMonsterSections() {
  for (let i = 0; i < 31; i++) {

    if (i == 0) {
      document.getElementById("monsters-section").innerHTML += `
      <button type="button" class="collapsible">Challenge Rating ${i}</button>
      <div id="cr-${i}" class="monster-content">
      </div>

      <button type="button" class="collapsible">Challenge Rating 1/8</button>
      <div id="cr-eighth" class="monster-content">
      </div>

      <button type="button" class="collapsible">Challenge Rating 1/4</button>
      <div id="cr-quarter" class="monster-content">
      </div>

      <button type="button" class="collapsible">Challenge Rating 1/2</button>
      <div id="cr-half" class="monster-content">
      </div>
      `
    }

    if (i > 0 && (i < 28 || i == 30)) {
      document.getElementById("monsters-section").innerHTML += `
      <button type="button" class="collapsible">Challenge Rating ${i}</button>
      <div id="cr-${i}" class="monster-content">
      </div>
      `
    }
  }
  addEventListenersToCollapsibles();
}

function addEventListenersToCollapsibles() {
  const coll = document.getElementsByClassName("collapsible");

  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

function renderMonsters(monsters) {
  console.log(monsters);
  for (let monster of monsters){
    const CR = monster.challenge_rating;
    const XP = convertCrToXp(CR);
    const ID = convertChallengeRating(CR);
    
    try {
      document.getElementById(`cr-${ID}`).innerHTML += `
      <div class="monster-item">
        <div class="monster-summary">
          <h4>${monster.name}</h4><p>CR: ${CR} - XP: ${XP}</p>
        </div>
        <div class="add-monster-section">
          <button id="${monster.name}-btn">Add</button>
        </div>
      </div>
    `
    } catch (error) {
      console.log("Error with item: " + monster.name);
    }
  }
  for (let monster of monsters){
    addListener("click", `${monster.name}-btn`, addToEncounter, `${monster.name}`);
  }
}


//////////////////////////////Player Section//////////////////////////////

function updatePlayerList() {
  document.getElementById("player-display").innerHTML = ``

  const numPlayersInt = document.getElementById('number-of-players').value;

  createLevelSelectors(numPlayersInt);

  for (let i = 0; i < numPlayersInt; i++) {
    const playerNumString = convertNumPlayersToString(i);

    addListener("change", `player-${playerNumString}`, updateXpThresholds);
  }

  updateXpThresholds();
}

function createLevelSelectors(numPlayersInt){
  for (let i = 0; i < numPlayersInt; i++) {

    const playerNumString = convertNumPlayersToString(i);

    document.getElementById("player-display").innerHTML += `
    <div class="player-level-selector">
      <label for="player-${playerNumString}">Player Level:</label>
      <select name="players" class="player-lvl" id="player-${playerNumString}">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
      </select>
    </div>
    `
  }
}

function updateXpThresholds() {

  let xpThresholds = {
    easyXpThreshold: 0,
    mediumXpThreshold: 0,
    hardXpThreshold: 0,
    deadlyXpThreshold: 0
  }

  const playerLevels = document.querySelectorAll(".player-lvl");

  for (let i = 0; i < playerLevels.length; i++) {
    switch (playerLevels[i].value) {
      case "1":
        xpThresholds.easyXpThreshold += 25;
        xpThresholds.mediumXpThreshold += 50;
        xpThresholds.hardXpThreshold += 75;
        xpThresholds.deadlyXpThreshold += 100;
        break;
      case "2":
        xpThresholds.easyXpThreshold += 50;
        xpThresholds.mediumXpThreshold += 100;
        xpThresholds.hardXpThreshold += 150;
        xpThresholds.deadlyXpThreshold += 200;
        break;
      case "3":
        xpThresholds.easyXpThreshold += 75;
        xpThresholds.mediumXpThreshold += 150;
        xpThresholds.hardXpThreshold += 225;
        xpThresholds.deadlyXpThreshold += 400;
        break;
      case "4":
        xpThresholds.easyXpThreshold += 125;
        xpThresholds.mediumXpThreshold += 250;
        xpThresholds.hardXpThreshold += 375;
        xpThresholds.deadlyXpThreshold += 500;
        break;
      case "5":
        xpThresholds.easyXpThreshold += 250;
        xpThresholds.mediumXpThreshold += 500;
        xpThresholds.hardXpThreshold += 750;
        xpThresholds.deadlyXpThreshold += 1000;
        break;
      case "6":
        xpThresholds.easyXpThreshold += 300;
        xpThresholds.mediumXpThreshold += 600;
        xpThresholds.hardXpThreshold += 900;
        xpThresholds.deadlyXpThreshold += 1400;
        break;
      case "7":
        xpThresholds.easyXpThreshold += 350;
        xpThresholds.mediumXpThreshold += 750;
        xpThresholds.hardXpThreshold += 1100;
        xpThresholds.deadlyXpThreshold += 1700;
        break;
      case "8":
        xpThresholds.easyXpThreshold += 450;
        xpThresholds.mediumXpThreshold += 900;
        xpThresholds.hardXpThreshold += 1400;
        xpThresholds.deadlyXpThreshold += 2100;
        break;
      case "9":
        xpThresholds.easyXpThreshold += 550;
        xpThresholds.mediumXpThreshold += 1100;
        xpThresholds.hardXpThreshold += 1600;
        xpThresholds.deadlyXpThreshold += 2400;
        break;
      case "10":
        xpThresholds.easyXpThreshold += 600;
        xpThresholds.mediumXpThreshold += 1200;
        xpThresholds.hardXpThreshold += 1900;
        xpThresholds.deadlyXpThreshold += 2800;
        break;
      case "11":
        xpThresholds.easyXpThreshold += 800;
        xpThresholds.mediumXpThreshold += 1600;
        xpThresholds.hardXpThreshold += 2400;
        xpThresholds.deadlyXpThreshold += 3600;
        break;
      case "12":
        xpThresholds.easyXpThreshold += 1000;
        xpThresholds.mediumXpThreshold += 2000;
        xpThresholds.hardXpThreshold += 3000;
        xpThresholds.deadlyXpThreshold += 4000;
        break;
      case "13":
        xpThresholds.easyXpThreshold += 1100;
        xpThresholds.mediumXpThreshold += 2200;
        xpThresholds.hardXpThreshold += 3400;
        xpThresholds.deadlyXpThreshold += 5100;
        break;
      case "14":
        xpThresholds.easyXpThreshold += 1250;
        xpThresholds.mediumXpThreshold += 2500;
        xpThresholds.hardXpThreshold += 3800;
        xpThresholds.deadlyXpThreshold += 5700;
        break;
      case "15":
        xpThresholds.easyXpThreshold += 1400;
        xpThresholds.mediumXpThreshold += 2800;
        xpThresholds.hardXpThreshold += 4300;
        xpThresholds.deadlyXpThreshold += 6400;
        break;
      case "16":
        xpThresholds.easyXpThreshold += 1600;
        xpThresholds.mediumXpThreshold += 3200;
        xpThresholds.hardXpThreshold += 4800;
        xpThresholds.deadlyXpThreshold += 7200;
        break;
      case "17":
        xpThresholds.easyXpThreshold += 2000;
        xpThresholds.mediumXpThreshold += 3900;
        xpThresholds.hardXpThreshold += 5900;
        xpThresholds.deadlyXpThreshold += 8800;
        break;
      case "18":
        xpThresholds.easyXpThreshold += 2100;
        xpThresholds.mediumXpThreshold += 4200;
        xpThresholds.hardXpThreshold += 6300;
        xpThresholds.deadlyXpThreshold += 9500;
        break;
      case "19":
        xpThresholds.easyXpThreshold += 2400;
        xpThresholds.mediumXpThreshold += 4900;
        xpThresholds.hardXpThreshold += 7300;
        xpThresholds.deadlyXpThreshold += 10900;
        break;
      case "20":
        xpThresholds.easyXpThreshold += 2800;
        xpThresholds.mediumXpThreshold += 5700;
        xpThresholds.hardXpThreshold += 8500;
        xpThresholds.deadlyXpThreshold += 12700;
        break;
    }
  }
  updateDifficultyIndicator();

  document.getElementById("player-summary-right").innerHTML = `
    <p id="easy-xp">${xpThresholds.easyXpThreshold}XP</p>
    <p id="medium-xp">${xpThresholds.mediumXpThreshold}XP</p>
    <p id="hard-xp">${xpThresholds.hardXpThreshold}XP</p>
    <p id="deadly-xp">${xpThresholds.deadlyXpThreshold}XP</p>
  `
}


//////////////////////////////Encounter Section//////////////////////////////

function addToEncounter(name) {
  for (let i = 0; i < monsterArray.results.length; i++) {
    if (name == monsterArray.results[i].name) {
      const CR = convertCrToXp(monsterArray.results[i].challenge_rating);
      keyStats.xpTotal += CR;
      keyStats.monsterCount++;
      if (encounterArray.length == 0) {
        encounterArray.push(
          {
            name: monsterArray.results[i].name,
            xp: CR,
            count: 1
          }
        )
        break;
      }

      let monsterExists = false;

      for (let j = 0; j < encounterArray.length; j++){
        if (name == encounterArray[j].name){
          encounterArray[j].count++;
          monsterExists = true;
        }
      } 

      if (!monsterExists) {
        encounterArray.push(
          {
            name: monsterArray.results[i].name,
            xp: CR,
            count: 1
          }
        )
      }
    }
  }
  updateEncounterList();
}

function removeFromEncounter(i) {
  keyStats.xpTotal -= encounterArray[i].xp;
  keyStats.monsterCount--;
  encounterArray[i].count--;
  keyStats.groupMultiplier = calculateMultiplier(keyStats.monsterCount);
  if (encounterArray[i].count == 0) {
    encounterArray.splice(i, 1);
  }
  updateEncounterList();
}

function calculateMultiplier(count) {
  if (count == 1){
    keyStats.groupMultiplier = 1;
    return keyStats.groupMultiplier;
  } else if (count == 2) {
    keyStats.groupMultiplier = 1.5;
    return keyStats.groupMultiplier;
  } else if (count >= 3 && count <= 6) {
    keyStats.groupMultiplier = 2;
    return keyStats.groupMultiplier;
  } else if (count >= 7 && count <= 10) {
    keyStats.groupMultiplier = 2.5;
    return keyStats.groupMultiplier;
  } else if (count >= 11 && count <= 14) {
    keyStats.groupMultiplier = 3;
    return keyStats.groupMultiplier;
  } else if (count >= 15) {
    keyStats.groupMultiplier = 4;
    return keyStats.groupMultiplier;
  }
}

function updateEncounterList(){
  document.getElementById("encounter-top").innerHTML = "";

  for (let i = 0; i < encounterArray.length; i++){
    document.getElementById("encounter-top").innerHTML += `
      <div class="encounter-list-item">
        <div id="close-${i}" class="encounter-list-close">
        &#10005;
        </div>
        <div class="encounter-list-left">
          ${encounterArray[i].name} 
        </div>
        <div class="encounter-list-center">
          x ${encounterArray[i].count}
        </div>
        <div class="encounter-list-right">
          ${parseInt(encounterArray[i].xp) * encounterArray[i].count}xp
        </div>
      </div>
    `

    document.getElementById(`close-${i}`).addEventListener("click", function() {
      removeFromEncounter();
    });
  }
  for (let i = 0; i < encounterArray.length; i++){
    addListener("click", `close-${i}`, removeFromEncounter, `${i}`);
  }
  updateMonsterSummary();
}

function updateMonsterSummary() {
  keyStats.groupMultiplier = calculateMultiplier(keyStats.monsterCount);

  document.getElementById("encounter-summary-right").innerHTML = `
    <p>${keyStats.xpTotal}XP</p>
    <p>x${keyStats.groupMultiplier}</p>
    <p>${keyStats.xpTotal * keyStats.groupMultiplier}XP</p>
  `
  if (encounterArray.length == 0) {
    document.getElementById("encounter-summary-right").innerHTML = `
    <p>-</p>
    <p>-</p>
    <p>-</p>
  `
  }
  updateDifficultyIndicator();
}


//////////////////////////////Difficulty Indicator//////////////////////////////

function updateDifficultyIndicator() {

  const finalTotal = keyStats.xpTotal * keyStats.groupMultiplier;
  if (encounterArray.length == 0) {
    document.getElementById("difficulty-meter").innerHTML = `
      <h2>Add some monsters to begin!</h2>
    `
  }
  if (encounterArray.length > 0) {
    if (finalTotal <= getXpValueFromPlayerSummary("easy-xp")) {
      document.getElementById("difficulty-meter").innerHTML = `
        <h2>This encounter will be <span style="color: green">EASY</span> for your players!</h2>
      `
    } else if (finalTotal <= getXpValueFromPlayerSummary("medium-xp")) {
      document.getElementById("difficulty-meter").innerHTML = `
        <h2>This encounter will be of <span style="color: yellow">MEDIUM</span> difficulty for your players!</h2>
      `
    } else if (finalTotal <= getXpValueFromPlayerSummary("hard-xp")) {
      document.getElementById("difficulty-meter").innerHTML = `
        <h2>This encounter will be <span style="color: orange">HARD</span> for your players!</h2>
      `
    } else {
      document.getElementById("difficulty-meter").innerHTML = `
        <h2>This encounter will be <span style="color: red">DEADLY</span> for your players!</h2>
      `
    }
  }
}


