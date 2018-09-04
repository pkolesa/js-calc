/* global vars */
var result = 0;
var displayVal = 0;
var stack = [];

const THOUSAND_SEPARATOR = ','
const DECIMAL_SEPARATOR = "."

/* DEFINE OPERATIONS */

const ADD = {name: "+", operation: function(a,b) { return parseFloat(a) + parseFloat(b); }};


/* assign actions to buttons and init calc */

{
    initClear();
    initBasicOperations();
    initDigits();



    display();

    function initDigits() {
        let digitButtons = document.getElementsByClassName("digit");
        let len = digitButtons.length;
        //console.log("A");
        for (i = 0; i < len; i++) {
            let num = digitButtons[i].textContent;
            //console.log("Adding listener to " + num);
            digitButtons[i].addEventListener("click", function () { pressed(num); });
        }
    }

    function initClear() {
        document.getElementById("ce").addEventListener("click", pushedCE);
        document.getElementById("backspace").addEventListener("click", pushedBackspace);
    }

    function initBasicOperations() {
        document.getElementById("plus").addEventListener("click", function() { processOp(ADD); });
        document.getElementById("result").addEventListener("click", pushedResult);
    }

}

function pressed(num) {
    if(displayVal === 0 || rewrite === true) {
        displayVal = "";
    } 
   
    displayVal += num;
    display();

}

function pushedCE() {
    // clear display
    displayVal = 0;
    rewrite = false;
    result = 0;
    display();
}

function pushedBackspace() {
    if(rewrite === ture) {return;}
    displayVal = ('' +  displayVal).slice(0, -1);
    if(displayVal.length <= 0) {
        displayVal = 0;
    }
    display();
}

function display() {
    let formatedValue = format(parseInt(displayVal))
                        + getDecimalPart(displayVal); // decimal part is not formaterd

    document.getElementById("display").textContent = formatedValue;
} 


/**
 * Takes an integer and returns a string representing that integer formated with thousands separated. E.g. 1234567 becomes 1,234,567.
 */
function format(integer) {
    // TODO: for now assume integer has no decimal part. This needs to be tested in the future
    const THOUSANDS = 3;
    let result = '';
    let intStr = '' + integer

    let digits = intStr.length % THOUSANDS;
    digits = digits != 0 ? digits : THOUSANDS; // if number of digits can be divided by 3, process first the digits (instead of 1) 
    for( i = 0; i < intStr.length;) {
        result += intStr.slice(i, i + digits);
        result += THOUSAND_SEPARATOR;
        i += digits;
        digits = THOUSANDS;
    }

    return result.slice(0, 0-(THOUSAND_SEPARATOR.length));

}

/**
 * 
 * @param {*} intString decimal part as a string. If non empty, function returns that string with prepended decimal separator.
 * If intString is empty, function returs empty string. 
 */
function decimalSeparator(intString) {
    if(intString === '') {
        return '';
    } else {
        return DECIMAL_SEPARATOR + intString;
    }
}

/**
 * 
 * @param {*} number If number has any decimal part, it is returned. If not, empty string is returned. 
 * If number contais decimal point, but has no decimal part, only that decimal point is retunred (this scenario happens 
 * user pushes . button in UI). 
 */
function getDecimalPart(number) {
    let decimalPart = (number + '').split(DECIMAL_SEPARATOR)[1]; // 2nd chunk is decimal part, if present
    if(decimalPart === undefined) {
        // if number contais decimal point, return it
        if(('' + number).indexOf(DECIMAL_SEPARATOR) > -1) {
            return DECIMAL_SEPARATOR;
        } else {
            return '';
        }
    } else {
        return DECIMAL_SEPARATOR + decimalPart;
    }
}

function pushedResult() {
    if(stack.length == 0) { return }
    stack.push(displayVal);
    evaluate();
    displayVal = stack.pop();
    display();
}

function processOp(operation) {
    stack.push(displayVal);
    stack.push(operation);
    rewrite = true;
}

function evaluate() {

    while(stack.length > 1) {
    secondOp = stack.pop();
    op = stack.pop();
    firstOp = stack.pop();

    stack.push(op.operation(firstOp, secondOp));
    }

}