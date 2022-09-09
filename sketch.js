// "use strict";
let cnv;
let cover,backcover,pageI,pageII;
let easycam;
let strCount = 0;
let str = ["回家鄉工作一直像是一個夢想","但我","並不是想一直待在我的家","我是希望","想陪伴家人的時候","我就能在家鄉","。"];
let boxSize = 3;
var state,viewport;


function preload() {
  cover=loadImage("00.png");
  backcover=loadImage("01.png");
  pageI=loadImage("02.png");
  pageII=loadImage("03.png");
}

function setup() {
  cnv = createCanvas(windowHeight, windowHeight,WEBGL);
  imageMode(CENTER);
  noStroke();

  easycam = createEasyCam({
    distance: 1800,
    center: [0, 0, 0]
  });
    easycam.setDistanceMin(300);
    easycam.setDistanceMax(2700);

    state = easycam.getState();
    // state.distance = (1800-windowWidth > 900) ? 1800-windowWidth : 900;
    print("size:",windowWidth,windowHeight);
    if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      print("system: mobile.");
      state.distance = 600;
    } else { 
      print("system: desktop.");
      state.distance = 450;
    }
    _state = state;
    // print(state.distance);
    print("thank you");
    viewport = easycam.getViewport();
    // print(viewport[1]);
    // easycam.removeMouseListeners();
    // easycam.attachMouseListeners();

    button = createButton("Just ! Read ! Me !");
    button.mousePressed(userClick);
    button.size(198, 36);
    button.position(windowWidth/2 - 99, windowHeight*0.93);

}

let count = 0;
let reset = false;
let open = 0;

function draw() {
    
    clickTrip();
    background('#ffc331');

    translate(0,hFix,0);
    rotateY(radians(count*0.2));
    // _state = state;
    // _state.rotation[2] -= count/1000.0;
    // // print(_state.rotation[0]);
    // easycam.setState(_state, 1);
    // // print(easycam.getState().rotation[0]);
    
    if(reset){
        count -= count/10;
        hFix += (300 - hFix)/10;
        if(count < 3 && hFix>297){
            reset =false;
            open = 1;
            // print("RESET");
        }
    }else if(open == 0){
        hFix = (hFix > 1) ?  hFix+(0 - hFix)/10 : hFix;
        count ++;
    
    }

    push();
    // fill('#e6daa8');
    fill(0);
    // let _f = pageI.height/cover.height;
    translate(0,-210,0);
    box(200,300*0.9,boxSize*2*0.9);
    pop();
    

    let _w = 1000;
    let _h = cover.height/(pageI.width/_w); //500
    let __f = -0.6;

    if(open == 0){
        push();
        texture(cover);
        // texture(pageI);
        let _f = pageI.height/cover.height;
        translate(0,_h*_f*__f,boxSize);
        // translate(0,500*4397/2237*-0.25,boxSize);
        plane(_w, _h);
        pop();
    }else if(open == 1){
        push();
        // texture(cover);
        texture(pageI);
        // translate(0,0,boxSize);
        let _f = pageI.height/cover.height;
        translate(0,_h*_f*__f,boxSize);
        plane(_w, _f*_h);
        pop();
    }else if(open == 2){
        push();
        // texture(cover);
        texture(pageII);
        // translate(0,0,boxSize);
        let _f = pageII.height/cover.height;
        translate(0,_h*_f*__f,boxSize);
        plane(_w, _h*_f);
        pop();
    }
    
    push();
    let _f = pageI.height/cover.height;
    translate(0,_h*_f*__f,-1*boxSize);
    rotateY(radians(180));
    texture(backcover);
    plane(_w, _h);
    pop();

    

    if(frameCount%90==0){
        print(str[strCount%str.length]);
        strCount += 1;
    }

}

function windowResized() {
  resizeCanvas(windowHeight, windowHeight);
}

let hFix = 0;

function keyPressed() {
    userClick(); 
}

let clickCount = 0; 
let clickTimer = 100; 
let clickTimerMax = 100; 

function clickTrip(){
  if(clickCount > 0){
    clickTimer --;
    // print(clickTimer);
    if(clickTimer == 0){
      clickTimer = clickTimerMax;
      clickCount = 0;
    }
  }
}

  function userClick() {
    if(open ==0){
        reset =true;
    // open =1;
        easycam.setState(state, 2000);
        // easycam.removeMouseListeners();
    }else if(open==1){
        open = 2;
    }else if(open==2){
        open = 0;
        // easycam.attachMouseListeners();
        let _s = JSON.parse(JSON.stringify(state));
        // print(_s);
        _s.distance = 2700;
        easycam.setState(_s, 2000);
    }

  }