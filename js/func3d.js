/*--INFO--*/
// Author: Hubert Batkiewicz
/*-!INFO!-*/

/*--SETUP--*/
const Plotly = require("plotly.js-dist");

const fxInp = document.querySelectorAll(".fx-inp");
const fxBtn = document.querySelector(".fx-btn")
/*-!SETUP!-*/

/*--PROPS--*/
let a = b = c = p = q = 1;

let leftAxis = -1000;
let rightAxis = 1000;

const xAx = new Array();
const yAx = new Array();
const zAx = new Array();

const data = [
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
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/
fxBtn.addEventListener("click", () => {
    let xVal = fxInp[1].value;
    let sign = fxInp[2].value;
    let yVal = fxInp[3].value; 
    
    xVal = xVal.replace("abs", "Math.abs");
    yVal = yVal.replace("abs", "Math.abs");
    xVal = xVal.replace("sin", "Math.sin");
    yVal = yVal.replace("sin", "Math.sin");

    xVal = xVal.replace('^', "**");
    yVal = yVal.replace('^', "**");

    let fx = xVal+sign+yVal;
    drawFunction(fx, xVal, yVal);
});
/*-!EVENTS!-*/

Plotly.newPlot("func3d-chart", data, layout, { showSendToCloud: true });

function drawFunction(fx, x, y) {
    function f(x, y) {
        return eval(fx)
    }
    
    for (let x = leftAxis; x < rightAxis; x += 10) {
        xAx.push(x);
        for (let y = leftAxis; y < rightAxis; y += 10) {
            yAx.push(y);
            zAx.push(f(x, y));
        }
    }

    Plotly.newPlot("func3d-chart", data, layout, { showSendToCloud: true });
}
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