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