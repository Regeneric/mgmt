/*--SETUP--*/
const math = require("mathjs");
const chart = require("chart.js");

// const body = document.querySelector("body").style.backgroundColor = "#fff";
const ctx = document.getElementById("func2d-chart").getContext("2d");
/*-!SETUP!-*/

function ctg(x) { return 1 / Math.tan(x); }

function f(x) {
    return 3*ctg(x/10);
}

const data = new Array();
for (let x = -15; x < 15; x++) {
    data.push({x:x,y:f(x)});
}


const func2d = new Chart(ctx, {
    type: "line",
    data: {
        datasets: [{
            label: "tutaj będzie funkcja",
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

