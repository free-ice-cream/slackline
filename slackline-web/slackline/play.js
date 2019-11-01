
var playState = {

  create: function() {



//TODO   refactor to use ascii codes
game.input.keyboard.addCallbacks(this, null, null, keyPress);





  },

  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  /// END CREATE
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  update: function() {


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
    break;
  case "J":
    toggleJ = true;
    //
    toggleI = false;
    toggleQ=false;
    break;
  case "Q":
      toggleQ = true;
      //
      toggleI = false;
      toggleJ = false;
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

      break;
  default:
    // code block
    //console.log("other key");
}


}
