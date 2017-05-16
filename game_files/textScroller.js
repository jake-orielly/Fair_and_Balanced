var currArrayPos;
var textArray = [];
var textDone;
var scrollCount;
var textLoop;
var maxChar = 98;

document.onkeypress = function (e) {
    e = e || window.event;
        
    if(e.keyCode == 13 || e.keyCode == 32) {
        e.preventDefault();
        buttonPressed();
    }
};

function textScroll(text) {
    currArrayPos = 0;
    textArray = [];
    document.activeElement.blur(); //Kludged but stops "enter" during text from triggering buttons
    document.getElementById("textScroll").style.width = "88%";
    //clipText(text);   Prof wanted it more readable, doing the whole thing by hand, kludged together the night before
    makeBreaks(text);
    newScroll(textArray[currArrayPos]);
    textDone = false;
}

function newScroll (text) {
    scrollCount = 0;
    scroll(text);
    textLoop = setInterval(function() { scroll(text); }, 28);
}

function makeBreaks(given) {
    var lastEndpoint = 0;
    for (var i = 0; i < given.length; i++) {
        if (given.charAt(i) == ";") {
            textArray.push(given.substring(lastEndpoint,i));
            lastEndpoint = i+1;
            i++;
        }
        if (i == given.length-1) {
            textArray.push(given.substring(lastEndpoint,i+1));
        }
    }
}

function scroll(text) {
    scrollCount++;
    document.getElementById("textScroll").innerHTML = text.substr(0,scrollCount);
    
    if (scrollCount == text.length) {
        clearInterval(textLoop);
        if (currArrayPos < textArray.length-1 || textArray.length == 1) {
            currArrayPos += 1;
            textDone = true;
        }
        else if (phase == 0) {
            incrementPhase();
        }
        else if (phase == 3 || 4) { //Kludge af for demo, fix
            currArrayPos += 1;
            textDone = true;
        }
    }
}

function clipText (given) {
    if (given.length > maxChar) {
        var endPoint;
        for (var i = maxChar; i > 0; i--) {
            if (given.charAt(i) == ' ') {
                endPoint = i;
                break;
            }
        }

        textArray[textArray.length] = given.substr(0,endPoint);
        clipText(given.substr(endPoint,given.length));
    }
    else {
        textArray[textArray.length] = given;
    }
}

function getCurrArrayPos() {
    return currArrayPos;
}

function getTextArray() {
    return textArray;
}

function getTextDone() {
    return textDone;
}

function setTextDone(given) {
    textDone = given;
}