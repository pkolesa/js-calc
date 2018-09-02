/* global vars */
var result = 0;
var displayVal = 0;


/* assign actions to elements */

{

}
let digitButtons = document.getElementsByClassName("digit");
let len = digitButtons.length;

//console.log("A");

for(i = 0; i < len; i++) {
    let num = digitButtons[i].textContent;
    //console.log("Adding listener to " + num);
    digitButtons[i].addEventListener("click", function() {pressed(num)});
}



display();

function pressed(num) {
// let num = document.getElementById("7").textContent;
    //alert("Hello World! " + num);
    if(displayVal === 0) {
        displayVal = "";
    } 
    
    displayVal += num;
    display();

}

function display() {
    document.getElementById("result").textContent=displayVal;
} 