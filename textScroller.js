var currArrayPos;
var textArray = [];
var textDone;
var scrollCount;
var textLoop;
var maxChar = 64; //maximum number of characters that can fit in the dialogue box

document.onkeypress = function (e) {
    e = e || window.event;
    if(e.keyCode == 32)
        e.preventDefault();
    if(e.keyCode == 13 || e.keyCode == 32)
        buttonPressed();
};

document.getElementById("dialogueBoxImage").style.width = window.innerWidth*0.89 + "px";

function textScroll(text) {
    currArrayPos = 0;
    clipText(text);
    newScroll(textArray[currArrayPos]);
    textDone = false;
}

function newScroll (text) {
    scrollCount = 0;
    scroll(text);
    textLoop = setInterval(function() { scroll(text); }, 40);
}

function scroll(text) {
    scrollCount++;
    document.getElementById("demo").innerHTML = text.substr(0,scrollCount);
    if (scrollCount == text.length) {
        clearInterval(textLoop);
        if (currArrayPos < textArray.length-1) {
            currArrayPos += 1;
            textDone = true;
        }
        else if (phase == 0){
            incrementPhase();
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