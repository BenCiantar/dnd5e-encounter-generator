export function addListener(type, id, callback, param){
    document.getElementById(id).addEventListener(type, function (){
      callback(param);
    });
  }

export function convertCrToXp(CR){
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
  
export function convertNumPlayersToString(numPlayersInt) {
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

export function convertChallengeRating(rating) {
  switch (rating) {
    case "1/8":
      return "eighth";
    case "1/4":
      return "quarter";
    case "1/2":
      return "half";
    default:
      return rating;
  }
}

export function calculateMultiplier(count) {
  if (count == 1){
    let multiplier = 1;
    return multiplier;
  } else if (count == 2) {
    let multiplier = 1.5;
    return multiplier;
  } else if (count >= 3 && count <= 6) {
    let multiplier = 2;
    return multiplier;
  } else if (count >= 7 && count <= 10) {
    let multiplier = 2.5;
    return multiplier;
  } else if (count >= 11 && count <= 14) {
    let multiplier = 3;
    return multiplier;
  } else if (count >= 15) {
    let multiplier = 4;
    return multiplier;
  }
}

export function calculateXpValues(){
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
    return xpThresholds;
  }
}

export function setDifficultyMessage(finalTotal) {
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

export function getXpValueFromPlayerSummary(id) {
  let xpValue = document.getElementById(id).innerHTML;
  xpValue = xpValue.replace(/\D/g,'');
  xpValue = parseInt(xpValue);
  return xpValue;
}