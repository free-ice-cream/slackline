#include <ComponentObject.h>
#include <RangeSensor.h>
#include <SparkFun_VL53L1X.h>
#include <vl53l1_error_codes.h>
#include <vl53l1x_class.h>

//#include "Adafruit_VL53L0X.h"// swapping this sensor out for the 4m spark fun one
//
//Adafruit_VL53L0X lox = Adafruit_VL53L0X();

#include <Keyboard.h>


#include <Keyboard.h>

#include <Wire.h>
//#include "SparkFun_BNO080_Arduino_Library.h"
//BNO080 myIMU;
SFEVL53L1X distanceSensor;

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
//
bool started = false;

void setup()
{
  Wire.begin();
  Serial.begin(9600);

  if (distanceSensor.begin() == 0) //Begin returns 0 on a good init
  {
    Serial.println("Sensor online!");
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
//   VL53L0X_RangingMeasurementData_t measure;
//SMOOTHING
              // subtract the last reading:
  total = total - readings[readIndex];
              // read from the sensor:
  distanceSensor.startRanging(); //Write configuration bytes to initiate measurement
  int distance = distanceSensor.getDistance(); //Get the result of the measurement from the sensor
  distanceSensor.stopRanging();
//  Serial.print( "distance reads ");
//  Serial.println( distance);
//
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
if(writeStatus){
       Serial.println(writeStatus);
       if(!started){
        Keyboard.print("G");
        Keyboard.print("N");
        started=true;
       }
       
//    
      Keyboard.print("D");
//      Keyboard.print(measure.RangeMilliMeter);
      Keyboard.print(average);
      Keyboard.print("N");
      delay(keyDelay);//for stability
    }


  
}
