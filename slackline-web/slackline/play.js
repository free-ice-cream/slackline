var playState = {

  create: function() {
    game.stage.backgroundColor = backgroundColour;

    game.input.keyboard.addCallbacks(this, null, null, keyPress);

    // street = game.add.tileSprite(0, 0, 1920, 1080, "street");
     street1 = game.add.sprite(0, 0,  "street");
     street2 = game.add.sprite(0, game.world.height *-1,  "street");

    yellowGroup = game.add.physicsGroup();
    blueGroup = game.add.physicsGroup();
    orangeGroup = game.add.physicsGroup();

    yellowGroup.enableBody = true;
    blueGroup.enableBody = true;
    orangeGroup.enableBody = true;

    for (let i = 0; i <= groupSize; i++) {
      yt = yellowGroup.create(getRandomInt(leftPave,rightPave), (game.world.randomY * spread), "yellowthing");
      bt = blueGroup.create(getRandomInt(leftPave,rightPave), (game.world.randomY * spread), "bluething");
      ot = orangeGroup.create(getRandomInt(leftPave,rightPave), (game.world.randomY * spread), "orangething");
      //yellowArray[i].x = getRandomInt(leftPave,rightPave);
      yellowArray.push(yt);
      blueArray.push(bt);
      orangeArray.push(ot);
      //
      yellowSpeeds.push(getRandomFloat(thingMin, thingMax));
      blueSpeeds.push(getRandomFloat(thingMin, thingMax));
      orangeSpeeds.push(getRandomFloat(thingMin, thingMax));
      //
      // var yf =
      yt.animations.add('frown', [ 2], 1, false);
      yt.animations.add('smile', [ 1], 1, false);
      // yellowAnim.push(yt.animations.add('frown', [ 2], 1, false));
      // yellowAnim.push(yt.animations.add('smile', [ 1], 1, false));
    }
    avatar = game.add.sprite(game.world.width / 2, game.world.height - 200, avatarArray[avatarType]);
    avatar.enableBody = true;
    game.physics.arcade.enable(avatar);
    //
    redgauge = game.add.sprite(game.world.width - 150, 500,  "rgauge");
    orangegauge = game.add.sprite(game.world.width - 150, 500,  "ogauge");
    greengauge = game.add.sprite(game.world.width - 150, 500,  "ggauge");
    // redgauge = game.add.sprite(game.world.width - 350, 500,  "rgauge");
    // orangegauge = game.add.sprite(game.world.width - 250, 500,  "ogauge");
    // greengauge = game.add.sprite(game.world.width - 150, 500,  "ggauge");
    redgauge.anchor.y= 1;
    orangegauge.anchor.y= 1;
    greengauge.anchor.y= 1;
    gaugeframe = game.add.sprite(game.world.width - 150, 50,  "frame");

    cursors = game.input.keyboard.createCursorKeys();
    //
    // angst = this.add.text(game.world.width - 300, 100, anxietyLevel, anxietyStyle);
    //
    goodSound = game.add.audio("good1");
    badSound = game.add.audio("bad1");
    goodSound.onStop.add(soundStoped, this);
    badSound.onStop.add(soundStoped, this);
  },

  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  /// END CREATE
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  update: function() {

    if (!testing) {
      // avatar.x = game.world.width - (sensorD * 2);
      avatar.x = calibratedSensor(game.world.width,sensorD);
      //
      // street.tilePosition.y -= streetRate;
      street1.y -= streetRate;
      street2.y -= streetRate;
      if(street1.y > game.world.height){

        street1.y= (game.world.height * -1)+2;
      }
      if(street2.y > game.world.height){
        street2.y= (game.world.height * -1)+2;
      }

      for (let i = 0; i < yellowArray.length; i++) {
        // yellowArray[i].y -= thingRate;
        yellowArray[i].y -= yellowSpeeds[i];
      }
      for (let i = 0; i < blueArray.length; i++) {
        // blueArray[i].y -= thingRate;
        blueArray[i].y -= blueSpeeds[i];
      }
      for (let i = 0; i < orangeArray.length; i++) {
        // orangeArray[i].y -= thingRate;
        orangeArray[i].y -= orangeSpeeds[i];
      }
    }else{
          // Move tilesprite position by pressing arrow keys
          if (cursors.left.isDown) {
            if (avatar.x >= 50) {
              avatar.x -= 8;
            }

          } else if (cursors.right.isDown) {
            if (avatar.x <= (game.world.width - 200)) {
              avatar.x += 8;
            }

          }

          if (cursors.up.isDown) {
            // street.tilePosition.y += 8;
            street1.y -= streetRate;
            street2.y -= streetRate;
            if(street1.y > game.world.height){

              street1.y= game.world.height * -1;
            }
            if(street2.y > game.world.height){
              street2.y= game.world.height * -1;
            }
            for (let i = 0; i < yellowArray.length; i++) {
              // yellowArray[i].y += 12;
              yellowArray[i].y -= yellowSpeeds[i];
            }
            for (let i = 0; i < blueArray.length; i++) {
              // blueArray[i].y += 12;
              blueArray[i].y -= blueSpeeds[i];
            }
            for (let i = 0; i < orangeArray.length; i++) {
              // orangeArray[i].y += 12;
              orangeArray[i].y -= orangeSpeeds[i];
            }

          }

    }
//
    game.physics.arcade.overlap(avatar, yellowGroup, yellowCrash, null, this);
    game.physics.arcade.overlap(avatar, blueGroup, blueCrash, null, this);
    game.physics.arcade.overlap(avatar, orangeGroup, orangeCrash, null, this);
//
    this.checkThings();
// a hacky windows work around :) - windows is not recognising the '-' symbol
    if(navigator.platform == "Win32"){
      // console.log("succsess");
      if(sensorT < triggerPosWin){
        // offRope = true;
        console.log("OFF  ROPE");
        this.checkRopeTime();
      }else {
        // offRope = false;
        console.log("ON  ROPE");
        ropeClock1 = Date.now();
      }

    }else{
      if(sensorT <triggerPos){
        // offRope = true;
        console.log("OFF  ROPE");
        this.checkRopeTime();
      }else {
        // offRope = false;
        console.log("ON  ROPE");
        ropeClock1 = Date.now();
      }
    }



    // if(sensorT < triggerPos{
    //   // offRope = true;
    //   console.log("OFF  ROPE");
    //   this.checkRopeTime();
    // }else if(sensorJ  triggerPos){
    //   // offRope = false;
    //   console.log("ON  ROPE");
    //   ropeClock1 = Date.now();
    // }


  },
  checkThings: function() {
    for (let i = 0; i < yellowArray.length; i++) {
      if (yellowArray[i].y > game.world.height + 150) {
        yellowArray[i].y = (game.world.randomY * spread);

        yellowArray[i].x = getRandomInt(leftPave,rightPave);
      }
    }
    //
    for (let i = 0; i < blueArray.length; i++) {
      if (blueArray[i].y > game.world.height + 150) {
        blueArray[i].y = (game.world.randomY * spread);
        // blueArray[i].x = game.world.randomX;
        blueArray[i].x = getRandomInt(leftPave,rightPave);
      }
    }
    //
    for (let i = 0; i < orangeArray.length; i++) {
      if (orangeArray[i].y > game.world.height + 150) {
        orangeArray[i].y = (game.world.randomY * spread);
        // orangeArray[i].x = game.world.randomX;
        orangeArray[i].x = getRandomInt(leftPave,rightPave);
      }
    }


    // angst.setText(anxietyLevel);
    this.setGauge();
  },
  setGauge: function(){
    let sc = anxietyLevel/100;
    redgauge.scale.setTo(1,sc);
    orangegauge.scale.setTo(1,sc);
    greengauge.scale.setTo(1,sc);
    //
    // redgauge.alpha = (0.5 -sc) ;
    // console.log("redgauge.alpha  = ",redgauge.alpha );
    // console.log("sc = ",sc );
    orangegauge.alpha = (1 -sc ) ;
    greengauge.alpha = (1 -(sc*1.5)) ;
  },
  checkRopeTime: function(){
    // console.log("OFF  ROPE");
    ropeClock2 = Date.now();
    let ropeDiff = ropeClock2 - ropeClock1 ;
    console.log(ropeDiff);
    if(ropeClock2 - ropeClock1 >= maxOffRope ){
      game.state.start('gameover');

    }
  }
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  // END UPDATE
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------



}
//
// function numberfy(sen) {
//   console.log("STRINGS");
//   if (sen === "I") {
//     console.log("stringI= ", stringI);
//     sensorI = parseFloat(stringI);
//     stringI = "";
//   } else if (sen === "J") {
//     console.log("stringJ= ", stringJ);
//     sensorJ = parseFloat(stringJ);
//     stringJ = "";
//   } else if (sen === "Q") {
//     console.log("stringQ= ", stringQ);
//     sensorK = parseFloat(stringQ);
//     stringQ = "";
//   } else if (sen === "D") {
//     console.log("stringD= ", stringD);
//     sensorD = parseFloat(stringD);
//     stringD = "";
//   }
//   //
//   console.log("FLOATS");
//   console.log(sensorI);
//   console.log(sensorJ);
//   console.log(sensorK);
// }
//
// function keyPress(char) {
//   //console.log(char);
//
//   switch (char) {
//     case "I":
//       toggleI = true;
//       //
//       toggleJ = false;
//       toggleQ = false;
//       toggleD = false;
//       break;
//     case "J":
//       toggleJ = true;
//       //
//       toggleI = false;
//       toggleQ = false;
//       toggleD = false;
//       break;
//     case "Q":
//       toggleQ = true;
//       //
//       toggleI = false;
//       toggleJ = false;
//       toggleD = false;
//       break;
//
//     case "D":
//       toggleD = true;
//       //
//       toggleI = false;
//       toggleJ = false;
//       toggleQ = false;
//       break;
//
//     case "0":
//     case "1":
//     case "2":
//     case "3":
//     case "4":
//     case "5":
//     case "6":
//     case "7":
//     case "8":
//     case "9":
//     case ".":
//     case "-":
//       if (toggleI) {
//         stringI += char
//       }
//       if (toggleJ) {
//         stringJ += char
//       }
//       if (toggleQ) {
//         stringQ += char
//       }
//       if (toggleD) {
//         stringD += char
//       }
//       break;
//
//     case "N":
//       if (toggleI) {
//         numberfy("I");
//       }
//       if (toggleJ) {
//         numberfy("J");
//       }
//       if (toggleQ) {
//         numberfy("Q");
//       }
//       if (toggleD) {
//         numberfy("D");
//       }
//
//       break;
//     default:
//       // code block
//       //console.log("other key");
//   }
//
//
// }



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
  // console.log(sensorJ);
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
      //       toggleT = true;
      //         //
      //       toggleD = false;
      //       toggleI = false;
      //       toggleJ = false;
      //       toggleQ = false;
      //       break;
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
      // if (toggleZ) {
      //   numberfy("Y");
      // }

      break;
    default:
      // code block
      //console.log("other key");
  }


}


function blueCrash(a, b) {
  console.log("blueCrash");
  if (avatarType === 0) {
    //blue
    //meh blu on blue

  } else if (avatarType === 1) {
    // yellow
    //yellow anxious of blue
    a.frame= 2;// make yellow avatar frown
    b.frame = 1;// make blue smile
    // a.animations.play("frown", true);
    // console.log("BLUE a ="  , a);
    // console.log("BLUE b ="  , b);

    anxietyLevel += 1;
    // goodSound.play();
    if(!badSoundPlaying){
      badSoundPlaying = true;
        badSound.play();
    }


  } else if (avatarType === 2) {
    //orange
    //blue anxious of orange
     a.frame = 1;// make orange avatar smile
     b.frame = 2;// make blue frown
    if(anxietyLevel > 0){
      anxietyLevel -= 1;
    }


    if(!goodSoundPlaying){
      goodSoundPlaying = true;
        goodSound.play();
    }
    // badSound.play();
  }
  anxCheck();
}

function yellowCrash(a, b) {

  console.log("yellowCrash");
  if (avatarType === 0) {
    //blue
    //yellow  affraid of blue
    a.frame = 1;// make blue avatar smile
    b.frame = 2;// make yellow frown
    if(anxietyLevel > 0){
      anxietyLevel -= 1;
    }

    if(!goodSoundPlaying){
      goodSoundPlaying = true;
        goodSound.play();
    }
  } else if (avatarType === 1) {
    //yellow
    //yellow on yellow

  } else if (avatarType === 2) {
    //ornage
    // yellow dominant over orange
    a.frame=2;// make orange avatar frown
    b.frame = 1;// make yellow smile
    anxietyLevel += 1;
    if(!badSoundPlaying){
      badSoundPlaying = true;
        badSound.play();
    }
  }
  anxCheck();
}

function orangeCrash(a, b) {
  console.log("orangeCrash");
  if (avatarType === 0) {
    //blue
    //orange dominant over blue
    a.frame = 2; // make blue frown
    b.frame = 1;// make orange smile
    if(!badSoundPlaying){
      badSoundPlaying = true;
        badSound.play();
    }
    anxietyLevel += 1;


  } else if (avatarType === 1) {
    //yellow
    //orange afraid of yellow
    a.frame = 1;// make yellow avatar smile
    b.frame = 2; // make orange frown
    // a.animations.play("smile", true);
    // console.log("ORANGE a ="  , a);
    // console.log("ORANGE b ="  , b);
    if(anxietyLevel > 0){
      anxietyLevel -= 1;
    }
    //
    if(!goodSoundPlaying){
      goodSoundPlaying = true;
        goodSound.play();
    }

  } else if (avatarType === 2) {
    //ornage

    //meh orang eon orane

  }
  anxCheck();
}
function soundStoped(sound){
  if(sound == goodSound){
    goodSoundPlaying = false;

  }else if(sound == badSound){
    badSoundPlaying = false;

  }
}
function getRandomFloat(min, max) {
  //
  return (Math.random() * (max - min) + min)-Math.random() ;
}
function getRandomInt(min, max) {
  //
  return Math.random() * (max - min) + min ;
}
function anxCheck(){
  if(anxietyLevel >= heartAttack){
    game.state.start('gameover');
  }

}
function calibratedSensor(screenWidth, sens){
console.log("calibratedSensor called");
  //cap the sensor readings
  if(sens > outerLimit){
    sens= outerLimit;
  }
  if(sens < innerLimit){
    sens = innerLimit;
  }
  //
  let streetWidth = screenWidth - (leftPave* 2);
  let swPercent= streetWidth/100; //1920 - 350 - 350 = 1220 / 100 = 12.2
  let sensorRange = outerLimit-innerLimit;// 3000 - 250 = 2750
  let sensOnePercent  = sensorRange/100; // 2750 / 100 = 27.5
  let livePercent = sens/sensOnePercent; // 250 / 27.7 = 9.025   //3000 / 27.5 = 109.09
  let relativePosition = livePercent * swPercent;//  9.026 * 12.2 = 110.1 // 109.09 *12.2 = 1330.89
  //

  if(sensorOrientation === "left"){
    console.log("relativePosition + leftPave = ",relativePosition + leftPave);
    return relativePosition + leftPave;

  }else if(sensorOrientation === "right"){

    console.log("relativePosition + leftPave = ",relativePosition + leftPave);
    return game.world.width - (relativePosition + leftPave);


    //this is wrong :)
    // return screenWidth - rightPave -relativePosition;
  }else{
  //  console.log("what the varuable batman!?");
  }

}
