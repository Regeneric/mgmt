/*--SETUP--*/
const math = require("mathjs");
const chart = require("chart.js");

const ctx = document.getElementById("func2d-chart").getContext("2d");
/*-!SETUP!-*/

const func2d = new Chart(ctx, {
    type: "line",
    data: [10, 20, 30, 40, 15, 13, 11],
    options: {
        responsive: false
    }
});