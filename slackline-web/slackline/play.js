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

    cursors = game.input.keyboard.createCursorKeys();
    //
    angst = this.add.text(game.world.width - 300, 100, anxietyLevel, anxietyStyle);
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
      avatar.x = game.world.width - (sensorD * 2);
      //
      // street.tilePosition.y -= streetRate;
      street1.y -= streetRate;
      street2.y -= streetRate;
      if(street1.y > game.world.height){

        street1.y= game.world.height * -1;
      }
      if(street2.y > game.world.height){
        street2.y= game.world.height * -1;
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


    angst.setText(anxietyLevel);
  }
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  // END UPDATE
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------



}

function numberfy(sen) {
  console.log("STRINGS");
  if (sen === "I") {
    console.log("stringI= ", stringI);
    sensorI = parseFloat(stringI);
    stringI = "";
  } else if (sen === "J") {
    console.log("stringJ= ", stringJ);
    sensorJ = parseFloat(stringJ);
    stringJ = "";
  } else if (sen === "Q") {
    console.log("stringQ= ", stringQ);
    sensorQ = parseFloat(stringQ);
    stringQ = "";
  } else if (sen === "D") {
    console.log("stringD= ", stringD);
    sensorD = parseFloat(stringD);
    stringD = "";
  }
  //
  console.log("FLOATS");
  console.log(sensorI);
  console.log(sensorJ);
  console.log(sensorQ);
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
      break;
    case "J":
      toggleJ = true;
      //
      toggleI = false;
      toggleQ = false;
      toggleD = false;
      break;
    case "Q":
      toggleQ = true;
      //
      toggleI = false;
      toggleJ = false;
      toggleD = false;
      break;

    case "D":
      toggleD = true;
      //
      toggleI = false;
      toggleJ = false;
      toggleQ = false;
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
