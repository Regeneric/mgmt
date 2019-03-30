/*--INFO--*/
// Author: Gabriel Król
/*-!INFO!-*/

/*--SETUP--*/
const inputBox = document.querySelector("#inputBox");
const resultBox = document.querySelector("#resultBox");

const calcButtons = document.querySelectorAll(".calcButton");
/*-!SETUP!-*/

/*--PROPS--*/
const maxChar = 18; // Max number of characters you can input
const floatPrecision=4; //Precision of float numbers
let isCalculated = 0;
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/

//Insert by mouse
calcButtons.forEach(calcButton => {
    calcButton.addEventListener("mousedown", () => {
        calculate(calcButton.getAttribute("name"));
    });
});

//Uncolor by mouse
calcButtons.forEach(calcButton => {
    calcButton.addEventListener("mouseleave", () => {
        uncolor(calcButton.getAttribute("name"));
    });
});

//Uncolor by mouse
calcButtons.forEach(calcButton => {
    calcButton.addEventListener("mouseup", () => {
        uncolor(calcButton.getAttribute("name"));
    });
});

//Insert by keyboard
document.addEventListener("keydown", () => {
    calculate(event.key);
});

//Uncolor by keyboard
document.addEventListener("keyup", () => {
    uncolor(event.key)
});

//Copy to clipboard from Edit menu
document.getElementById("copy").addEventListener("click", () => {
    copyStringToClipboard(resultBox.firstChild.nodeValue.substr(2));
});


function calculate(action){

    //Inserting numbers
    if (!(isNaN(action))) {
        //Continue inserting numbers after using calculate button
        //

        //Max char number
        if (inputBox.firstChild.nodeValue.length <= maxChar) {
            
                // Insert 0
                if (action == "0") {
                    //0 at the start of a number
                    if (inputBox.firstChild.nodeValue == " ") {
                        inputBox.firstChild.nodeValue = 0;
                    }
                    //0 in other places
                    if (inputBox.firstChild.nodeValue.match(/\d+/g).map(Number)[inputBox.firstChild.nodeValue.match(/\d+/g).map(Number).length-1] == 0 ) {
                        if (/[0-9]{0,}\.[0-9]{0,}$/g.test(inputBox.firstChild.nodeValue)) inputBox.firstChild.nodeValue += 0;
                    }
                    else inputBox.firstChild.nodeValue += 0;
                    document.querySelector("#btn0").classList.value = "activated";
                }
                

                // Insert 1-9
                for (let i = 1; i < 10; i++) {
                    if (action == i) {
                        if (inputBox.firstChild.nodeValue !== '0') {
                        inputBox.firstChild.nodeValue += i;
                    }
                    document.querySelector("#btn" + i).classList.value = "activated";
                }
                    
                }
            }
        }

        //Keyboard operations
            //Continue after using equal button
            if (!(isNaN(action)) && isCalculated==1) {
                inputBox.firstChild.nodeValue = action;
                isCalculated = 0;
            }
            else isCalculated = 0;

            //Equal button
            if (action == "Enter" || action == "=") {
                    resultBox.firstChild.nodeValue = inputBox.firstChild.nodeValue;
                    inputBox.firstChild.nodeValue = eval(inputBox.firstChild.nodeValue);
                    //ipcRenderer.send("inputBox", "base" + inputBox.firstChild.nodeValue);
                    isCalculated = 1;
                    document.querySelector("#btnequals").classList.value = "activated";
            }

            //Calculating buttons
                switch(action) {
                    case "+": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                            inputBox.firstChild.nodeValue += "+";
                        } document.querySelector("#btnplus").classList.value = "activated";
                        break;
                    } case "-": { 
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                            inputBox.firstChild.nodeValue += "-";
                        } document.querySelector("#btnminus").classList.value = "activated";
                        break;
                    } case "*": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                            inputBox.firstChild.nodeValue += "*";
                        } document.querySelector("#btnmultiple").classList.value = "activated";
                        break;
                    } 
                    case ":":
                    case "/": { 
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                            inputBox.firstChild.nodeValue += "/";
                        } document.querySelector("#btndivide").classList.value = "activated";
                        break;
                    }
                    case ",":
                    case ".": {
                        if (!(/[0-9]{0,}\.[0-9]{0,}$/g.test(inputBox.firstChild.nodeValue)) && inputBox.firstChild.nodeValue != ' ' && !(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1]))) {
                            inputBox.firstChild.nodeValue += ".";
                        } document.querySelector("#btndot").classList.value = "activated";
                        break;
                    }
                    case "(": {
                        if (inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1] != "(" && inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1] != ")" && isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) {
                        inputBox.firstChild.nodeValue += "(";
                        } document.querySelector("#btnbracket1").classList.value = "activated";
                        break;
                    }
                    case ")": {
                        if (inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1] != "(" && inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1] != ")" && !(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1]))) {
                        inputBox.firstChild.nodeValue += ")";
                        } document.querySelector("#btnbracket2").classList.value = "activated";
                        break;
                    }
                    case "sin": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                        inputBox.firstChild.nodeValue = Math.sin(eval(inputBox.firstChild.nodeValue)).toPrecision(floatPrecision);
                        } document.querySelector("#btnsin").classList.value = "activated";
                        break;
                    }
                    case "cos": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                        inputBox.firstChild.nodeValue = Math.cos(eval(inputBox.firstChild.nodeValue)).toPrecision(floatPrecision);
                        } document.querySelector("#btncos").classList.value = "activated";
                        break;
                    }
                    case "tg": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                        inputBox.firstChild.nodeValue = Math.tan(eval(inputBox.firstChild.nodeValue)).toPrecision(floatPrecision);
                        } document.querySelector("#btntg").classList.value = "activated";
                        break;
                    }
                    case "sqrt": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                        inputBox.firstChild.nodeValue = Math.sqrt(eval(inputBox.firstChild.nodeValue)).toPrecision(floatPrecision);
                        } document.querySelector("#btnsqrt").classList.value = "activated";
                        break;
                    }
                    case "1/x": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                        inputBox.firstChild.nodeValue = 1/eval(inputBox.firstChild.nodeValue);
                        } document.querySelector("#btnonetox").classList.value = "activated";
                        break;
                    }
                    case "mod": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                            inputBox.firstChild.nodeValue += "%";
                        } document.querySelector("#btnmod").classList.value = "activated";
                        break;
                    }
                    case "power2": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                        inputBox.firstChild.nodeValue = eval(inputBox.firstChild.nodeValue)*eval(inputBox.firstChild.nodeValue);
                        } document.querySelector("#btnpower2").classList.value = "activated";
                        break;
                    }
                    case "^": {
                        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                            inputBox.firstChild.nodeValue += "^";
                        } document.querySelector("#btnpowern").classList.value = "activated";
                        break;
                    }
                }

                //Operations at the beginning
                if (action == "-" && inputBox.firstChild.nodeValue == ' ') {
                    inputBox.firstChild.nodeValue += "-";
                }

            //Backspace button
            if (action == "Backspace") {

                if (inputBox.firstChild.nodeValue != " ") {
                    inputBox.firstChild.nodeValue = inputBox.firstChild.nodeValue.slice(0, -1);
                }
                document.querySelector("#btnbackspace").classList.value = "activated";
            }

            //C button
            if (action == "Escape") {
                inputBox.firstChild.nodeValue = " ";
                resultBox.firstChild.nodeValue = " ";
                document.querySelector("#btnc").classList.value = "activated";
            }
}


function uncolor(action) {
    if (!(isNaN(action))) {
        document.querySelector("#btn"+ action).classList.value = "calcButton";
    }

    switch (action) {
        case "+": {
            document.querySelector("#btnplus").classList.value = "calcButton";
            break;
        } case "-": {
            document.querySelector("#btnminus").classList.value = "calcButton";
            break;
        } 
        case "*":
        case "Shift": {
            document.querySelector("#btnplus").classList.value = "calcButton";
            document.querySelector("#btnmultiple").classList.value = "calcButton";
            break;
        }
        case ":":
        case "/": {
            document.querySelector("#btndivide").classList.value = "calcButton";
            break; 
        } 
        case "Enter":
        case "=": {
            document.querySelector("#btnequals").classList.value = "calcButton";
            break;
        }
        case "Escape":
        case "Delete": {
            document.querySelector("#btnc").classList.value = "calcButton";
            break;
        }
        case ".":
        case ",": {
            document.querySelector("#btndot").classList.value = "calcButton";
            break;
        } case "Backspace": {
            document.querySelector("#btnbackspace").classList.value = "calcButton";
            break;
        }
        case "(": {
            document.querySelector("#btnbracket1").classList.value = "calcButton";
            break;
        }
        case ")": {
            document.querySelector("#btnbracket2").classList.value = "calcButton";
            break;
        }
        case "sin": {
            document.querySelector("#btnsin").classList.value = "calcButton";
            break;
        }
        case "cos": {
            document.querySelector("#btncos").classList.value = "calcButton";
            break;
        }
        case "tg": {
            document.querySelector("#btntg").classList.value = "calcButton";
            break;
        }
        case "sqrt": {
            document.querySelector("#btnsqrt").classList.value = "calcButton";
            break;
        }
        case "1/x": {
            document.querySelector("#btnonetox").classList.value = "calcButton";
            break;
        }
        case "mod": {
            document.querySelector("#btnmod").classList.value = "calcButton";
            break;
        }
        case "power2": {
            document.querySelector("#btnpower2").classList.value = "calcButton";
            break;
        }
        case "^": {
            document.querySelector("#btnpowern").classList.value = "calcButton";
            break;
        }
        }
    }

function copyStringToClipboard(str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }

/*-!EVENTS!-*/ 
/*-!RUN!-*/


// WGEC - Scientific Calculator
// Copyright (C) 2019  Hubert Batkiewicz, Gabriel Król, Patryk Piszczek

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.