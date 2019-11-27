var introState3 = {


  create: function(){
    intro3 = game.add.sprite(0, 0,  "intro3");
    firstTime = Date.now();
    //
    game.input.keyboard.addCallbacks(this, null, null, bounce);

  },
  update: function(){
    secondTime = Date.now();
    diff = secondTime - firstTime;
    if( diff >= screenTime ){
      game.state.start('intro1');

    }
  }

}
function bounce(key){
  if(key === "G"){
    game.state.start('play');
  }

}
