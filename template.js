var sketchProc = function(processingInstance){ with (processingInstance){
size(400, 400); 
frameRate(30);


var page = "Intro";

// A Boolean which prevents you from zipping through more than one level in case the level you are going to also uses button clicks.
var buttonPressed = false;
mouseClicked = function(){
    buttonPressed = false;
    mouseIsPressed = false;
};

var button = function(label,x,y,Width,Height,Color,link){
    pushStyle(); // preserve program settings
        fill(Color); // button color
        rect(x, y, Width, Height, 4); // draw button

        fill(255); // button text color
        textSize(20);
        textAlign(CENTER,CENTER);
        text(label, x + Width/2, y + Height/2); // label
    popStyle(); // restore previous program settings

// Collision Detection for Button
    if(mouseIsPressed && !buttonPressed){
        if(mouseX > x && mouseX < x + Width &&
            mouseY > y && mouseY < y + Height){
            page = link;
            buttonPressed = true;
        }
    }
};

draw = function() {

switch(page){
    case "Intro": // The Splash Screen of the program
        background(255);
        button("Start",150,150,100,60,color(255, 0, 0),"main");
        button("Instructions",140,250,120,60,color(0, 255, 0),"how to");
    break;
    
    case "main": /* Main Game or Program code goes here */
        background(136, 89, 255);
        textAlign(CENTER,CENTER);
        fill(255);
        text("Note how button is in the same place but is not\n activated again until mouse is released", 200, 100);
        
        button("Back",150,150,100,60,color(0, 0, 255),"Intro");
    break;
    
    case "how to": /* When in doubt, read the instructions */
        background(255, 170, 90);
        textAlign(CENTER,CENTER);
        fill(255);
        text("To use this program,\nclick the various buttons.\nDuh! ", 200, 100);
        
        button("Back",150,250,100,60,color(0, 0, 255),"plegh!");
    break;

    default: // If page === anything else, go here
        background(0);
        fill(255, 0, 0);
        textSize(20);
        text("Oh Great!\nNow you broke it!", 200, 150);
    break;
} // end switch

};


}};
