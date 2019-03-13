/*--SETUP--*/
const chart = require("chart.js");

const fxFind = require("./js/data/regExes").fx();
    const quad = require("./js/data/regExes").quad();
    const quadNeg = require("./js/data/regExes").quadNeg();
    const abs = require("./js/data/regExes").abs();

const ctx = document.querySelector("#func2d-chart").getContext("2d");

const fxBtn = document.querySelectorAll(".fx-btn");
const fxInp = document.querySelectorAll(".fx-inp");

const squareDiv = document.querySelectorAll("#square");
const squreDesc = document.querySelectorAll(".fx-desc");
/*-!SETUP!-*/

/*--PROPS--*/
let fxValue = 0;
let func2d = null;
let pos = 1;

let rightX = 0;
let leftX = 0; 

const data = new Array();
const ptBgColour = new Array();
const ptBorderCl = new Array();

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
                squareDiv.forEach(s => s.style.display = "none");
            
                rightX = fxInp[0].value;
                leftX = ~rightX+1; 
            
                fxValue = fxInp[1].value
                fxInp[3].checked = false;
                func2d.destroy();
            
                fxFind.forEach(r => {
                    if (r.fx.test(fxValue)) {
                        switch(r.id) {
                            case 0.1:
                            case 0.2:
                            case 0.3:
                            case 0.4:
                            case 1.2:
                            case 1.3:
                            case 2.1:
                            case 3.1:
                            case 5.1:
                            case 5.2:
                            case 11:
                            case 12:
                            case 14:
                            case 15:
                            case 16:
                            case 18:
                            case 19: {
                                fxValue = r.fx.exec(fxValue)[0];
                                let a = b = c = p = q = 1;

                                // Zamienia x^2 na x**2 na potrzeby eval()
                                fxValue = fxValue.replace('^', "**");  
                                
                                data.length = 0;
                                drawLinearFx(fxValue, a, b, leftX, data);
            
                                checkForX(fxInp[2].value, data);
                                break;
                            }

                            case 13: pos = 0;
                            case 1.1: {
                                fxValue = r.fx.exec(fxValue)[0];

                                const P = {a: 1, b: 1, c: 1, p: 1, q: 1, d: 0};
                                const W = {p: 0, q: 0};
                                const X = {x1: 0, x2: 0};
            
                                if (pos) findABCPos(P, fxValue);
                                else findABCNeg(P, fxValue);
                                
                                // Zamienia x^2 na x**2 na potrzeby eval()
                                fxValue = fxValue.replace('^', "**");

                                P.d = deltaFx(P.a, P.b, P.c);
                                
                                X.x1 = x1Fx(P.a, P.b, P.d);
                                X.x2 = x2Fx(P.a, P.b, P.d);

                                W.p = pFx(P.a, P.b);
                                W.q = qFx(P.a, P.d);

                                if (fxInp[4].checked) {
                                    X.x1 = Math.round(X.x1);
                                    X.x2 = Math.round(X.x2);
                                    W.p = Math.round(W.p);
                                    W.q = Math.round(W.q);
                                }
                                            
                                data.length = 0;
                                if (P.d > 0) drawDPos(fxValue, X, leftX, data);
                                else if (P.d == 0) console.log("Delta 0");
                                else drawDNeg(fxValue, W, leftX, data);
            
                                squareDiv.forEach(s => s.style.display = "block");          
                                squreDesc.forEach(s => showDivs(s, P, W, X));
                                
                                checkForX(fxInp[2].value, data);
                                break;
                            }

                            case 17:
                            case 4.1: {
                                fxValue = r.fx.exec(fxValue)[0];
                                let a = b = c = x = p = q = 1;

                                data.length = 0;
                                let P = findAPQXPos(a, p, q, x, fxValue);
                                    a = P.a; p = P.p; q = P.q; x = P.x;

                                drawHomoPos(a, p, q, x, leftX, data);
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            
                            case 20: {
                                fxValue = r.fx.exec(fxValue)[0];
                                fxValue = fxValue.split('|')[1];
            
                                function f(x) {
                                    return Math.abs(x)*(-1);
                                }
            
                                data.length = 0;
                                for (let x = leftX; x < rightX; x++) {
                                    data.push({x:x,y:f(x)});
                                }
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            case 6.1: {
                                fxValue = r.fx.exec(fxValue)[0];
                                fxValue = fxValue.split('|');
                                let a = 1;
                                
                                data.length = 0;
                                a = findAPos(a, fxValue);
                                drawHomoShortPos(fxValue, a, leftX, data);
                                console.log(fxValue);

                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            case 6.2: {
                                fxValue = r.fx.exec(fxValue)[0];
                                fxValue = fxValue.split('|')[1];
            
                                data.length = 0;
                                if (fxValue == 'x') drawHomoTinyXPos(leftX, data)
                                else drawLinearFx(fxValue, 1, 1, leftX, data);
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                        }
                    }
                });
            
                func2d = new Chart(ctx, chartProps);
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

fxInp[3].addEventListener("click", () => {
    ptBgColour.length = 0;
    ptBorderCl.length = 0;

    if (fxInp[3].checked) findZero(data); 
    func2d.update();
});
/*-!EVENTS!-*/

squareDiv.forEach(s => s.style.display = "none");
func2d = new Chart(ctx, chartProps);

// Quadratic Equation
////////////////////////////////////////////////////////////////
let deltaFx = (a, b, c) => {return b**2 - 4*a*c}
let x1Fx = (a, b, d) => {return -b - Math.sqrt(d)/(2*a)}
let x2Fx = (a, b, d) => {return -b + Math.sqrt(d)/(2*a)}
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
        console.log('y', f(x), 'x', x);
    }
    for (let x = X.x1; x < X.x2; x++) {
        data.push({x: x, y: f(x)});
        console.log('y', f(x), 'x', x);   
    }
    for (let x = X.x2; x < rightX; x++) {
        data.push({x: x, y: f(x)});
        console.log('y', f(x), 'x', x);
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
        console.log('y', f(x), 'x', x);
    }
    for (let x = W.p; x < rightX; x++) {
        data.push({x: x, y: f(x)});
        console.log('y', f(x), 'x', x);
    }
}

function findABCPos(P, fx) {
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
    quadNeg.forEach(r => {
        switch (r.id) {
            case 0: {
                P.a = r.re.exec(fx)[0];
                if (P.a[0] === '+') P.a = P.a.split('+')[1];
                break;
            } case 1: {
                P.b = r.re.exec(fx)[0];
                P.b = P.b.substr(1);
                if (P.b[0] === '+') P.b = P.b.split('+')[1];
                break;
            } case 2: { 
                P.c = r.re.exec(fx)[0];
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

function findAPQXPos(a, p, q, x, fx) {
    abs.forEach(r => {
        switch (r.id) {
            case 0: {
                a = eval(r.re.exec(fx)[0]);
                if (a[0] === '+') a = a.split('+')[1];
                break;
            } case 1: {
                p = eval(r.re.exec(fx)[0]);
                // if (p[0] === '+') p = p.split('+')[1];
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

function checkForX(x, obj) {
    fxInp[3].checked = false;
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