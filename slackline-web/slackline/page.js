aboutPop =  function(){
  // console.log("aboutPop");
  projectOff();
   document.getElementById("aboutOverlay").style.display = "block";
    typeWriter() ;
}
aboutOff =  function(){
  // console.log("aboutPop");
   document.getElementById("aboutOverlay").style.display = "none";
}

projectPop =  function(){
   console.log("aboutPop");
   document.getElementById("projectOverlay").style.display = "block";
   // typeWriter() ;
}
projectOff =  function(){
  // console.log("aboutPop");
  aboutOff();
   document.getElementById("projectOverlay").style.display = "none";
}
calPop = function(s){
  console.log("s= "+s);
  document.getElementById("calendarOverlay").style.display = "block";
  // document.querySelector('.new-cal').appendChild(myCalendar);


  myCalendar = createCalendar({
   options: {
     class: 'my-class',
     id: 'my-id'                               // You need to pass an ID. If you don't, one will be generated for you.
   },
   data: {
     title: 'count to a million',     // Event title
     // start: new Date('June 15, 2019 19:00'),   // Event start date
     start: new Date(s),
     duration: 120,                            // Event duration (IN MINUTES)
     // end: new Date('June 15, 2019 23:00'),     // You can also choose to set an end time.
                                               // If an end time is set, this will take precedence over duration
     address: 'The internet',
     description: 'thats how long it took you to coun to one million'
   }
   }),

   document.querySelector('.new-cal').appendChild(myCalendar);
}
calPopOff = function(){
  document.getElementById("calendarOverlay").style.display = "none";
}
//some vars to track the lenght of the strings.

var a1 = 0;
var a2 = 0;
var a3 = 0;
var a4 = 0;
//
var p1 = 0;
var p2 = 0;
var p3 = 0;
var p4 = 0;

var projectTxt1 = " Slackline bla bla bla";
var projectTxt2 =  "Balanicing acts ....";
var projectTxt3 = "trust bla bla blah";
// var projectTxt4 =
var hats="beret";

var speed = 20; /* The speed/duration of the effect in milliseconds */
//
var myCalendar;// a var for the calendar object
var ficurl="";

typeWriter = function () {
  if (a1 < projectTxt1.length) {
    document.getElementById("a1").innerHTML += projectTxt1.charAt(a1);
    a1 ++;
    setTimeout(typeWriter, speed);
  }else if(a2 < projectTxt2.length){
    document.getElementById("a2").innerHTML += projectTxt2.charAt(a2);
    a2++;
    setTimeout(typeWriter, speed);
  }else if(a3 < projectTxt3.length){
    document.getElementById("a3").innerHTML += projectTxt3.charAt(a3);
    a3++;
    setTimeout(typeWriter, speed);
  }
}
