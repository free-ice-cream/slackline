var introState3 = {


  create: function(){
    intro3 = game.add.sprite(0, 0,  "intro3");
    intro3.scale.setTo(1.5,1.5);
    firstTime = Date.now();
    //
    game.input.keyboard.addCallbacks(this, null, null, bounce);
    game.input.keyboard.addCallbacks(this, null, null, keyPress);

  },
  update: function(){
    console.log("sensor   T", sensorT);
    console.log("stringD  ==", stringD );
    secondTime = Date.now();
    diff = secondTime - firstTime;
    if( diff >= screenTime ){
      game.state.start('intro1');

    }
    // if(sensorJ <= startLow || sensorJ >= startHigh){
    //   game.state.start('play');
    // }
    // console.log(navigator.platform);

    if(navigator.platform == "Win32"){
      console.log("win");
      if(sensorT > triggerPosWin ){
        game.state.start('play');
      }
    }else{
      if(sensorT > triggerPos ){
        game.state.start('play');
      }
    }

  }

}

function bounce(key){
  if(key == "G"){

    game.state.start('play');
  }

}
// keybort interpretation stuff

function numberfy(sen) {
  console.log("STRINGS");
  if (sen === "I") {
    console.log("stringI= ", stringI);
    sensorI = parseFloat(stringI);
    stringI = "";
    // bounce(sensorI);
  } else if (sen === "J") {
    console.log("stringJ= ", stringJ);
    sensorJ = parseFloat(stringJ);
    stringJ = "";
  } else if (sen === "Q") {
    console.log("stringQ= ", stringQ);
    sensorK = parseFloat(stringQ);
    stringQ = "";
  } else if (sen === "D") {
    console.log("stringD= ", stringD);
    sensorD = parseFloat(stringD);
    stringD = "";
  }else if (sen === "T") {
    console.log("stringT= ", stringT);
    sensorT = parseFloat(stringT);
    stringT = "";
  }

  //
  console.log("FLOATS");
  // console.log(sensorI);
  console.log("sensorT");
  console.log(sensorT);
}

function keyPress(char) {
  //console.log(char);

  switch (char) {
    case "I":
      toggleI = true;
      //
      toggleJ = false;
      toggleQ = false;
      toggleD = false;
      toggleT = false;
      break;
    case "J":
      toggleJ = true;
      //
      toggleI = false;
      toggleQ = false;
      toggleD = false;
      toggleT = false;
      break;
    case "Q":
      toggleQ = true;
      //
      toggleI = false;
      toggleJ = false;
      toggleD = false;
      toggleT = false;
      break;

    case "D":
      toggleD = true;
      //
      toggleI = false;
      toggleJ = false;
      toggleQ = false;
      toggleT = false;
      break;
    case "T":
        toggleT = true;
        toggleD = false;
        toggleI = false;
        toggleJ = false;
        toggleQ = false;
        break;
  // case "Z"://german keyboard hack
  //           toggleT = true;
  //             //
  //           toggleD = false;
  //           toggleI = false;
  //           toggleJ = false;
  //           toggleQ = false;
  //     break;
    case "G":
    console.log("G bounce");
    bounce();
      break;

    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case ".":
    case "-":
      if (toggleI) {
        stringI += char
      }
      if (toggleJ) {
        stringJ += char
      }
      if (toggleQ) {
        stringQ += char
      }
      if (toggleD) {
        stringD += char
      }
      if (toggleT) {
        stringT += char
      }
      // if (toggleZ) {
      //   stringT += char
      // }
      break;

    case "N":
      if (toggleI) {
        numberfy("I");

      }
      if (toggleJ) {
        numberfy("J");
      }
      if (toggleQ) {
        numberfy("Q");
      }
      if (toggleD) {
        numberfy("D");
      }
      if (toggleT) {
        numberfy("T");
      }
      // if (toggleT) {
      //   numberfy("T");
      // }

      break;
    default:
      // code block
      //console.log("other key");
  }


}
