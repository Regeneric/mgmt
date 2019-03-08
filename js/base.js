/*--SETUP--*/
const inputBox = document.querySelector("#inputBox");
const resultBox = document.querySelector("#resultBox");

const baseButtons = document.querySelectorAll(".baseButton");
const calc = document.querySelectorAll(".calc");
/*-!SETUP!-*/

/*--PROPS--*/
const maxChar = 12; // Max number of characters you can input
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/

// Mouse 0-9
baseButtons.forEach(baseButton => {
    baseButton.addEventListener("click", () => {
        if (resultBox.className == "highlited") {
            resultBox.className = "unhighlited";
            inputBox.className = "highlited";
            inputBox.firstChild.nodeValue = ' ';
        }
        // Max char number
        if (inputBox.firstChild.nodeValue.length <= maxChar) {
            // Insert 0
            if (baseButton.id == "btn0"){
                if (inputBox.firstChild.nodeValue == " "){
                    inputBox.firstChild.nodeValue = 0;
                }
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
            resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
    });
});

// Mouse operations
calc.forEach(calc => {
    calc.addEventListener("click", () => {

        if (resultBox.className == "highlited" && calc.id != "btnequals" && calc.id != "btnbackspace"){
            resultBox.className = "unhighlited";
            inputBox.className = "highlited";
            inputBox.firstChild.nodeValue = resultBox.firstChild.nodeValue.substr(2);
        }

        if (calc.id == "btnequals" && resultBox.className == "unhighlited") {
            resultBox.className = "highlited";
            ipcRenderer.send("inputBox", "base" + inputBox.firstChild.nodeValue);
            inputBox.className = "unhighlited";
        }

        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' ') {
            switch(calc.id) {
                case "btnplus": {
                    inputBox.firstChild.nodeValue += "+";
                    break;
                }
                case "btnminus": {
                    inputBox.firstChild.nodeValue += "-";
                    break;
                }
                case "btnmultiple": {
                    inputBox.firstChild.nodeValue += "*";
                    break;
                }
                case "btndivide": {
                    inputBox.firstChild.nodeValue += "/";
                    break;
                }
                case "btndot": {
                    inputBox.firstChild.nodeValue += ".";
                    break;
                }
            }
        }

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
        if (calc.id == "btnc"){
            inputBox.firstChild.nodeValue = " ";
            resultBox.firstChild.nodeValue = "= ";
        }
        
    });
});


//Keyboard support
// document.addEventListener("keyup", () => {
//     console.log(event.key);

//     if (inputBox.firstChild.nodeValue.length <= maxChar) {

//         if (!(isNaN(event.key))){
//             if (event.key == "0"){
//                 if (inputBox.firstChild.nodeValue == " "){
//                     inputBox.firstChild.nodeValue = 0;
//                 }
//                 if (inputBox.firstChild.nodeValue.match(/\d+/g).map(Number)[inputBox.firstChild.nodeValue.match(/\d+/g).map(Number).length-1] == 0 ) {
//                     if (/[0-9]{0,}\.[0-9]{0,}$/g.test(inputBox.firstChild.nodeValue)) inputBox.firstChild.nodeValue += 0;
//             }
//                 else inputBox.firstChild.nodeValue += 0;
//             }
            

//             // Insert 1-9
//             for (let i = 1; i < 10; i++) {
//                 if (event.key == i && inputBox.firstChild.nodeValue !== '0') {
//                     inputBox.firstChild.nodeValue += i;
//                 }
//             }
//         }
//     switch(event.key){
//         case "+": {
//             inputBox.firstChild.nodeValue += "+";
//             break;
//         }
//         case "-": {
//             inputBox.firstChild.nodeValue += "-";
//             break;
//         }
//         case "*": {
//             inputBox.firstChild.nodeValue += "*";
//             break;
//         }
//         case "/": {
//             inputBox.firstChild.nodeValue += "/";
//             break;
//         }
//         case ".": {
//             inputBox.firstChild.nodeValue += ".";
//             break;
//         }
//         case "Backspace": {
//             inputBox.firstChild.nodeValue = inputBox.firstChild.nodeValue.slice(0, -1);
//             if ( !(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) ) {
//                 resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
//             }
//             break;
//         }
//         case "Escape": {
//             inputBox.firstChild.nodeValue = " "
//             resultBox.firstChild.nodeValue = "= "
//             break;
//         }

//     }

//     }

// });
/*-!EVENTS!-*/ 
/*-!RUN!-*/