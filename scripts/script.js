//////////////////////////////Globals

const apiLink = "https://api.open5e.com/monsters/?limit=2000";

let monsterArray = [];
let encounterArray = [];

let xpThresholds = {
  easyXpThreshold: 25,
  mediumXpThreshold: 50,
  hardXpThreshold: 75,
  deadlyXpThreshold: 100
}

let keyStats = {
  xpTotal: 0,
  monsterCount: 0,
  groupMultiplier: 1
}


//////////////////////////////Populating the page

document.addEventListener("DOMContentLoaded", function() {
  fetchApi();
  createCollapsibleMonsterSections();
  updatePlayerInfo();
});

function fetchApi() {
    fetch(apiLink, {
      })
      .then((response) => response.json())
      .then((data) => {
        monsterArray = (data);

        populateMonsterList(monsterArray);
        hideLoadingScreen();
    })
}

function updatePlayerInfo() {
  refreshPlayerList();
  updateXPThresholds();
}


//////////////////////////////Player section

function refreshPlayerList() {
  document.getElementById("player-display").innerHTML = ``

  let numPlayersInt = document.getElementById('number-of-players').value;

  for (i = 0; i < numPlayersInt; i++) {

    let playerNumString = convertNumPlayersToString(i);

    document.getElementById("player-display").innerHTML += `
    <div class="player-level-selector">
      <label for="player-${playerNumString}">Player Level:</label>
      <select name="players" class="player-lvl" id="player-${playerNumString}" onchange="updateXPThresholds()">
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

function updateXPThresholds() {

  xpThresholds.easyXpThreshold = 0;
  xpThresholds.mediumXpThreshold = 0;
  xpThresholds.hardXpThreshold = 0;
  xpThresholds.deadlyXpThreshold = 0;

  let playerLevels = document.querySelectorAll(".player-lvl");

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
    <p>${xpThresholds.easyXpThreshold}XP</p>
    <p>${xpThresholds.mediumXpThreshold}XP</p>
    <p>${xpThresholds.hardXpThreshold}XP</p>
    <p>${xpThresholds.deadlyXpThreshold}XP</p>
  `
}


//////////////////////////////Encounter Functions

function addToEncounter(name) {
  for (let i = 0; i < monsterArray.results.length; i++) {
    if (name == monsterArray.results[i].name) {
      let CR = convertCRToXP(monsterArray.results[i].challenge_rating);
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

function updateEncounterList(){
  document.getElementById("encounter-top").innerHTML = "";

  for (let i = 0; i < encounterArray.length; i++){
    document.getElementById("encounter-top").innerHTML += `
      <div class="encounter-list-item">
        <div class="encounter-list-close" onclick="removeFromEncounter(${i})">
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


//////////////////////////////Monster list section

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
  let coll = document.getElementsByClassName("collapsible");
  let collI;

  for (collI = 0; collI < coll.length; collI++) {
    coll[collI].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}

function populateMonsterList(data) {

  for (let i = 0; i < data.results.length; i++){

      let CR = data.results[i].challenge_rating;
      let CRid = CR;

      //CODE CHECK move fraction converter into a separate function
      if (CR == "1/8") {
        CRid = "eighth";
      } else if (CR == "1/4") {
        CRid = "quarter";
      } else if (CR == "1/2") {
        CRid = "half";
      }

      try {
        document.getElementById(`cr-${CRid}`).innerHTML += `
        <div class="monster-item">
          <div class="monster-summary">
            <h4>${data.results[i].name}</h4><p>CR: ${CR} - XP: ${convertCRToXP(CR)}</p>
          </div>
          <div class="add-monster-section">
            <button onclick="addToEncounter('${data.results[i].name}')">Add</button>
          </div>
        </div>
      `
      } catch (error) {
        console.log("Error with item: " + data.results[i].name);
      }
  }
}


//////////////////////////////Tools

function hideLoadingScreen(){
  document.getElementById("loading-screen").style.display = "none";
}

function updateDifficultyIndicator() {

  let finalTotal = keyStats.xpTotal * keyStats.groupMultiplier;
  if (encounterArray.length == 0) {
    document.getElementById("difficulty-meter").innerHTML = `
      <h2>Add some monsters to begin!</h2>
    `
  }
  if (encounterArray.length > 0) {
    if (finalTotal <= xpThresholds.easyXpThreshold) {
      document.getElementById("difficulty-meter").innerHTML = `
        <h2>This encounter will be <span style="color: green">EASY</span> for your players!</h2>
      `
    } else if (finalTotal <= xpThresholds.mediumXpThreshold) {
      document.getElementById("difficulty-meter").innerHTML = `
        <h2>This encounter will be of <span style="color: yellow">MEDIUM</span> difficulty for your players!</h2>
      `
    } else if (finalTotal <= xpThresholds.hardXpThreshold) {
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

//CODE CHECK Move these long switches into modules
function convertNumPlayersToString(numPlayersInt) {
  let numPlayersString;

  switch (numPlayersInt + 1) {
    case 1:
      numPlayersString = "one";
      return numPlayersString;
    case 2:
      numPlayersString = "two";
      return numPlayersString;
    case 3:
      numPlayersString = "three";
      return numPlayersString;
    case 4:
      numPlayersString = "four";
      return numPlayersString;
    case 5:
      numPlayersString = "five";
      return numPlayersString;
    case 6:
      numPlayersString = "six";
      return numPlayersString;
    case 7:
      numPlayersString = "seven";
      return numPlayersString;
    case 8:
      numPlayersInt = "eight";
      return numPlayersString;
  }
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

//CODE CHECK move to a utilities javascript module
function convertCRToXP(CR){
  let XP;

  switch (CR){
    case "0":
      XP = 10;
      return XP;
    case "1/8":
      XP = 25;
      return XP;
    case "1/4":
      XP = 50;
      return XP;
    case "1/2":
      XP = 100;
      return XP;
    case "1":
      XP = 200;
      return XP;
    case "2":
      XP = 450;
      return XP;
    case "3":
      XP = 700;
      return XP;
    case "4":
      XP = 1100;
      return XP;
    case "5":
      XP = 1800;
      return XP;
    case "6":
      XP = 2300;
      return XP;
    case "7":
      XP = 2900;
      return XP;
    case "8":
      XP = 3900;
      return XP;
    case "9":
      XP = 5000;
      return XP;
    case "10":
      XP = 5900;
      return XP;
    case "11":
      XP = 7200;
      return XP;
    case "12":
      XP = 8400;
      return XP;
    case "13":
      XP = 10000;
      return XP;
    case "14":
      XP = 11500;
      return XP;
    case "15":
      XP = 13000;
      return XP;
    case "16":
      XP = 15000;
      return XP;
    case "17":
      XP = 18000;
      return XP;
    case "18":
      XP = 20000;
      return XP;
    case "19":
      XP = 22000;
      return XP;
    case "20":
      XP = 25000;
      return XP;
    case "21":
      XP = 33000;
      return XP;
    case "22":
      XP = 41000;
      return XP;
    case "23":
      XP = 50000;
      return XP;
    case "24":
      XP = 62000;
      return XP;
    case "25":
      XP = 75000;
      return XP;
    case "26":
      XP = 90000;
      return XP;
    case "27":
      XP = 105000;
      return XP;
    case "28":
      XP = 120000;
      return XP;
    case "29":
      XP = 135000;
      return XP;
    case "30":
      XP = 155000;
      return XP;
  }
}


