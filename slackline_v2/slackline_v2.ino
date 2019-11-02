#include "Adafruit_VL53L0X.h"

Adafruit_VL53L0X lox = Adafruit_VL53L0X();

#include <Keyboard.h>


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
//  Serial.println();
//  Serial.println("BNO080 Read Example");

 //Serial.begin(115200);

  // wait until serial port opens for native USB devices
  while (! Serial) {
    delay(1);
  }
  
  Serial.println("Adafruit VL53L0X test");
  if (!lox.begin()) {
    Serial.println(F("Failed to boot VL53L0X"));
    while(1);
  }
  // power 
  Serial.println(F("VL53L0X API Simple Ranging example\n\n")); //
  //
  //
  //



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

//  if (myIMU.begin() == false)
//  {
//    Serial.println("BNO080 not detected at default I2C address. Check your jumpers and the hookup guide. Freezing...");
//    while (1);
//  }

  Wire.setClock(400000); //Increase I2C data rate to 400kHz

  myIMU.enableRotationVector(50); //Send data update every 50ms

  Serial.println(F("Rotation vector enabled"));
  Serial.println(F("Output in form i, j, k, real, accuracy"));

  pinMode(buttonPin, INPUT);    // declare pushbutton as input


}

void loop()
{
   VL53L0X_RangingMeasurementData_t measure;


   Serial.print("Reading a measurement... ");
  lox.rangingTest(&measure, false); // pass in 'true' to get debug data printout!

  if (measure.RangeStatus != 4) {  // phase failures have incorrect data
    Serial.print("Distance (mm): "); Serial.println(measure.RangeMilliMeter);
  } else {
    Serial.println(" out of range ");
  }
    
  delay(100);

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
       Serial.println(writeStatus);
//      Keyboard.print("I");
//      Keyboard.print(quatI, 2);
//      Keyboard.print("N");
//      delay(keyDelay);//for stability
//      Keyboard.print("J");
//      Keyboard.print(quatJ, 2);
//      Keyboard.print("N");
//      delay(keyDelay);//for stability
//      Keyboard.print("Q");
//      Keyboard.print(quatK, 2);
//      Keyboard.print("N");
//      delay(keyDelay);//for stability
      Keyboard.print("D");
      Keyboard.print(measure.RangeMilliMeter);
      delay(keyDelay);//for stability
    }else{
       // Serial.println(writeStatus);
    }

  }
  //keyboard for distance sensor
if(writeStatus){
       Serial.println(writeStatus);
//    
      Keyboard.print("D");
      Keyboard.print(measure.RangeMilliMeter);
      Keyboard.print("N");
      delay(keyDelay);//for stability
    }


  
}
