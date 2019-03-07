/*--SETUP--*/
const math = require("mathjs");
const chart = require("chart.js");

// const body = document.querySelector("body").style.backgroundColor = "#fff";
const ctx = document.getElementById("func2d-chart").getContext("2d");

const fxBtn = document.querySelector(".fx-btn");
const fxInp = document.querySelector(".fx-inp");
/*-!SETUP!-*/

/*--PROPS--*/
let fxValue = 0;
const regExes = [{
        id: 0,
        name: "linearFx",
        fx: /^([0-9]{1,11}|a)(\*x|x)(\+|-)([0-9]{1,11}|b)$/g
        // ax+b
    }, {
        id: 1,
        name: "linearFxShort",
        fx: /^x(\+|-)([0-9]{1,11}|b)$/g
        // x+b
    }, {
        id: 2,
        name: "genSquareFx",
        fx: /^([0-9]{1,6}|a)(\*x|x)\^2(\+|-)([0-9]{1,6}|b)(\*x|x)(\+|-)([0-9]{1,6}|c)$/g
        // ax^2+bx+c
    }, {
        id: 3,
        name: "genSquareFxShort",
        fx: /^x\^2$/g
        // x^2
    }, {
        id: 4,
        name: "ratSquareFx",
        fx: /^([0-9]{1,5}|a)(\(|\*\()x(\+|-)([0-9]{1,5}|b)\)(\(|\*\()x(\+|-)([0-9]{1,6}|c)\)$/g
        // a(x-b)(x-c)
    }, {
        id: 5,
        name: "canSquareFx",
        fx: /^([0-9]{1,6}|a)(\*\(|\()x(\+|-)([0-9]{1,6}|p)\)\^2(\+|-)([0-9]{1,6}|q)$/g
        // a(x-p)^2+q
    }, {
        id: 6,
        name: "absValueFx",
        fx: /^([0-9]{1,6}|a)(\*\||\|)x(\+|-)([0-9]{1,6}|p)\|(\+|-)([0-9]{1,7}|q$)/g
        // a|x-p|+q
    }, {
        id: 7,
        name: "homoFx",
        fx: /^([0-9]{1,7}|a)\/\(x(\+|-)([0-9]{1,7}|p)\)(\+|-)([0-9]{1,7}|q)$/g
        // a/(x-p)+q
    }, {
        id: 8,
        name: "homoFxShort",
        fx: /^([0-9]{1,20}|a)\/x$/g
        // a/x
    }, {
        id: 9,
        name: "thirdPolyFx",
        fx: /^([0-9]{1,3}|a)(\*x|x)\^3(\+|-)([0-9]{1,3}|b)(\*x|x)\^2(\+|-)([0-9]{1,4}|c)(\*x|x)(\+|-)([0-9]{1,4}|p)/g
        // ax^3+bx^2+cx+p
    }
];
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/
fxBtn.addEventListener("click", () => {
    fxValue = fxInp.value
    let flag = 0;
    regExes.forEach(r => {
        if (r.fx.test(fxValue)) flag = 1;
    });

    if (flag) {
        console.log(fxValue);
        flag = 0;
    } else console.log("Debilu ujebany, popraw to");
});
/*-!EVENTS!-*/

function ctg(x) {return 1/Math.tan(x);}
function f(x) {
    return 2*x+1;
}

const data = new Array();
for (let x = -15; x < 15; x++) {
    data.push({x:x,y:f(x)});
}


const func2d = new Chart(ctx, {
    type: "line",
    data: {
        datasets: [{
            label: "2x+1",
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
});
/*-!RUN!-*/