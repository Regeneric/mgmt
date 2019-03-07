/*--SETUP--*/
const math = require("mathjs");
const chart = require("chart.js");

// const body = document.querySelector("body").style.backgroundColor = "#fff";
const ctx = document.getElementById("func2d-chart").getContext("2d");

const fxBtn = document.querySelector(".fx-btn");
const fxInp = document.querySelectorAll(".fx-inp");
/*-!SETUP!-*/

/*--PROPS--*/
let fxValue = 0;
let a = b = c = p = q = 1;
let func2d = null;

let data = new Array();
const chartProps = {
    type: "line",
    data: {
        datasets: [{
            label: '',
            borderColor: 'rgb(255, 99, 132)',
            data: data
        }]
    },
    options: {
        responsive: false,
        scales: {
            xAxes: [{
                type: "linear"
            }]
        }
    }
};

const regExes = [{
        id: 0,
        name: "linearFx",
        fx: /^([0-9]{1,11}|a)\*x(\+|\-)([0-9]{1,11}|b)$/
        // a*x+b
    }, {
        id: 1,
        name: "linearFxShort",
        fx: /^x(\+|\-)([0-9]{1,11}|b)$/
        // x+b
    }, {
        id: 2,
        name: "genSquareFx",
        fx: /^([0-9]{1,6}|a)\*x\^2(\+|\-)([0-9]{1,6}|b)\*x(\+|\-)([0-9]{1,6}|c)$/
        // a*x^2+b*x+c
    }, {
        id: 3,
        name: "genSquareFxShort",
        fx: /^x\^2$/
        // x^2
    }, {
        id: 4,
        name: "ratSquareFx",
        fx: /^([0-9]{1,5}|a)\*\(x(\+|\-)([0-9]{1,5}|b)\)\*\(x(\+|\-)([0-9]{1,6}|c)\)$/
        // a*(x-b)*(x-c)
    }, {
        id: 5,
        name: "canSquareFx",
        fx: /([0-9]{1,6}|a)\*\(x(\+|\-)([0-9]{1,6}|p)\)\^2(\+|\-)([0-9]{1,6}|q)$/
        // a*(x-p)^2+q
    }, {
        id: 6,
        name: "absValueFx",
        fx: /^([0-9]{1,6}|a)\*\|x(\+|\-)([0-9]{1,6}|p)\|(\+|\-)([0-9]{1,7}|q)$/
        // a*|x-p|+q
    }, {
        id: 7,
        name: "homoFx",
        fx: /^([0-9]{1,7}|a)\/\(x(\+|\-)([0-9]{1,7}|p)\)(\+|\-)([0-9]{1,7}|q)$/
        // a/(x-p)+q
    }, {
        id: 8,
        name: "homoFxShort",
        fx: /^([0-9]{1,20}|a)\/x$/
        // a/x
    }, {
        id: 9,
        name: "thirdPolyFx",
        fx: /^([0-9]{1,3}|a)\*x\^3(\+|\-)([0-9]{1,3}|b)\*x\^2(\+|\-)([0-9]{1,4}|c)\*x(\+|-)([0-9]{1,4}|p)$/
        // a*x^3+b*x^2+c*x+p
    }
];
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/
fxBtn.addEventListener("click", () => {
    let rightX = fxInp[0].value;
    let leftX = ~rightX+1; 

    fxValue = fxInp[1].value
    func2d.destroy();
    data.length = 0;
    regExes.forEach(r => {
        if (r.fx.test(fxValue)) {
            switch(r.id) {
                // Zwykłe funkcje
                case 0:
                case 1:
                case 4:
                case 5:
                case 7:
                case 8:
                    fxValue = r.fx.exec(fxValue)[0];

                    function f(x) {
                        return eval(fxValue);
                    }

                    for (let x = leftX; x < rightX; x++) {
                        data.push({x:x,y:f(x)});
                    } break;     
                case 2:
                case 3:
                case 6:
                case 9:
                    break;
            }
        }
    });

    func2d = new Chart(ctx, chartProps);
    func2d.data.datasets[0].label = fxValue.toString();
    func2d.update();
}); 
/*-!EVENTS!-*/
func2d = new Chart(ctx, chartProps);
/*-!RUN!-*/