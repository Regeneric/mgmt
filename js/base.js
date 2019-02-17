const inputBox = document.querySelector("#inputBox");
const resultBox = document.querySelector("#resultBox");
const baseButton = document.querySelectorAll(".baseButton");
const calc = document.querySelectorAll(".calc");
const equals = document.querySelector(".equals");

const maxChar = 12; // Max number of characters you can input


//Mouse 0-9
baseButton.forEach(baseButton => {
    baseButton.addEventListener("click", function(){


        if (resultBox.className == "highlited") {
            resultBox.className = "unhighlited";
            inputBox.className = "highlited";
            inputBox.firstChild.nodeValue = " ";
        }

         //Max characters
         if(inputBox.firstChild.nodeValue.length <= maxChar){
            //Insert 0
            if (baseButton.id == "btn0" && inputBox.firstChild.nodeValue != ' '){
                inputBox.firstChild.nodeValue += 0;
            }
            //Insert 1-9
            for(let i = 1; i<10; i++){
                if (baseButton.id == "btn" + i) {
                    inputBox.firstChild.nodeValue += i;
                }
            }
        }
    if(!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1]))){
        resultBox.firstChild.nodeValue = "= " + eval(inputBox.firstChild.nodeValue);
    }
    });
});

//Mouse operations

calc.forEach(calc => {
    calc.addEventListener("click", function(){

        if(resultBox.className == "highlited") {
            resultBox.className = "unhighlited";
            inputBox.firstChild.nodeValue = resultBox.firstChild.nodeValue;
            resultBox.firstChild.nodeValue = " ";
        }

        if (!(isNaN(inputBox.firstChild.nodeValue[inputBox.firstChild.nodeValue.length -1])) && inputBox.firstChild.nodeValue != ' '){

            switch(calc.id){
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
                    inputBox.firstChild.nodeValue += ".";
                    break;
                case "btnbackspace":
                    inputBox.firstChild.nodeValue = inputBox.firstChild.nodeValue.slice(0, -1);
                    break;
                case "btnc":
                    inputBox.firstChild.nodeValue = " "
                    break;
            }
        }
        
    });
});

equals.addEventListener("click", function(){
    inputBox.className = "unhighlited";
    resultBox.className = "highlited";
});