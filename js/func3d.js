/*--INFO--*/
// Author: Hubert Batkiewicz
/*-!INFO!-*/

/*--SETUP--*/
const Plotly = require("plotly.js-dist");
/*-!SETUP!-*/

function f(x, y) {
    return x ** 2 + y ** 2;
}

let leftAxis = -1000;
let rightAxis = 1000;

const xAx = new Array();
const yAx = new Array();
const zAx = new Array();

for (let x = leftAxis; x < rightAxis; x++) {
    xAx.push(x);
    for (let y = leftAxis; y < rightAxis; y += 10) {
        yAx.push(y);
        zAx.push(f(x, y));
    }
}

var data = [
    {
        opacity: 0.5,
        type: "scatter3d",

        x: xAx,
        y: yAx,
        z: zAx
    }
];

const layout = {
    scene: {
        aspectmode: "manual",
        aspectratio: {
            x: 1,
            y: 1,
            z: 1
        },
        autosize: false,
        width: 1280,
        height: 500,
        margin: {
            l: 0,
            r: 0,
            b: 10,
            t: 10,
            pad: 1
        },
    }
}

Plotly.newPlot("func3d-chart", data, layout, { showSendToCloud: true });