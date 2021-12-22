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

export function getXpValueFromPlayerSummary(id) {
  let xpValue = document.getElementById(id).innerHTML;
  xpValue = xpValue.replace(/\D/g,'');
  xpValue = parseInt(xpValue);
  return xpValue;
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




