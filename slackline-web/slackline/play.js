
var playState = {

  create: function() {
game.stage.backgroundColor = backgroundColour;

game.input.keyboard.addCallbacks(this, null, null, keyPress);

street = game.add.tileSprite(0,0,1920,1080,"street");


yellowGroup = game.add.group();
blueGroup = game.add.group();
orangeGroup = game.add.group();

yellowGroup.enableBody = true;
blueGroup.enableBody = true;
orangeGroup.enableBody = true;

for(let i =0; i<=groupSize ; i++){
  yt = yellowGroup.create(game.world.randomX, (game.world.randomY * spread), "yellowthing")
  bt = blueGroup.create(game.world.randomX, (game.world.randomY * spread), "bluething")
  ot = orangeGroup.create(game.world.randomX, (game.world.randomY * spread), "orangething")
  //
  yellowArray.push(yt);
  blueArray.push(bt);
  orangeArray.push(ot);
}

avatar = game.add.sprite(game.world.width/2, game.world.height-150,'bluething');

cursors = game.input.keyboard.createCursorKeys();
  },

  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  /// END CREATE
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  update: function() {
    if(!testing){
      avatar.x = sensorD /2;
    }


    // Move tilesprite position by pressing arrow keys
   if (cursors.left.isDown)
   {
     if(avatar.x >=50){
       avatar.x -= 8;
     }

   }
   else if (cursors.right.isDown)
   {
     if(avatar.x <= (game.world.width -200)){
       avatar.x += 8;
     }

   }

   if (cursors.up.isDown)
   {
       street.tilePosition.y += 8;

       for(let i =0;i<yellowArray.length; i++){
         yellowArray[i].y +=12;
       }
       for(let i =0;i<blueArray.length; i++){
         blueArray[i].y +=12;
       }
       for(let i =0;i<orangeArray.length; i++){
         orangeArray[i].y +=12;
       }
       // yellowGroup.y +=12;
       // blueGroup.y +=12;
       // orangeGroup.y =12;
   }
   else if (cursors.down.isDown)
   {
       street.tilePosition.y -= 8;
       yellowGroup.y -=12;
       blueGroup.y -=12;
       orangeGroup.y -=12;
   }
   this.checkThings();

},
checkThings: function(){
  for (let i = 0; i < yellowArray.length; i++) {
    if(yellowArray[i].y > game.world.height+150){
      yellowArray[i].y =  (game.world.randomY * spread);
      yellowArray[i].x = game.world.randomX;
    }
  }
  //
  for (let i = 0; i < blueArray.length; i++) {
    if(blueArray[i].y > game.world.height+150){
      blueArray[i].y =  (game.world.randomY * spread);
      blueArray[i].x = game.world.randomX;
    }
  }
  //
  for (let i = 0; i < orangeArray.length; i++) {
    if(orangeArray[i].y > game.world.height+150){
      orangeArray[i].y =  (game.world.randomY * spread);
      orangeArray[i].x = game.world.randomX;
    }
  }
}
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  // END UPDATE
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------



}
function numberfy(sen){
console.log("STRINGS");
if(sen === "I"){
  console.log("stringI= ",stringI);
  sensorI = parseFloat(stringI);
  stringI="";
}else if(sen === "J"){
  console.log("stringJ= ",stringJ);
  sensorJ = parseFloat(stringJ);
  stringJ="";
}else if(sen === "Q"){
  console.log("stringQ= ",stringQ);
  sensorQ = parseFloat(stringQ);
  stringQ="";
}else if(sen === "D"){
  console.log("stringD= ",stringD);
  sensorD = parseFloat(stringD);
  stringD="";
}
  //
  console.log("FLOATS");
  console.log(sensorI);
  console.log(sensorJ);
  console.log(sensorQ);
}
function keyPress(char) {
//console.log(char);

switch(char) {
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
    toggleQ=false;
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
        if(toggleI){
          stringI += char
        }
        if(toggleJ){
          stringJ += char
        }
        if(toggleQ){
          stringQ += char
        }
        if(toggleD){
          stringD += char
        }
    break;

    case "N":
    if(toggleI){
      numberfy("I");
    }
    if(toggleJ){
      numberfy("J");
    }
    if(toggleQ){
      numberfy("Q");
    }
    if(toggleD){
      numberfy("D");
    }

      break;
  default:
    // code block
    //console.log("other key");
}


}
