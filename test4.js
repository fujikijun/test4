/*
 * @name Interactivity 1
 * @frame 720,425
 * @description The circle changes color when you click on it.
 */

// for red, green, and blue color values
let r, g, b;
let cnv;
let button;

var isTouch = false;
var motionData = [];
var orientationData = [];

//. iOS 13 対応 : https://bagelee.com/webar-vr/ios13-webar-webvr/
//.             : https://qiita.com/nakakaz11/items/a9be602874bd54819a18
function ClickRequestDeviceSensor() {
  //. ユーザーに「許可」を明示させる必要がある
  DeviceOrientationEvent.requestPermission().then( function( response ) {
    if ( response === 'granted' ) {
      window.addEventListener( "deviceorientation", 
        function( e )
      {
        var gamma = e.gamma; //. Left/Right
        var beta = e.beta;   //. Front/Back
        var alpha = e.alpha; //. Direction

        r = ac;
        g = acg;
        b = 0;
      });
      //$('#sensorrequest').css( 'display', 'none' );
      //$('#cdiv').css( 'display', 'block' );
    }
  }
  ).catch( function( e ) {
    console.log( e );
  }
  );

  DeviceMotionEvent.requestPermission().then( function( response ) {
    if ( response === 'granted' ) {
      cnv.addEventListener( "devicemotion", deviceMotion );
      //$('#sensorrequest').css( 'display', 'none' );
      //$('#cdiv').css( 'display', 'block' );
    }
  }
  ).catch( function( e ) {
    console.log( e );
  }
  );
}

function deviceMotion( e ) {
  e.preventDefault();
  //if( isTouch )
  {
    var ac = e.acceleration;
    var acg = e.accelerationIncludingGravity;
    var rot = e.rotationRate;

    r = ac;
    g = 0;
    b = rot;
  }
}
function deviceOrientation( e ) {
  e.preventDefault();
  //if( isTouch )
  {
    var gamma = e.gamma; //. Left/Right
    var beta = e.beta;   //. Front/Back
    var alpha = e.alpha; //. Direction

    r = ac;
    g = acg;
    b = 0;
  }
}

function setup() {

  button = createButton('start');
  //button.positon( 0, 0 );
  button.mousePressed( startApp );

  cnv = createCanvas(720, 400);
  cnv.id('mycanvas');
  cnv.position( (windowWidth-width)/2, (windowHeight-height)/2 );

  // Pick colors randomly
  r = random(255);
  g = random(255);
  b = random(255);
}

function draw() {
  background(255, 255, 255); 
  // Draw a circle
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  ellipse(360, 200, 200, 200);
}

// When the user clicks the mouse
function mousePressed()
{  
  // Check if mouse is inside the circle
  let d = dist(mouseX, mouseY, 360, 200);
  if (d < 100) {
    // Pick new random color values
    r = random(255);
    g = random(255);
    b = random(255);
  }
}

function startApp()
{
  ClickRequestDeviceSensor();
  r = random(255);
  g = random(255);
  b = random(255);
  //button.remove(); //hide
}