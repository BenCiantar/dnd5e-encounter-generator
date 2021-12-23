import { 
  addListener, 
  calculateMultiplier, 
  calculateXpValues, 
  setDifficultyMessage 
} from './modules/utils.js';

import { 
  convertCrToXp, 
  convertNumPlayersToString, 
  formatCrAsIdString 
} from './modules/converters.js';


//--Global Variables
const defaultApiUrl = "https://api.open5e.com/";

let monsterArray = [];
let encounterArray = [];

let keyStats = {
  xpTotal: 0,
  monsterCount: 0,
}

async function fetchMonsters() {
  return fetch(`${defaultApiUrl}monsters/?limit=2000`, {})
    .then((response) => response.json())
    .then((data) => data.results);
}

async function initApp(){
  const monsters = await fetchMonsters();
  monsterArray = monsters;
  renderMonsters(monsters);
  hideLoadingScreen();
}

//--Event Listeners
document.addEventListener("DOMContentLoaded", function() {
  fetchMonsters(defaultApiUrl);
  createCollapsibleMonsterSections();
  renderPlayerList();
  initApp();
});

addListener("change", "number-of-players", renderPlayerList);
addListener("change", "player-one", updateXpThresholds);


//////////////////////////////Render Page//////////////////////////////

//--Page Structure
function hideLoadingScreen(){
  document.getElementById("loading-screen").style.display = "none";
}

function createCollapsibleMonsterSections() {
  const highestCr = 30;
  const lowestCr = 0;
  for (let i = lowestCr; i <= highestCr; i++) {
    if (i == lowestCr) {
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

    const emptyCat1 = 28;
    const emptyCat2 = 29;

    if (i != lowestCr && i != emptyCat1 && i != emptyCat2) {
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
  for (let monster of monsters){
    const cr = monster.challenge_rating;
    const xp = convertCrToXp(cr);
    const id = formatCrAsIdString(cr);
    
    try {
      renderMonsterItem(`cr-${id}`, `${monster.name}`, xp, cr);
    } catch (error) {
      console.log("Error with item: " + monster.name);
    }
  }
  for (let monster of monsters){
    addListener("click", `${monster.name}-btn`, addToEncounter, `${monster.name}`);
  }
}

/**
 * 
 * @param {*} id ID of element to insert monster into
 * @param {*} name Monster name
 * @param {*} xp Experience gained from killing the monster
 * @param {*} cr The monster's challenge rating
 */
function renderMonsterItem(id, name, xp, cr) {
  document.getElementById(id).innerHTML += `
  <div class="monster-item">
    <div class="monster-summary">
      <h4>${name}</h4><p>CR: ${cr} - XP: ${xp}</p>
    </div>
    <div class="add-monster-section">
      <button id="${name}-btn">Add</button>
    </div>
  </div>
`
}


//////////////////////////////Player Section//////////////////////////////

function renderPlayerList() {
  document.getElementById("player-display").innerHTML = ``

  const numPlayers = document.getElementById('number-of-players').value;

  renderLevelSelectorsList(numPlayers);

  for (let i = 0; i < numPlayers; i++) {
    const numPlayersString = convertNumPlayersToString(i + 1);
    addListener("change", `player-${numPlayersString}`, updateXpThresholds);
  }
  updateXpThresholds();
}

function renderLevelSelectorsList(numPlayers){
  for (let i = 0; i < numPlayers; i++) {

    const numPlayersString = convertNumPlayersToString(i + 1);

    document.getElementById("player-display").innerHTML += `
    <div class="player-level-selector">
      <label for="player-${numPlayersString}">Player Level:</label>
      <select name="players" class="player-lvl" id="player-${numPlayersString}">
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
  const playerLevels = document.querySelectorAll(".player-lvl");
  const xpThresholds = calculateXpValues(playerLevels);
  document.getElementById("player-summary-right").innerHTML = `
    <p id="easy-xp">${xpThresholds.easyXpThreshold}XP</p>
    <p id="medium-xp">${xpThresholds.mediumXpThreshold}XP</p>
    <p id="hard-xp">${xpThresholds.hardXpThreshold}XP</p>
    <p id="deadly-xp">${xpThresholds.deadlyXpThreshold}XP</p>
  `

  updateDifficultyIndicator();
}


//////////////////////////////Encounter Section//////////////////////////////

function addToEncounter(name) {
  const monsters = monsterArray;

  for (let monster of monsters) {
    if (name == monster.name) {
      const xp = convertCrToXp(monster.challenge_rating);
      keyStats.xpTotal += xp;
      keyStats.monsterCount++;

      if (encounterArray.length == 0) {
        addEntry(name, xp);
        break;
      }

      let monsterExists = false;

      for (let entry of encounterArray){
        if (name == entry.name){
          entry.count++;
          monsterExists = true;
        }
      } 

      if (!monsterExists) {
        addEntry(name, xp);
      }
    }
  }
  updateEncounterList();
}

function addEntry(name, xp) {
  encounterArray.push(
    {
      name: name,
      xp: xp,
      count: 1
    }
  )
}

function removeFromEncounter(i) {
  keyStats.xpTotal -= encounterArray[i].xp;
  keyStats.monsterCount--;
  encounterArray[i].count--;
  if (encounterArray[i].count == 0) {
    encounterArray.splice(i, 1);
  }
  updateEncounterList();
}

function updateEncounterList(){
  document.getElementById("encounter-top").innerHTML = "";

  for (let i = 0; i < encounterArray.length; i++){
    const xpToInt = parseInt(encounterArray[i].xp);
    renderEncounterList(i, encounterArray[i].name, encounterArray[i].count, xpToInt);
  }
  for (let i = 0; i < encounterArray.length; i++){
    addListener("click", `close-${i}`, removeFromEncounter, `${i}`);
  }
  updateMonsterSummary();
}

function renderEncounterList(i, name, count, XP){
  document.getElementById("encounter-top").innerHTML += `
    <div class="encounter-list-item">
      <div id="close-${i}" class="encounter-list-close">
      &#10005;
      </div>
      <div class="encounter-list-left">
        ${name} 
      </div>
      <div class="encounter-list-center">
        x ${count}
      </div>
      <div class="encounter-list-right">
        ${XP * count}xp
      </div>
    </div>
  `
}

function updateMonsterSummary() {
  const multiplier = calculateMultiplier(keyStats.monsterCount);

  if (encounterArray.length == 0) {
    document.getElementById("encounter-summary-right").innerHTML = `
    <p>-</p>
    <p>-</p>
    <p>-</p>
  `
  } else {
    document.getElementById("encounter-summary-right").innerHTML = `
    <p>${keyStats.xpTotal}XP</p>
    <p>x${multiplier}</p>
    <p>${keyStats.xpTotal * multiplier}XP</p>
  `
  }
  updateDifficultyIndicator();
}


//////////////////////////////Difficulty Indicator//////////////////////////////

function updateDifficultyIndicator() {
  const multiplier = calculateMultiplier(keyStats.monsterCount);

  const finalTotal = keyStats.xpTotal * multiplier;
  if (encounterArray.length == 0) {
    document.getElementById("difficulty-meter").innerHTML = `
      <h2>Add some monsters to begin!</h2>
    `
  }
  if (encounterArray.length > 0) {
    setDifficultyMessage(finalTotal);
  }
}



