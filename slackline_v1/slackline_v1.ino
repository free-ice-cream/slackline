#include <Keyboard.h>

/*
  Using the BNO080 IMU

  By: Nathan Seidle
  SparkFun Electronics
  Date: December 21st, 2017
  License: This code is public domain but you buy me a beer if you use this and we meet someday (Beerware license).

  Feel like supporting our work? Buy a board from SparkFun!
  https://www.sparkfun.com/products/14586

  This example shows how to output the i/j/k/real parts of the rotation vector.
  https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation

  It takes about 1ms at 400kHz I2C to read a record from the sensor, but we are polling the sensor continually
  between updates from the sensor. Use the interrupt pin on the BNO080 breakout to avoid polling.

  Hardware Connections:
  Attach the Qwiic Shield to your Arduino/Photon/ESP32 or other
  Plug the sensor onto the shield
  Serial.print it out at 9600 baud to serial monitor.
*/

#include <Wire.h>

#include "SparkFun_BNO080_Arduino_Library.h"
BNO080 myIMU;

int buttonPin = 7;
int pinVal = 0;
bool writeStatus = false;// are we writing keyboard commands or not
bool buttonToggle = true;
int keyDelay = 50; // a delay in writing to the keyboard to try to prevent a backlog of data being sent


void setup()
{
  Serial.begin(9600);
  Serial.println();
  Serial.println("BNO080 Read Example");

  Wire.begin();
  Keyboard.begin();

  //Are you using a ESP? Check this issue for more information: https://github.com/sparkfun/SparkFun_BNO080_Arduino_Library/issues/16
  //  //=================================
  //  delay(100); //  Wait for BNO to boot
  //  // Start i2c and BNO080
  //  Wire.flush();   // Reset I2C
  //  IMU.begin(BNO080_DEFAULT_ADDRESS, Wire);
  //  Wire.begin(4, 5);
  //  Wire.setClockStretchLimit(4000);
  //  //=================================

  if (myIMU.begin() == false)
  {
    Serial.println("BNO080 not detected at default I2C address. Check your jumpers and the hookup guide. Freezing...");
    while (1);
  }

  Wire.setClock(400000); //Increase I2C data rate to 400kHz

  myIMU.enableRotationVector(50); //Send data update every 50ms

  Serial.println(F("Rotation vector enabled"));
  Serial.println(F("Output in form i, j, k, real, accuracy"));

  pinMode(buttonPin, INPUT);    // declare pushbutton as input


}

void loop()
{

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

  
  //Look for reports from the IMU
  if (myIMU.dataAvailable() == true)
  {
    float quatI = myIMU.getQuatI();
    float quatJ = myIMU.getQuatJ();
    float quatK = myIMU.getQuatK();
    float quatReal = myIMU.getQuatReal();
    float quatRadianAccuracy = myIMU.getQuatRadianAccuracy();

//    Serial.print(quatI, 2);
//    Serial.print(F(","));
//    Serial.print(quatJ, 2);
//    Serial.print(F(","));
//    Serial.print(quatK, 2);
//    Serial.print(F(","));
//    Serial.print(quatReal, 2);
//    Serial.print(F(","));
//    Serial.print(quatRadianAccuracy, 2);
//    Serial.print(F(","));

    // Serial.println();

    //keyboard
    if(writeStatus){
       // Serial.println(writeStatus);
      Keyboard.print("I");
      Keyboard.print(quatI, 2);
      Keyboard.print("N");
      delay(keyDelay);//for stability
      Keyboard.print("J");
      Keyboard.print(quatJ, 2);
      Keyboard.print("N");
      delay(keyDelay);//for stability
      Keyboard.print("Q");
      Keyboard.print(quatK, 2);
      Keyboard.print("N");
      delay(keyDelay);//for stability
      
    }else{
       // Serial.println(writeStatus);
    }

  }
}
