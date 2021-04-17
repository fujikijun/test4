/*
 * @name Interactivity 1
 * @frame 720,425
 * @description The circle changes color when you click on it.
 */

let ball;

// for red, green, and blue color values
let r, g, b;
let cnv;
let button;

let isTouch = false;
let motionData = [];
let orientationData = [];
let myCurrentSpeed = 0;
let myCurrentPosition = 0;

// ------------------------------------------------------------------------------
// Ball
// ------------------------------------------------------------------------------

class Ball
{
  constructor()
  {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.range = 32;
  }

  render()
  {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if ( this.x < -width/2+this.range )
    {
      this.x = this.range;
      this.xSpeed *= -0.4;
    }
    if ( this.y < -height/2+this.range)
    {
      this.y = this.range;
      this.ySpeed *= -0.4;
    }
    if ( this.x >= width/2-this.range )
    {
      this.x = width-this.range;
      this.xSpeed *= -0.4;
    }
    if ( this.y >= height/2-this.range )
    {
      this.y = height-this.range;
      this.ySpeed *= -0.4;
    }
    fill( r, g, b );
    ellipse( this.x, this.y, this.range*2, this.range*2 );
  }
}

// ------------------------------------------------------------------------------
// ClickRequestDeviceSensor
// ------------------------------------------------------------------------------

//. iOS 13 対応 : https://bagelee.com/webar-vr/ios13-webar-webvr/
//.             : https://qiita.com/nakakaz11/items/a9be602874bd54819a18
function ClickRequestDeviceSensor()
{
  //. ユーザーに「許可」を明示させる必要がある

  DeviceOrientationEvent.requestPermission().then( function( response ) {
    if ( response === 'granted' ) {
      window.addEventListener( "deviceorientation", deviceOrientation );
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
      window.addEventListener( "devicemotion", deviceMotion );
      //$('#sensorrequest').css( 'display', 'none' );
      //$('#cdiv').css( 'display', 'block' );
    }
  }
  ).catch( function( e ) {
    console.log( e );
  }
  );

  //r = random(255);
  //g = random(255);
  //b = random(255);
}

// ------------------------------------------------------------------------------
// deviceMotion
// ------------------------------------------------------------------------------

function deviceMotion( e )
{
  e.preventDefault();
  //if( isTouch )
  {
    var ac = e.acceleration;
    var acg = e.accelerationIncludingGravity;
    var rot = e.rotationRate;

    r = 0;
    //r = e.acceleration.x*60+127;
    g = e.acceleration.y*60+127;
    //b = e.accelerationIncludingGravity.z*60+127;
    b = 0;
    myCurrentSpeed += e.acceleration.y;
    myCurrentPosition += myCurrentSpeed;

    ball.xSpeed += e.accelerationIncludingGravity.x*0.1;
    ball.ySpeed -= e.accelerationIncludingGravity.y*0.1;
  }
}

// ------------------------------------------------------------------------------
// deviceOrientation
// ------------------------------------------------------------------------------

function deviceOrientation( e )
{
  e.preventDefault();
  //if( isTouch )
  {
    var gamma = e.gamma; //. Left/Right
    var beta = e.beta;   //. Front/Back
    var alpha = e.alpha; //. Direction

    //r = 255;
    //g = e.beta*100+60;
    //b = e.gamma*100+60;
  }
}

// ------------------------------------------------------------------------------
// setup
// ------------------------------------------------------------------------------

function setup() {

  button = createButton('start');
  //button.positon( 0, 0 );
  button.mousePressed( startApp );

  cnv = createCanvas( 400, 400, WEBGL );
  cnv.id('mycanvas');
  cnv.position( (windowWidth-width)/2, (windowHeight-height)/2 );

  // Pick colors randomly
  r = random(255);
  g = random(255);
  b = random(255);

  ball = new Ball();
}

// ------------------------------------------------------------------------------
// draw
// ------------------------------------------------------------------------------

function draw()
{
  background(127, 255, 127);
  // Draw a circle
  /*
  strokeWeight(2);
   stroke(r, g, b);
   fill(r, g, b);
   ellipse(360, 200, 200, 200);
   */
  ball.render();

  fill( 0 );
  text( myCurrentPosition, 20, 100 );
}

// ------------------------------------------------------------------------------
// mousePressed
// ------------------------------------------------------------------------------

// When the user clicks the mouse
function mousePressed()
{  
  // Check if mouse is inside the circle
  let d = dist(mouseX, mouseY, ball.x, ball.y);
  if (d < 100) {
    // Pick new random color values
    r = random(255);
    g = random(255);
    b = random(255);
  }
}

// ------------------------------------------------------------------------------
// startApp
// ------------------------------------------------------------------------------

function startApp()
{
  ClickRequestDeviceSensor();

  //button.remove(); //hide
}