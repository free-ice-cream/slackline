var introState1 = {


  create: function(){
    intro1 = game.add.sprite(0, 0,  "intro1");
    firstTime = Date.now();
    //
    game.input.keyboard.addCallbacks(this, null, null, bounce);

  },
  update: function(){
    secondTime = Date.now();
    diff = secondTime - firstTime;
    if( diff >= screenTime ){
      game.state.start('intro2');

    }
  }

}
function bounce(key){
  if(key === "G"){
    game.state.start('play');
  }

}
