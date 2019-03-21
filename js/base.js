/*--INFO--*/
// Author: Gabriel Król
/*-!INFO!-*/

/*--SETUP--*/
const inputBox = document.querySelector("#inputBox");
const resultBox = document.querySelector("#resultBox");

const calcButtons = document.querySelectorAll(".calcButton");
/*-!SETUP!-*/

/*--PROPS--*/
const maxChar = 12; // Max number of characters you can input
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



function calculate(action){
    console.log (action);

    //Inserting numbers
    if (!(isNaN(action))) {

        //Continue inserting numbers after using calculate button
        if (resultBox.className == "highlited") {
            resultBox.className = "unhighlited";
            inputBox.className = "highlited";
            inputBox.firstChild.nodeValue = ' ';
        }

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
                //Update resultbox
                resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
            }
        }

        //Keyboard operations
            //Continue after using equal button
            if (resultBox.className == "highlited" && ["+", "-", "*", ":", "/", ".", ","].includes(action)) {
                resultBox.className = "unhighlited";
                inputBox.className = "highlited";
                inputBox.firstChild.nodeValue = resultBox.firstChild.nodeValue.substr(2);
            }

            //Equal button
            if (action == "Enter" || action == "=") {
                if (resultBox.className == "unhighlited") {
                    resultBox.className = "highlited";
                    ipcRenderer.send("inputBox", "base" + inputBox.firstChild.nodeValue);
                    inputBox.className = "unhighlited";
                }
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
                }

                //Minus at the beginning
                if (action == "-" && inputBox.firstChild.nodeValue == ' ') {
                    inputBox.firstChild.nodeValue += "-";
                }

            //Backspace button
            if (action == "Backspace") {

                if (inputBox.firstChild.nodeValue != " ") {
                    inputBox.firstChild.nodeValue = inputBox.firstChild.nodeValue.slice(0, -1);
                }

                if ( !(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) ) {
                    if (inputBox.firstChild.nodeValue.length > 1 ) {
                        resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
                    } else resultBox.firstChild.nodeValue = "= "
                }
                document.querySelector("#btnbackspace").classList.value = "activated";
            }

            //C button
            if (action == "Escape") {
                inputBox.firstChild.nodeValue = " ";
                resultBox.firstChild.nodeValue = "= ";
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
    }
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