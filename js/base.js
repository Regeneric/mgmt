/*--SETUP--*/
const inputBox = document.querySelector("#inputBox");
const resultBox = document.querySelector("#resultBox");

const baseButtons = document.querySelectorAll(".baseButton");
const calc = document.querySelectorAll(".calc");
/*-!SETUP!-*/

/*--PROPS--*/
const maxChar = 15; // Max number of characters you can input
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


//Keyboard support
document.addEventListener("keyup", () => {

    console.log(event.key);



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
            }
            

            // Insert 1-9
            for (let i = 1; i < 10; i++) {
                if (event.key == i && inputBox.firstChild.nodeValue !== '0') {
                    inputBox.firstChild.nodeValue += i;
                }
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
        if (event.key == "Enter" && resultBox.className == "unhighlited" || event.key == "=" && resultBox.className == "unhighlited") {
            resultBox.className = "highlited";
            ipcRenderer.send("inputBox", "base" + inputBox.firstChild.nodeValue);
            inputBox.className = "unhighlited";
        }

        //Calculating buttons
        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
            switch(event.key) {
                case "+":
                    inputBox.firstChild.nodeValue += "+";
                break;

                case "-": 
                    inputBox.firstChild.nodeValue += "-";
                break;

                case "*": 
                    inputBox.firstChild.nodeValue += "*";
                break;

                case ":":
                case "/": 
                    inputBox.firstChild.nodeValue += "/";
                break;

                case ",":
                case ".": 
                    if (!(/[0-9]{0,}\.[0-9]{0,}$/g.test(inputBox.firstChild.nodeValue))){
                    inputBox.firstChild.nodeValue += ".";
                    }
                break;
                
            }
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

        }

        //C button
        if (event.key == "Escape"){
            inputBox.firstChild.nodeValue = " ";
            resultBox.firstChild.nodeValue = "= ";
        }

    

});
/*-!EVENTS!-*/ 
/*-!RUN!-*/