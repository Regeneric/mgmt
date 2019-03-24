/*--INFO--*/
// Author: Hubert Batkiewicz
/*-!INFO!-*/

/*--SETUP--*/
const chart = require("chart.js");
const chartZoom = require("chartjs-plugin-zoom");
    const ctx = document.querySelector("#func2d-chart").getContext("2d");

const fxFind = require("./js/data/regExes").fx();

const fxBtn = document.querySelectorAll(".fx-btn");
const fxInp = document.querySelectorAll(".fx-inp");
const fxDraw = document.querySelector("#fx-draw");

const squareDiv = document.querySelectorAll("#square");
const squreDesc = document.querySelectorAll(".fx-desc");

const checkbox = document.querySelectorAll(".checkbox");
    const zoomBtn = checkbox[0];

    checkbox[0].style.backgroundColor = "rgb(9, 71, 113)";
    checkbox[1].style.backgroundColor = "rgb(188, 188, 188)";
    checkbox[2].style.backgroundColor = "rgb(9, 71, 113)";
/*-!SETUP!-*/

/*--PROPS--*/
let fxValue = fxDraw.value;   // User's input
let func2d = null;
let pos = 1;    // Check if a is positive or negative in equation

// Default values
let a = b = c = x = p = q = 1;  
const P = {a: 1, b: 1, c: 1, p: 1, q: 1, x: 1, d: 0};
const W = {p: 0, q: 0};
const X = {x1: 0, x2: 0, x12: 0};

// Wideness of the graph
let rightX = 0;
let leftX = 0; 

// Arrays for data and colour
const data = new Array();
const ptBgColour = new Array();
const ptBorderCl = new Array();

// Chart properties
const chartProps = {
    type: "line",
    data: {
        datasets: [{
            label: '',
            borderColor: "#ff6384",
            pointBackgroundColor: ptBgColour,
            pointBorderColor: ptBorderCl,
            data: data
        }]
    },
    options: {
        responsive: false,
        bezierCurve: false,
        elements: {
            line: {
                tension: 0.3
            }
        },
        scales: {
            xAxes: [{
                type: "linear",
                ticks: {
                    precision: 2,
                    min: -25,
                    max: 25
                },
                gridLines: {
                    color: "fff",
                    zeroLineColor: "#0065ff",
                    lineWidth: 1,
                    zeroLineWidth: 1
                }
            }],
            yAxes: [{
                ticks: {
                    precision: 2
                },
                gridLines: {
                    color: "fff",
                    zeroLineColor: "#037700",
                    lineWidth: 1,
                    zeroLineWidth: 1
                }
            }]
        },
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: "xy"
                },
                zoom: {
                    enabled: true,
                    mode: "xy"
                }
            }
        }
    }
};
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/
fxBtn.forEach(fb => {
    fb.addEventListener("click", () => {
        switch(fb.id) {
            case "fx-draw-btn": {
                func2d.options.elements.line.tension = 0.3;
                squareDiv.forEach(s => s.style.display = "none");   // Hide all divs driven by quadratic equation

                console.log(zoomBtn.style.backgroundColor);
                if (zoomBtn.style.backgroundColor == "rgb(9, 71, 113)") {
                    func2d.options.plugins.zoom.pan.enabled = true;
                    func2d.options.plugins.zoom.zoom.enabled = true;
                } else {
                    func2d.options.plugins.zoom.pan.enabled = false;
                    func2d.options.plugins.zoom.zoom.enabled = false;
                }
            
                rightX = fxInp[1].value;
                leftX = ~rightX+1; 
            
                fxValue = fxDraw.value;
            
                fxFind.forEach(r => {
                    if (r.fx.test(fxValue)) {
                        switch(r.id) {
                            case 0.1:
                            case 0.11:   
                            case 0.21:
                            case 0.31:
                            case 0.41:
                            case 0.51:
                            case 0.61:
                            case 1.12:
                            case 1.2:
                            case 1.3:
                            case 2.1:
                            case 2.11:
                            case 3.1:
                            case 3.11:
                            case 5.1:
                            case 5.2:
                            case 5.3:
                            case 18:
                            case 19: {
                                // Repalce x^2 on x**2 for eval() function
                                fxValue = fxValue.replace('^', "**");  
                                
                                data.length = 0;
                                drawLinearFx(fxValue, a, b, leftX, data);
            
                                checkForX(fxInp[2].value, data);
                                break;
                            }

                            case 1.11: pos = 0;
                            case 1.1: {
                                // Repalce x^2 on x**2 for eval() function
                                fxValue = fxValue.replace('^', "**");

                                if (pos) findABCPos(P, fxValue);
                                else findABCNeg(P, fxValue);

                                P.d = deltaFx(P.a, P.b, P.c);
                                if (P.d > 0) {
                                    X.x1 = x1Fx(P.a, P.b, P.d);
                                    X.x2 = x2Fx(P.a, P.b, P.d);
                                } else if (P.d == 0) {
                                    X.x12 = x12Fx(P.a, P.b);
                                    X.x1 = X.x2 = X.x12; 
                                } else {
                                    X.x1 = "Brak";
                                    X.x2 = "Brak";
                                }

                                W.p = pFx(P.a, P.b);
                                W.q = qFx(P.a, P.d);

                                // Round values
                                if (checkbox[2].style.backgroundColor == "rgb(9, 71, 113)") {
                                    if (X.x1 == "Brak" || X.x2 == "Brak") {
                                        X.x12 = Math.round(X.x12);
                                        W.p = Math.round(W.p);
                                        W.q = Math.round(W.q);
                                    } else {
                                        X.x1 = Math.round(X.x1);
                                        X.x2 = Math.round(X.x2);
                                        X.x12 = Math.round(X.x12);
                                        W.p = Math.round(W.p);
                                        W.q = Math.round(W.q);
                                    }
                                }
                                            
                                data.length = 0;
                                if (P.d > 0) drawDPos(fxValue, X, leftX, data);
                                else if (P.d == 0) drawDZero(fxValue, X, leftX, data);
                                else drawDNeg(fxValue, W, leftX, data);
            
                                // Show all divs driven by quadratic equation
                                squareDiv.forEach(s => s.style.display = "block");  
                                squreDesc.forEach(s => showDivs(s, P, W, X));
                                
                                checkForX(fxInp[2].value, data);
                                break;
                            }

                            case 4.11:
                            case 4.1: {
                                data.length = 0;
                                let P = findAPQXPos(a, p, q, x, fxValue);
                                    a = P.a; p = P.p; q = P.q; x = P.x;

                                drawHomoPos(a, p, q, x, leftX, data);
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            
                            case 6.11: {
                                fxValue = fxValue.split('|')[1];

                                data.length = 0;
                                if (fxValue == 'x') drawHomoTinyXNeg(leftX, data)
                                else drawLinearFx(-fxValue, 1, 1, leftX, data);
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            case 6.21: {
                                // Split '|' sign for eval() and Math.abs() functions
                                fxValue = fxValue.split('|')[1];
                                if(fxValue < 0) fxValue = Math.abs(fxValue);

                                data.length = 0;
                                if (fxValue == 'x') drawHomoTinyXNeg(leftX, data)
                                else if (fxValue == "-x") drawHomoTinyXPos(leftX, data)
                                else drawLinearFx(fxValue, 1, 1, leftX, data);
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            case 6.31: {           
                                // Split '|' sign for eval() and Math.abs() functions                                                  
                                fxValue = fxValue.split('|')[1];

                                data.length = 0;
                                if (fxValue == "-x") drawHomoTinyXNeg(leftX, data)
                                else drawLinearFx(fxValue, 1, 1, leftX, data);
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            case 6.1: {                             
                                // Split '|' sign for eval() and Math.abs() functions
                                fxValue = fxValue.split('|');
                                
                                data.length = 0;
                                a = findAPos(a, fxValue);
                                drawHomoShortPos(fxValue, a, leftX, data);

                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            case 6.2: { 
                                // Split '|' sign for eval() and Math.abs() functions                          
                                fxValue = fxValue.split('|')[1];
            
                                data.length = 0;
                                if (fxValue == 'x') drawHomoTinyXPos(leftX, data)
                                else drawLinearFx(fxValue, 1, 1, leftX, data);
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            case 7.1:
                            case 7.2:
                            case 7.3:
                            case 7.4: {
                                // Replace 'sin' word on 'Math.sin()' for eval() function
                                fxValue = fxValue.replace("sin", "Math.sin");
                                func2d.options.elements.line.tension = 0.7;

                                data.length = 0;
                                drawSinFx(fxValue, leftX, data);

                                checkForX(fxInp[2].value, data);
                                break;
                            }
                        }
                    }
                });

                // Set axis label
                func2d.data.datasets[0].label = fxValue.toString();
                    func2d.options.scales.xAxes[0].ticks.min = parseInt(leftX);
                    func2d.options.scales.xAxes[0].ticks.max = parseInt(rightX);
                func2d.update();
                break;
            }
            case "fx-show-x": {
                ptBgColour.length = 0;
                ptBorderCl.length = 0;
            
                checkForX(fxInp[2].value, data);
                func2d.update();
                break;
            }
        }
    });
});

checkbox[1].addEventListener("click", () => {
    ptBgColour.length = 0;
    ptBorderCl.length = 0;
    
    console.log(checkbox[1].style.backgroundColor);
    if (checkbox[1].style.backgroundColor == "rgb(188, 188, 188)") findZero(data); 
    else {
        checkForX(fxInp[2].value, data);
        checkbox[1].style.backgroundColor = "rgb(9, 71, 113)";
    } func2d.update();
});

checkbox.forEach(c => {
    c.addEventListener("click", () => {
        if (c.style.backgroundColor == "rgb(188, 188, 188)") {
            c.style.backgroundColor = "rgb(9, 71, 113)";
        } else c.style.backgroundColor = "rgb(188, 188, 188)";
    });
})
/*-!EVENTS!-*/

squareDiv.forEach(s => s.style.display = "none");
func2d = new Chart(ctx, chartProps);

// Quadratic Equation
////////////////////////////////////////////////////////////////
let deltaFx = (a, b, c) => {return b**2 - 4*a*c}
let x1Fx = (a, b, d) => {return ((-1*b) - Math.sqrt(d))/(2*a)}
let x2Fx = (a, b, d) => {return ((-1*b) + Math.sqrt(d))/(2*a)}
let x12Fx = (a, b) => {return (-1*b)/(2*a)}
let pFx = (a, b) => {return -b/(2*a)}
let qFx = (a, d) => {return -d/(4*a)}

function drawDPos(fx, X, range, data) {
    let leftX = range;
    let rightX = ~leftX+1;
    
    function f(x) {
        return eval(fx);
    }

    for (let x = leftX; x < X.x1; x++) {
        data.push({x: x, y: f(x)});
    }
    for (let x = X.x1; x < X.x2; x++) {
        if (x == X.x1) data.push({x: X.x1, y: 0});
        else data.push({x: x, y: f(x)});  
    }
    for (let x = X.x2; x < rightX; x++) {
        if (x == X.x2) data.push({x: X.x2, y: 0});
        else data.push({x: x, y: f(x)});
    }
}
function drawDNeg(fx, W, range, data) {
    let leftX = range;
    let rightX = ~leftX+1;
    
    function f(x) {
        return eval(fx);
    }

    for (let x = leftX; x < W.p; x++) {
        data.push({x: x, y: f(x)});
    }
    for (let x = W.p; x < rightX; x++) {
        data.push({x: x, y: f(x)});
    }
}
function drawDZero(fx, X, range, data) {
    let leftX = range;
    let rightX = ~leftX+1;
    
    function f(x) {
        return eval(fx);
    }

    for (let x = leftX; x < X.x12; x++) {
        data.push({x: x, y: f(x)});
    }
    for (let x = X.x12; x < rightX; x++) {
        data.push({x: x, y: f(x)});
    }
}

function findABCPos(P, fx) {
    const quad = require("./js/data/regExes").quad();
    quad.forEach(r => {
        switch (r.id) {
            case 0: {
                P.a = eval(r.re.exec(fx)[0]);
                if (P.a[0] === '+') P.a = P.a.split('+')[1];
                break;
            } case 1: {
                P.b = eval(r.re.exec(fx)[0]);
                if (P.b[0] === '+') P.b = P.b.split('+')[1];
                break;
            } case 2: { 
                P.c = eval(r.re.exec(fx)[0]);
                if (P.c[0] === '+') P.c = P.c.split('+')[1];
                break; 
            }   
        }
    });
}
function findABCNeg(P, fx) {
    const quadNeg = require("./js/data/regExes").quadNeg();
    quadNeg.forEach(r => {
        switch (r.id) {
            case 0: {
                P.a = r.re.exec(fx)[0];
                P.a = eval(P.a);
                break;
            } case 1: {
                P.b = r.re.exec(fx)[0];
                P.b = P.b.substr(1);
                P.b = eval(P.b);
                if (P.b[0] === '+') P.b = P.b.split('+')[1];
                break;
            } case 2: { 
                P.c = eval(r.re.exec(fx)[0]);
                if (P.c[0] === '+') P.c = P.c.split('+')[1];
                break; 
            }   
        }
    });
}

function showDivs(s, P, W, X) {
    switch (s.id) {
        case "d": {
            s.innerHTML = P.d;
            break;
        }
        case "x1": {
            s.innerHTML = X.x1;
            break;
        }
        case "x2": {
            s.innerHTML = X.x2;
            break;
        }
        case "W": {
            let wStr = '('+W.p+", "+W.q+')';
            s.innerHTML = wStr;
            break;
        }
    }
}
////////////////////////////////////////////////////////////////

// Homonymous equation
////////////////////////////////////////////////////////////////
function drawHomoPos(a, p, q, x, range, data) {
    let leftX = range;
    let rightX = ~range+1;
    let abs = 0;

    function f(x) {
        if (x < 0 || x > 0) abs = (a*Math.abs(x+p))+q;
        else abs = (a*Math.abs(0+p))+q;
        
        return abs;
    }

    if (x != 'x') { 
        fx = "a+b";
        a = a*Math.abs(x+p);
        drawLinearFx(fx, a, q, range, data)
    } else {
        for (let x = leftX; x < rightX; x++) {
            data.push({x: x, y: f(x)});
        }
    }
}
function drawHomoShortPos(fx, a, range, data) {
    let leftX = range;
    let rightX = ~range+1;

    function f(xp) {
        let x = Math.abs(xp);
        let buff = fx[0]+fx[1];

        return eval(buff)
    }

    for (let x = leftX; x < rightX; x++) {
        data.push({x:x, y: f(x)});
    }
}
function drawHomoTinyXPos(range, data) {
    let leftX = range;
    let rightX = ~range+1;

    function f(x) {
        return Math.abs(x);
    }

    for (let x = leftX; x < rightX; x++) {
        data.push({x:x, y: f(x)});
    }
}
function drawHomoTinyXNeg(range, data) {
    let leftX = range;
    let rightX = ~range+1;

    function f(x) {
        return Math.abs(x)*(-1);
    }

    for (let x = leftX; x < rightX; x++) {
        data.push({x:x, y: f(x)});
    }
}

function findAPQXPos(a, p, q, x, fx) {
    const abs = require("./js/data/regExes").abs();
    abs.forEach(r => {
        switch (r.id) {
            case 0: {
                a = eval(r.re.exec(fx)[0]);
                if (a[0] === '+') a = a.split('+')[1];

                break;
            } case 1: {
                p = eval(r.re.exec(fx)[0]);

                break;
            } case 2: { 
                q = eval(r.re.exec(fx)[0]);
                if (q[0] === '+') q = q.split('+')[1];

                break; 
            } case 3: {
                x = r.re.exec(fx)[0];
                x = x.split('|')[1];
                x = eval(x);
                if (x[0] === '+') x = x.split('+')[1];

                break;
            }
        }
    });
    const P = {a: a, x: x, p: p, q: q};
    return P;
}
function findAPos(a, fx) {
    a = eval(abs[0].re.exec(fx)[0]);
    if (a[0] === '+') a = a.split('+')[1];
    return a;
}
////////////////////////////////////////////////////////////////

// Linear equation
////////////////////////////////////////////////////////////////
function drawLinearFx(fx, a, b, range, data) {
    let leftX = range;
    let rightX = ~range+1;

    function f(x) {
        return eval(fx);
    }
    
    for (let x = leftX; x < rightX; x++) {
        data.push({x: x, y: f(x)});
    } 
}
////////////////////////////////////////////////////////////////

// Sinus graph
////////////////////////////////////////////////////////////////
function drawSinFx(fx, range, data) {
    let leftX = range;
    let rightX = ~range+1;

    function f(x) {
        return eval(fx).toFixed(3);
    }

    for (let x = leftX; x < rightX; x++) {
        data.push({x: x, y: f(x)});
    } 
}   
////////////////////////////////////////////////////////////////

function checkForX(x, obj) {
    checkbox[1].style.backgroundColor = "rgb(188, 188, 188)";
    obj.forEach(d => {
        if (d.x == x) {
            ptBgColour.push("#fff384");
            ptBorderCl.push("#fff");
        } else {
            ptBgColour.push("#cc3756");
            ptBorderCl.push("#000"); 
        }
    });
}

function findZero(obj) {
    obj.forEach(d => {
        if (d.y == 0) {
            ptBgColour.push("#003f1f");
            ptBorderCl.push("#fff");
        } else {
            ptBgColour.push("#cc3756");
            ptBorderCl.push("#000"); 
        }
    });
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