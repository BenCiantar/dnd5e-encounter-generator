//////////////////////////////Globals

const body = document.getElementById("body");
let monsterArray = [];

let easyXPThreshold = 25;
let mediumXPThreshold = 50;
let hardXPThreshold = 75;
let deadlyXPThreshold = 100;


//////////////////////////////Populating the page

createCollapsibleMonsterSections();
fetchMonsterData();


function fetchMonsterData() {
    fetch("https://api.open5e.com/monsters/?limit=2000", {
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        monsterArray = (data);
        populateMonsterList(data);
        updatePlayerInfo();
    })
}

// Generate collapsible monster sections
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

function updatePlayerInfo() {
  refreshPlayerList();
  updateXPThresholds();
  updateDifficultyIndicator();
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
  //Update the total of the XP threshold, totalling all level dropdowns and recalculating

  easyXPThreshold = 0;
  mediumXPThreshold = 0;
  hardXPThreshold = 0;
  deadlyXPThreshold = 0;

  let playerLevels = document.querySelectorAll(".player-lvl");

  for (let i = 0; i < playerLevels.length; i++) {
    switch (playerLevels[i].value) {
      case "1":
        easyXPThreshold += 25;
        mediumXPThreshold += 50;
        hardXPThreshold += 75;
        deadlyXPThreshold += 100;
        break;
      case "2":
        easyXPThreshold += 50;
        mediumXPThreshold += 100;
        hardXPThreshold += 150;
        deadlyXPThreshold += 200;
        break;
      case "3":
        easyXPThreshold += 75;
        mediumXPThreshold += 150;
        hardXPThreshold += 225;
        deadlyXPThreshold += 400;
        break;
      case "4":
        easyXPThreshold += 125;
        mediumXPThreshold += 250;
        hardXPThreshold += 375;
        deadlyXPThreshold += 500;
        break;
      case "5":
        easyXPThreshold += 250;
        mediumXPThreshold += 500;
        hardXPThreshold += 750;
        deadlyXPThreshold += 1000;
        break;
      case "6":
        easyXPThreshold += 300;
        mediumXPThreshold += 600;
        hardXPThreshold += 900;
        deadlyXPThreshold += 1400;
        break;
      case "7":
        easyXPThreshold += 350;
        mediumXPThreshold += 750;
        hardXPThreshold += 1100;
        deadlyXPThreshold += 1700;
        break;
      case "8":
        easyXPThreshold += 450;
        mediumXPThreshold += 900;
        hardXPThreshold += 1400;
        deadlyXPThreshold += 2100;
        break;
      case "9":
        easyXPThreshold += 550;
        mediumXPThreshold += 1100;
        hardXPThreshold += 1600;
        deadlyXPThreshold += 2400;
        break;
      case "10":
        easyXPThreshold += 600;
        mediumXPThreshold += 1200;
        hardXPThreshold += 1900;
        deadlyXPThreshold += 2800;
        break;
      case "11":
        easyXPThreshold += 800;
        mediumXPThreshold += 1600;
        hardXPThreshold += 2400;
        deadlyXPThreshold += 3600;
        break;
      case "12":
        easyXPThreshold += 1000;
        mediumXPThreshold += 2000;
        hardXPThreshold += 3000;
        deadlyXPThreshold += 4000;
        break;
      case "13":
        easyXPThreshold += 1100;
        mediumXPThreshold += 2200;
        hardXPThreshold += 3400;
        deadlyXPThreshold += 5100;
        break;
      case "14":
        easyXPThreshold += 1250;
        mediumXPThreshold += 2500;
        hardXPThreshold += 3800;
        deadlyXPThreshold += 5700;
        break;
      case "15":
        easyXPThreshold += 1400;
        mediumXPThreshold += 2800;
        hardXPThreshold += 4300;
        deadlyXPThreshold += 6400;
        break;
      case "16":
        easyXPThreshold += 1600;
        mediumXPThreshold += 3200;
        hardXPThreshold += 4800;
        deadlyXPThreshold += 7200;
        break;
      case "17":
        easyXPThreshold += 2000;
        mediumXPThreshold += 3900;
        hardXPThreshold += 5900;
        deadlyXPThreshold += 8800;
        break;
      case "18":
        easyXPThreshold += 2100;
        mediumXPThreshold += 4200;
        hardXPThreshold += 6300;
        deadlyXPThreshold += 9500;
        break;
      case "19":
        easyXPThreshold += 2400;
        mediumXPThreshold += 4900;
        hardXPThreshold += 7300;
        deadlyXPThreshold += 10900;
        break;
      case "20":
        easyXPThreshold += 2800;
        mediumXPThreshold += 5700;
        hardXPThreshold += 8500;
        deadlyXPThreshold += 12700;
        break;
    }
  }

  document.getElementById("players-bottom").innerHTML = `
  <div id="player-summary-left">
    <p>Easy: </p>
    <p>Medium: </p>
    <p>Hard: </p>
    <p>Deadly: </p>
  </div>
  <div id="player-summary-right">
    <p>${easyXPThreshold}XP</p>
    <p>${mediumXPThreshold}XP</p>
    <p>${hardXPThreshold}XP</p>
    <p>${deadlyXPThreshold}XP</p>
  </div>
  `
}


//////////////////////////////Encounter Functions

let encounterArray = [];

function addToEncounter(name) {
  for (let i = 0; i < monsterArray.results.length; i++) {
    if (name == monsterArray.results[i].name) {
      if (encounterArray.length == 0) {
        encounterArray.push(
          {
            name: monsterArray.results[i].name,
            xp: convertCRToXP(eval(monsterArray.results[i].challenge_rating)),
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
            xp: convertCRToXP(eval(monsterArray.results[i].challenge_rating)),
            count: 1
          }
        )
      }
    }
  }
  console.log(encounterArray);
}
  

//////////////////////////////Monster list section

function populateMonsterList(data) {

  for (let i = 0; i < data.results.length; i++){

      let CR = eval(data.results[i].challenge_rating);

      if (CR == 0.125) {
        CR = "eighth";
      } else if (CR == 0.25) {
        CR = "quarter";
      } else if (CR == 0.5) {
        CR = "half";
      }

      try {
        // let monsterName = data.results[i].name.replace(/\s+/g, '');

        document.getElementById(`cr-${CR}`).innerHTML += `
        <div class="monster-item">
          <div class="monster-summary">
            <h4>${data.results[i].name}</h4><p>CR: ${data.results[i].challenge_rating} - XP: ${convertCRToXP(CR)}</p>
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
}


//////////////////////////////Tools

function updateDifficultyIndicator() {

}

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

function convertCRToXP(CR){
  let XP;

  switch (CR){
    case 0:
      XP = 10;
      return XP;
    case "eighth":
      XP = 25;
      return XP;
    case "quarter":
      XP = 50;
      return XP;
    case "half":
      XP = 100;
      return XP;
    case 1:
      XP = 200;
      return XP;
    case 2:
      XP = 450;
      return XP;
    case 3:
      XP = 700;
      return XP;
    case 4:
      XP = 1100;
      return XP;
    case 5:
      XP = 1800;
      return XP;
    case 6:
      XP = 2300;
      return XP;
    case 7:
      XP = 2900;
      return XP;
    case 8:
      XP = 3900;
      return XP;
    case 9:
      XP = 5000;
      return XP;
    case 10:
      XP = 5900;
      return XP;
    case 11:
      XP = 7200;
      return XP;
    case 12:
      XP = 8400;
      return XP;
    case 13:
      XP = 10000;
      return XP;
    case 14:
      XP = 11500;
      return XP;
    case 15:
      XP = 13000;
      return XP;
    case 16:
      XP = 15000;
      return XP;
    case 17:
      XP = 18000;
      return XP;
    case 18:
      XP = 20000;
      return XP;
    case 19:
      XP = 22000;
      return XP;
    case 20:
      XP = 25000;
      return XP;
    case 21:
      XP = 33000;
      return XP;
    case 22:
      XP = 41000;
      return XP;
    case 23:
      XP = 50000;
      return XP;
    case 24:
      XP = 62000;
      return XP;
    case 25:
      XP = 75000;
      return XP;
    case 26:
      XP = 90000;
      return XP;
    case 27:
      XP = 105000;
      return XP;
    case 28:
      XP = 120000;
      return XP;
    case 29:
      XP = 135000;
      return XP;
    case 30:
      XP = 155000;
      return XP;
  }
}


