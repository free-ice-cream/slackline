var gameover = {
  create: function() {

    // var topbanner = game.add.sprite(0,0, 'greenheadbg');
      // intro1 = game.add.sprite(0, 0,  "gameover1");
      flash = game.add.sprite((game.world.width/2) - 540, (game.world.height/2)- 125,  "gameoverflash").animations.add('flash', [ 0,1,2], 12, true).play();
      // flash.animations.add()
      //animations.add('start-hover', [ 1], 1, false);
    var newEnd = game.add.sprite(0, 0, 'anxEnd');
    // restartButt = game.add.sprite(386, 410, 'restart');
    //
    // restartButt.inputEnabled = true;
    // restartButt.events.onInputDown.add(this.ressel, this);
    // restartButt.events.onInputOver.add(this.reshover, this);
    // restartButt.events.onInputOut.add(this.resout, this);
    //

    //


    //var resultsScreen = game.add.sprite(0,0,'resultsScreen');
    this.gameOver();


    //

    //all audio butt stuff


    // speaker but



firstTime = Date.now();
  },
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------
  // END CREATE
  // ---------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------


  update: function() {
    secondTime = Date.now();
    diff = secondTime - firstTime;
    if( diff >= screenTime * 3 ){
      anxietyLevel = 0;
      game.state.start('intro1');

    }
  },

  gameOver: function() {



    // goTo1 = this.add.text(40, 187, goto1a + score + goto1b + spentTime + goto1c + roundedCicks + goto1d, collumOne);
    // goTo2 = this.add.text(40, 355, goto2a + fini + goto2c, collumOne);
    // goTo3 = this.add.text(418, 53, goto3, collumTwo);

  },


  ressel: function() {
    // gameReset();
    game.state.start('menu');
  },
  reshover: function() {
    restartButt.frame = 1;

  },
  resout: function() {
    restartButt.frame = 0;
  }
  //


};
//
//end of gameover state
//
