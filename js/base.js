/*--SETUP--*/
const inputBox = document.querySelector("#inputBox");
const resultBox = document.querySelector("#resultBox");

const baseButtons = document.querySelectorAll(".baseButton");
const calc = document.querySelectorAll(".calc");
/*-!SETUP!-*/

/*--PROPS--*/
const maxChar = 16; // Max number of characters you can input
const btnColor = "#31363b";
const btnColorFocus = "#22282e";
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/

// Mouse 0-9
baseButtons.forEach(baseButton => {
    baseButton.addEventListener("click", () => {
        //Continue inserting numbers after using calculate button
        if (resultBox.className == "highlited") {
            resultBox.className = "unhighlited";
            inputBox.className = "highlited";
            inputBox.firstChild.nodeValue = ' ';
        }
        // Max char number
        if (inputBox.firstChild.nodeValue.length <= maxChar) {
            // Insert 0
            if (baseButton.id == "btn0"){
                //0 at the start of a number
                if (inputBox.firstChild.nodeValue == " "){
                    inputBox.firstChild.nodeValue = 0;
                }
                //0 in other places
                if (inputBox.firstChild.nodeValue.match(/\d+/g).map(Number)[inputBox.firstChild.nodeValue.match(/\d+/g).map(Number).length-1] == 0 ) {
                    if (/[0-9]{0,}\.[0-9]{0,}$/g.test(inputBox.firstChild.nodeValue)) inputBox.firstChild.nodeValue += 0;
                }
                else inputBox.firstChild.nodeValue += 0;
            }
            

            // Insert 1-9
            for (let i = 1; i < 10; i++) {
                if (baseButton.id == "btn" + i && inputBox.firstChild.nodeValue !== '0') {
                    inputBox.firstChild.nodeValue += i;
                }
            }
        }
        //Update resultbox
        resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
    });
});

// Mouse operations
calc.forEach(calc => {
    calc.addEventListener("click", () => {

        //Continue after using equal button
        if (resultBox.className == "highlited" && calc.id != "btnequals" && calc.id != "btnbackspace"){
            resultBox.className = "unhighlited";
            inputBox.className = "highlited";
            inputBox.firstChild.nodeValue = resultBox.firstChild.nodeValue.substr(2);
        }

        //Equal button
        if (calc.id == "btnequals" && resultBox.className == "unhighlited") {
            resultBox.className = "highlited";
            ipcRenderer.send("inputBox", "base" + inputBox.firstChild.nodeValue);
            inputBox.className = "unhighlited";
        }

        //Calculating buttons
        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
            switch(calc.id) {
                case "btnplus":
                    inputBox.firstChild.nodeValue += "+";
                break;

                case "btnminus":
                    inputBox.firstChild.nodeValue += "-";
                break;

                case "btnmultiple":
                    inputBox.firstChild.nodeValue += "*";
                break;

                case "btndivide": 
                    inputBox.firstChild.nodeValue += "/";
                break;

                case "btndot":
                    if (!(/[0-9]{0,}\.[0-9]{0,}$/g.test(inputBox.firstChild.nodeValue))){
                    inputBox.firstChild.nodeValue += ".";
                    }
                break;
            }
        }

        //Minus at the beggining
        if (calc.id == "btnminus" && inputBox.firstChild.nodeValue == ' '){
            inputBox.firstChild.nodeValue += "-";
        }

        //Backspace button
        if (calc.id == "btnbackspace"){

            if (inputBox.firstChild.nodeValue != " ") {
            inputBox.firstChild.nodeValue = inputBox.firstChild.nodeValue.slice(0, -1);
            }

            if ( !(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1]))) {
                if (inputBox.firstChild.nodeValue.length > 1 ) {
                    resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
                } else resultBox.firstChild.nodeValue = "= "

            }

        }

        //C button
        if (calc.id == "btnc"){
            inputBox.firstChild.nodeValue = " ";
            resultBox.firstChild.nodeValue = "= ";
        }
        
    });
});



////////////////////////////////////Keyboard button colors//////////////////////////////////////////////
document.addEventListener("keydown", function(){

    if (!(isNaN(event.key))){
    document.querySelector("#btn"+ event.key).style.backgroundColor = btnColorFocus;}

    switch (event.key){
        case "+":
        document.querySelector("#btnplus").style.backgroundColor = btnColorFocus;
        break;
        case "-":
        document.querySelector("#btnminus").style.backgroundColor = btnColorFocus;
        break;
        case "*":
        document.querySelector("#btnmultiple").style.backgroundColor = btnColorFocus;
        break;
        case ":":
        case "/":
        document.querySelector("#btndivide").style.backgroundColor = btnColorFocus;
        break; 
        case "Enter":
        case "=":
        document.querySelector("#btnequals").style.backgroundColor = btnColorFocus;
        break;
        case "Escape":
        case "Delete":
        document.querySelector("#btnc").style.backgroundColor = btnColorFocus;
        break;
        case ".":
        document.querySelector("#btndot").style.backgroundColor = btnColorFocus
        break;
        case "Backspace":
        document.querySelector("#btnbackspace").style.backgroundColor = btnColorFocus;
        break;
    }

});
//////////////////////////////////////////////////////////////////////////////////////////////////////



//Keyboard support
document.addEventListener("keyup", () => {


    //Inserting numbers
    if (!(isNaN(event.key))){

    //Continue inserting numbers after using calculate button
    if (resultBox.className == "highlited") {
        resultBox.className = "unhighlited";
        inputBox.className = "highlited";
        inputBox.firstChild.nodeValue = ' ';
    }

    //Max char number
    if (inputBox.firstChild.nodeValue.length <= maxChar) {
        
            // Insert 0
            if (event.key == "0"){
                //0 at the start of a number
                if (inputBox.firstChild.nodeValue == " "){
                    inputBox.firstChild.nodeValue = 0;
                }
                //0 in other places
                if (inputBox.firstChild.nodeValue.match(/\d+/g).map(Number)[inputBox.firstChild.nodeValue.match(/\d+/g).map(Number).length-1] == 0 ) {
                    if (/[0-9]{0,}\.[0-9]{0,}$/g.test(inputBox.firstChild.nodeValue)) inputBox.firstChild.nodeValue += 0;
                }
                else inputBox.firstChild.nodeValue += 0;
                document.querySelector("#btn0").style.backgroundColor = btnColor;
            }
            

            // Insert 1-9
            for (let i = 1; i < 10; i++) {
                if (event.key == i && inputBox.firstChild.nodeValue !== '0') {
                    inputBox.firstChild.nodeValue += i;
                }
                document.querySelector("#btn" + i).style.backgroundColor = btnColor;
            }
            //Update resultbox
            resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
        }
    }
        //Keyboard operations
        //Continue after using equal button
         if (resultBox.className == "highlited" && ["+", "-", "*", ":", "/", ".", ","].includes(event.key)){
            resultBox.className = "unhighlited";
            inputBox.className = "highlited";
            inputBox.firstChild.nodeValue = resultBox.firstChild.nodeValue.substr(2);
        }

        //Equal button
        if (event.key == "Enter" || event.key == "=") {
        if (resultBox.className == "unhighlited") {
            resultBox.className = "highlited";
            ipcRenderer.send("inputBox", "base" + inputBox.firstChild.nodeValue);
            inputBox.className = "unhighlited";
        }
            document.querySelector("#btnequals").style.backgroundColor = btnColor;
        }

        //Calculating buttons
            switch(event.key) {
                case "+":
                if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                    inputBox.firstChild.nodeValue += "+";
                    }
                    document.querySelector("#btnplus").style.backgroundColor = btnColor;
                break;

                case "-": 
                    if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                    inputBox.firstChild.nodeValue += "-";
                }
                    document.querySelector("#btnminus").style.backgroundColor = btnColor;
                break;

                case "*": 
                if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                    inputBox.firstChild.nodeValue += "*";
                    }
                    document.querySelector("#btnmultiple").style.backgroundColor = btnColor;
                break;

                case ":":
                case "/": 
                if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
                    inputBox.firstChild.nodeValue += "/";
                    }
                    document.querySelector("#btndivide").style.backgroundColor = btnColor;
                break;

                case ",":
                case ".": 
                    if (!(/[0-9]{0,}\.[0-9]{0,}$/g.test(inputBox.firstChild.nodeValue)) && inputBox.firstChild.nodeValue != ' '){
                    inputBox.firstChild.nodeValue += ".";
                    }
                document.querySelector("#btndot").style.backgroundColor = btnColor;
                break;
                
            }

            //Minus at the beggining
            if (event.key == "-" && inputBox.firstChild.nodeValue == ' '){
                inputBox.firstChild.nodeValue += "-";
            }

        //Backspace button
        if (event.key == "Backspace"){

            if (inputBox.firstChild.nodeValue != " ") {
            inputBox.firstChild.nodeValue = inputBox.firstChild.nodeValue.slice(0, -1);
            }

            if ( !(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1]))) {
                if (inputBox.firstChild.nodeValue.length > 1 ) {
                    resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
                } else resultBox.firstChild.nodeValue = "= "

            }
            document.querySelector("#btnbackspace").style.backgroundColor = btnColor;
        }

        //C button
        if (event.key == "Escape"){
            inputBox.firstChild.nodeValue = " ";
            resultBox.firstChild.nodeValue = "= ";
            document.querySelector("#btnc").style.backgroundColor = btnColor;
        }

    

});
/*-!EVENTS!-*/ 
/*-!RUN!-*/