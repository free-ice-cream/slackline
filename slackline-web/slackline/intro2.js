var introState2 = {


  create: function(){
    intro2 = game.add.sprite(0, 0,  "intro2");
    firstTime = Date.now();
    //
    game.input.keyboard.addCallbacks(this, null, null, bounce);

  },
  update: function(){
    secondTime = Date.now();
    diff = secondTime - firstTime;
    if( diff >= screenTime ){
      game.state.start('intro3');

    }
  }

}
function bounce(key){
  if(key === "G"){
    game.state.start('play');
  }

}
