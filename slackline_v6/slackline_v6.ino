#include <ComponentObject.h>
#include <RangeSensor.h>
#include <SparkFun_VL53L1X.h>
#include <vl53l1_error_codes.h>
#include <vl53l1x_class.h>
#include <Keyboard.h>
#include <Wire.h>
//
#include "SparkFun_BNO080_Arduino_Library.h"
BNO080 myIMU;

SFEVL53L1X distanceSensor;


#define NUMBER_OF_SENSORS 2

int buttonPin = 7;
int pinVal = 0;
bool writeStatus = false;// are we writing keyboard commands or not
bool buttonToggle = true;
int keyDelay = 50; // a delay in writing to the keyboard to try to prevent a backlog of data being sent
int generalDelay = 100; //a general slowing of the system
//
int distanceLimit = 3000;// the max read distance of teh sensor. it actually reads greater distances but this is the safe limit
int innerLimit = 500;// inner maximum

//
//SMOOTHING
const int numReadings = 10;     // default 10
int readings[numReadings];      // the readings from the analog input
int readIndex = 0;              // the index of the current reading
int total = 0;                  // the running total
int average = 0;                // the average
int distance = 0;
//
float quatI ;
float quatJ ;
float quatK ;
float quatReal;
float quatRadianAccuracy;
//
//bool started = false;




void setup()
{
  Wire.begin();
  Serial.begin(9600);
  Wire.setClock(400000); //Increase I2C data rate to 400kHz


  
  for (byte x = 0 ; x < NUMBER_OF_SENSORS ; x++)
  {
    enableMuxPort(x); //Tell mux to connect to port X
    if(x==0){
      // ToF sensor on mux port 0
      if (distanceSensor.begin() == 0) //Begin returns 0 on a good init
      {
        Serial.println("Sensor online!");
      }
    }
    else if(x ==1){
       //IMU ensor on mux port 1
       if (myIMU.begin() == false)
        {
          Serial.println("BNO080 not detected at default I2C address. Check your jumpers and the hookup guide. Freezing...");
          while (1);
        }
        myIMU.enableRotationVector(50); //Send data update every 50ms
    
    }
 
    disableMuxPort(x);
  }
  
  
  Keyboard.begin();

  pinMode(buttonPin, INPUT);    // declare pushbutton as input

 //
  //SMOOTHING
  //
  for (int thisReading = 0; thisReading < numReadings; thisReading++) {
    readings[thisReading] = 0;
  }

}

void loop()
{
//SMOOTHING
              // subtract the last reading:
  total = total - readings[readIndex];

  
  for (byte x = 0 ; x < NUMBER_OF_SENSORS ; x++)
  {
    enableMuxPort(x); //Tell mux to connect to this port, and this port only
    if(x == 0){
      // ToF sensor on mux port 0
       // read from the sensor:
      distanceSensor.startRanging(); //Write configuration bytes to initiate measurement
      distance = distanceSensor.getDistance(); //Get the result of the measurement from the sensor
      distanceSensor.stopRanging();

    }else if (x == 1){
      //IMU ensor on mux port 1
      //Look for reports from the IMU
        if (myIMU.dataAvailable() == true)
        {
          quatI = myIMU.getQuatI();
          quatJ = myIMU.getQuatJ();
          quatK = myIMU.getQuatK();
          quatReal = myIMU.getQuatReal();
          quatRadianAccuracy = myIMU.getQuatRadianAccuracy();
        }
      //
    }
    

    disableMuxPort(x); //Tell mux to disconnect from this port
  }

  delay(1); //Wait for next reading


   
  readings[readIndex] = distance;
              // add the reading to the total:
  total = total + readings[readIndex];
              // advance to the next position in the array:
  readIndex = readIndex + 1;
              // if we're at the end of the array...
  if (readIndex >= numReadings) {
              // ...wrap around to the beginning:
    readIndex = 0;
  }

    
  delay(generalDelay);

  //turn write status on and off
  //
  pinVal = digitalRead(buttonPin);
  if(pinVal == HIGH && buttonToggle){
    writeStatus = !writeStatus;
    buttonToggle = false;
    Serial.print("writeStatus = ");
    Serial.println(writeStatus);
  }else if(pinVal == LOW){
    buttonToggle = true;
    //writeStatus = true;
    //Serial.println("writeStatus = true");
  }

  
  //keyboard for distance sensor
  average = total / numReadings;
  Serial.print("average = ");
  Serial.println(average);
Serial.print("I ");
Serial.println(quatI, 2);
Serial.print("J ");
Serial.println(quatJ, 2);
Serial.print("K ");
Serial.println(quatK, 2);
Serial.print("Real ");
Serial.println(quatReal, 2);


 
if(writeStatus){
       Serial.println(writeStatus);
//       if(!started){
//        Keyboard.print("G");
//        Keyboard.print("N");
//        started=true;
//       }
       
//    
      Keyboard.print("D");
//      Keyboard.print(measure.RangeMilliMeter);
      Keyboard.print(average);
      Keyboard.print("N");
      delay(keyDelay);//for stability
    }


  
}
