
var loadState = {
  preload: function (){
    console.log('loadState');
    // images
    // game.load.image('hex', ficurl+'assets/hexgrid-cross2.png');
    // game.load.image('icehex', ficurl+'assets/icy-hexgrid-v1.png');
    //
    game.load.image('bar', ficurl+'assets/bar.png');

    game.load.image('logo', ficurl+'assets/Nano Go Logo v1.png');



    game.load.image('blue-power-up', ficurl+'assets/blue-power-up.png');
    game.load.image('heart', ficurl+'assets/heart2.png');

    // game.load.image('heatsheildmeter', ficurl+'assets/heatsheildmeter_v1.png');
    //
    // game.load.image('racegauge', ficurl+'assets/racegauge-v5.png');
    // game.load.image('finishline', ficurl+'assets/finishline.png');
    //
    // THERMOMETER PARTS
    // //
    // game.load.image('therm-frame', ficurl+'assets/therm-frame-2.png');
    // game.load.image('freeze', ficurl+'assets/freeze-frame.png');
    // game.load.image('stripe0', ficurl+'assets/stripe 0.png');
    // game.load.image('stripe1', ficurl+'assets/stripe 1.png');
    // game.load.image('stripe2', ficurl+'assets/stripe 2.png');
    // game.load.image('stripe3', ficurl+'assets/stripe 3.png');
    // game.load.image('stripe4', ficurl+'assets/stripe 4.png');
    // game.load.image('stripe5', ficurl+'assets/stripe 5.png');
    // game.load.image('stripe6', ficurl+'assets/stripe 6.png');
    // game.load.image('stripe7', ficurl+'assets/stripe 7.png');
    // game.load.image('stripe8', ficurl+'assets/stripe 8.png');
    // game.load.image('stripe9', ficurl+'assets/stripe 9.png');
    // game.load.image('stripe10', ficurl+'assets/stripe 10.png');
    // game.load.image('stripe11', ficurl+'assets/stripe 11.png');
    // game.load.image('stripe12', ficurl+'assets/stripe 12.png');
    // game.load.image('stripe13', ficurl+'assets/stripe 13.png');
    // game.load.image('stripe14', ficurl+'assets/stripe 14.png');
    // game.load.image('stripe15', ficurl+'assets/stripe 15.png');
    // game.load.image('stripe16', ficurl+'assets/stripe 16.png');
    // game.load.image('stripe17', ficurl+'assets/stripe 17.png');
    // game.load.image('stripe18', ficurl+'assets/stripe 18.png');
    // game.load.image('stripe19', ficurl+'assets/stripe 19.png');
    // game.load.image('stripe20', ficurl+'assets/stripe 20.png');
    // game.load.image('stripe21', ficurl+'assets/stripe 21.png');
    // game.load.image('stripe22', ficurl+'assets/stripe 22.png');
    // game.load.image('stripe23', ficurl+'assets/stripe 23.png');
    // game.load.image('stripe24', ficurl+'assets/stripe 24.png');
    // game.load.image('stripe25', ficurl+'assets/stripe 25.png');
    // game.load.image('stripe26', ficurl+'assets/stripe 26.png');
    // game.load.image('stripe27', ficurl+'assets/stripe 27.png');
    // game.load.image('stripe28', ficurl+'assets/stripe 28.png');
    // game.load.image('stripe29', ficurl+'assets/stripe 29.png');
    // game.load.image('stripe30', ficurl+'assets/stripe 30.png');
    // game.load.image('stripe31', ficurl+'assets/stripe 31.png');
    // game.load.image('stripe32', ficurl+'assets/stripe 32.png');
    // game.load.image('stripe33', ficurl+'assets/stripe 33.png');
    // game.load.image('stripe34', ficurl+'assets/stripe 34.png');
    // game.load.image('stripe35', ficurl+'assets/stripe 35.png');
    // game.load.image('stripe36', ficurl+'assets/stripe 36.png');
    // game.load.image('stripe37', ficurl+'assets/stripe 37.png');
    // game.load.image('stripe38', ficurl+'assets/stripe 38.png');
    // game.load.image('stripe39', ficurl+'assets/stripe 39.png');
    // game.load.image('stripe40', ficurl+'assets/stripe 40.png');
    // game.load.image('stripe41', ficurl+'assets/stripe 41.png');
    // game.load.image('stripe42', ficurl+'assets/stripe 42.png');
    // game.load.image('stripe43', ficurl+'assets/stripe 43.png');
    // game.load.image('stripe44', ficurl+'assets/stripe 44.png');
    // game.load.image('stripe45', ficurl+'assets/stripe 45.png');
    // game.load.image('stripe46', ficurl+'assets/stripe 46.png');
    // game.load.image('stripe47', ficurl+'assets/stripe 47.png');
    //



    //SPRITESHEETS
    // game.load.spritesheet('ministartss',ficurl+'assets/mini-start-546-103.png',268,103);
    // game.load.spritesheet('tutbut','assets/howtoplayspritesheet-620-310.png',308,310);
    // game.load.spritesheet('startSeq','assets/startspritesheet_v4.png', 306,310);
    game.load.spritesheet('startSeq','assets2/start3.png', 434,144);
    game.load.spritesheet('gameoverflash','assets2/gameover_ss_v2.png', 1080,250);

  //and some AUDIO
  game.load.audio('rev', 'assets/car-2.mp3');
  game.load.audio('theme', 'assets/maintrack4.mp3');
  game.load.audio('death','assets/hero-death-00.mp3');
  game.load.audio('win','assets/win.mp3');
  game.load.audio('bass-loop','assets/bass-loop2.mp3')
  game.load.audio('endlich', 'assets/endlich_v3.mp3');
  game.load.audio('swipe', 'assets/car-3.mp3');
  game.load.audio('power-up-blips', 'assets/power-up-blips.mp3');
  game.load.audio('fall-sfx', 'assets/fall_v1.mp3');
  //
  game.load.audio('bad1', 'audio/bad 1.mp3');
  game.load.audio('good1', 'audio/happy 1.mp3');





  game.load.spritesheet('bluething','assets2/bluething3.png', 150,150)
  game.load.spritesheet('yellowthing','assets2/yellowthing3.png', 150,150)
  game.load.spritesheet('orangething','assets2/orangething4.png', 150,150)

  game.load.image('street', 'assets2/street4.png');
  game.load.image('intro1', 'assets2/intro1_v1.jpg');
  game.load.image('intro2', 'assets2/intro2_v1.jpg');
  game.load.image('intro3', 'assets2/intro3_v1.jpg');
  //
  game.load.image('frame', 'assets2/frame_v2.png');
  game.load.image('ggauge', 'assets2/green_v2.png');
  game.load.image('ogauge', 'assets2/orange_v2.png');
  game.load.image('rgauge', 'assets2/red_v2.png');

game.load.image('gameover1', 'assets2/gameover_v1.jpg');
game.load.image('gameover2', 'assets2/gameover_v1.jpg');
  },
  create: function(){

    game.state.start('menu');
  }


};
