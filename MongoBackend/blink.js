var Gpio = require('onoff').Gpio; //include onoff
var LED = new Gpio(4, 'out'); // use Gpio on pin 4 and specify that is is output
var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

function blinkLED() { //blinking function
  if (LED.readSync() === 0) { //Check if the pin is of (0)
    LED.writeSync(1); //set the pin tate to on (1)
  }else{
    LED.writeSync(0); // turn of LED
  }
}

function endBlink() { //function to stop blink
  clearInterval(blinkInterval); // stop intervals
  LED.writeSync(0); //turn of LED
  LED.unexport();
}

setTimeout(endBlink, 5000); //stop blink after 5 seconds
