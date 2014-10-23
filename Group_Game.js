var sketchProc = function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(30);

// Begin code here XXXXXXXXXXXXXXX

var page = "Intro";

//A Boolean which prevents you from zipping through more than one level in case the level you are going to also uses button clicks.
var buttonPressed = false;
var clicked = false;

mousePressed = function(){
 clicked = true;
};

mouseReleased = function(){
 buttonPressed = false;
 clicked = false;
};

var button = function(label,x,y,Width,Height,Color,link){
 pushStyle(); // preserve program settings
     stroke(0);
     fill(Color); // button color
     rect(x, y, Width, Height, 4); // draw button

     fill(255); // button text color
     textSize(20);
     textAlign(CENTER,CENTER);
     text(label, x + Width/2, y + Height/2); // label
 popStyle(); // restore previous program settings

//Collision Detection for Button
 if(clicked && !buttonPressed){
     if(mouseX > x && mouseX < x + Width &&
         mouseY > y && mouseY < y + Height){
         page = link;
         buttonPressed = true;
     }
 }
};

var teamCodeLogo = function(){
 noStroke();
 fill(217, 250, 255, 160);
 rect(2,2,55,55);
 fill(0, 100, 255, 160);
 rect(25,5,10,10);
 rect(15,15,10,10);
 rect(35,15,10,10);
 rect(25,25,10,10);
 rect(25,35,10,10);
 rect(15,45,10,10);
 rect(5,45,10,10);
 rect(35,45,10,10);
 rect(45,45,10,10);
};

textAlign(CENTER,0);
textSize(32);

draw = function() {

switch(page){
 case "Intro": // The Splash Screen of the program
     background(185, 54, 255);
     scale(0.5);
     teamCodeLogo();
     resetMatrix();
     
     fill(255);
     text("Team-Code\nGroup Project Game",200,65);
     button("Start",150,150,100,60,color(255, 0, 0),"main");
     button("Instructions",140,250,120,60,color(0, 255, 0),"how to");
 break;
 
 case "main": /* Main Game or Program code goes here */
     background(136, 89, 255);
     textAlign(CENTER,CENTER);
     fill(255);
     text("WIP", 200, 100);
     
     button("Back",150,150,100,60,color(0, 0, 255),"Intro");
 break;
 
 case "how to": /* When in doubt, read the instructions */
     background(255, 170, 90);
     textAlign(CENTER,CENTER);
     fill(255);
     text("TBA", 200, 100);
     
     button("Back",150,250,100,60,color(0, 0, 255),"Intro");
 break;

 default: // If page === anything else, go here
     background(0);
     fill(255, 0, 0);
     textSize(20);
     text("Game Over", 200, 150);
 break;
} // end switch

};

// code ends here XXXXXXXXXXXXX

}};
