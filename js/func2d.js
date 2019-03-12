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
                            // Funkcja liniowa i inne proste
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
                                fxValue = fxValue.replace('^', "**");  // Zamienia x^2 na x**2 przy funkcji kwadratowej
                                let a = b = c = p = q = 1;

                                function f(x) {
                                    return eval(fxValue);
                                }
            
                                data.length = 0;
                                for (let x = leftX; x < rightX; x++) {
                                    data.push({x:x,y:f(x)});
                                } 
            
                                checkForX(fxInp[2].value, data);
                                break;
                            }

                            case 13: {
                                pos = 0;
                            }
                            case 1.1: {
                                fxValue = r.fx.exec(fxValue)[0];
                                let a = b = c = p = q = 1;
                                let W = {p: 0, q: 0};
            
                                if (pos) {
                                    quad.forEach(r => {
                                        switch (r.id) {
                                            case 0: {
                                                a = eval(r.re.exec(fxValue)[0]);
                                                if (a[0] === '+') a = a.split('+')[1];
                                                break;
                                            } case 1: {
                                                b = eval(r.re.exec(fxValue)[0]);
                                                if (b[0] === '+') b = b.split('+')[1];
                                                break;
                                            } case 2: { 
                                                c = eval(r.re.exec(fxValue)[0]);
                                                if (c[0] === '+') c = c.split('+')[1];
                                                break; 
                                            }   
                                        }
                                    });
                                } else {
                                    quadNeg.forEach(r => {
                                        switch (r.id) {
                                            case 0: {
                                                a = r.re.exec(fxValue)[0];
                                                if (a[0] === '+') a = a.split('+')[1];
                                                break;
                                            } case 1: {
                                                b = r.re.exec(fxValue)[0];
                                                b = b.substr(1);
                                                if (b[0] === '+') b = b.split('+')[1];
                                                break;
                                            } case 2: { 
                                                c = r.re.exec(fxValue)[0];
                                                if (c[0] === '+') c = c.split('+')[1];
                                                break; 
                                            }   
                                        }
                                    });
                                }
                                
                                fxValue = fxValue.replace('^', "**");  // Zamienia x^2 na x**2 przy funkcji kwadratowej
                                console.log(fxValue);

                                let d = deltaFx(a, b, c);
                                let x1 = x1Fx(a, b, d);
                                let x2 = x2Fx(a, b, d);
                                    // x1 = x1.toFixed(2);
                                    // x2 = x2.toFixed(2);
                                    x1 = Math.round(x1);
                                    x2 = Math.round(x2);

                                p = pFx(a, b);
                                q = qFx(a, d);
                                    // p = p.toFixed(2);
                                    // q = q.toFixed(2);
                                    p = Math.round(p);
                                    q = Math.round(q);

                                W.p = p;
                                W.q = q;
                                
                                console.log("a", a, "b", b, "c", c, "d", d, "p", p, "q", q, "x1", x1, "x2", x2);
                                function f(x) {
                                    return eval(fxValue);
                                }
            
                                data.length = 0;
                                if (d > 0){
                                    for (let x = leftX; x < x1; x++) {
                                        data.push({x: x, y: f(x)});
                                        console.log('y', f(x), 'x', x);
                                    }
                                    // for (let x = x1; x < W.p; x++) {
                                    //     data.push({x: x, y: f(x)});
                                    //     console.log('y', f(x), 'x', x);
                                    //     console.log('y', f(x), 'x', x);
                                    // }
                                    // for (let x = W.p; x < x2; x++) {
                                    //     data.push({x: x, y: f(x)});
                                    //     console.log('y', f(x), 'x', x);
                                    // }
                                    for (let x = x2; x < rightX; x++) {
                                        data.push({x: x, y: f(x)});
                                        console.log('y', f(x), 'x', x);
                                    }
                                } else {
                                    for (let x = leftX; x < W.p; x++) {
                                        data.push({x: x, y: f(x)});
                                        console.log('y', f(x), 'x', x);
                                    }
                                    for (let x = W.p; x < rightX; x++) {
                                        data.push({x: x, y: f(x)});
                                        console.log('y', f(x), 'x', x);
                                    }
                                }
                                // 1*x^2-2*x-8
            
                                squareDiv.forEach(s => s.style.display = "block");          
                                squreDesc.forEach(s => {
                                    if (d > 0) {
                                        switch (s.id) {
                                            case "d": {
                                                s.innerHTML = d;
                                                break;
                                            }
                                            case "x1": {
                                                s.innerHTML = x1;
                                                break;
                                            }
                                            case "x2": {
                                                s.innerHTML = x2;
                                                break;
                                            }
                                            case "W": {
                                                let wStr = '('+W.p+", "+W.q+')';
                                                s.innerHTML = wStr;
                                                break;
                                            }
                                        }
                                    } else {
                                        switch (s.id) {
                                            case "d": {
                                                s.innerHTML = d;
                                                break;
                                            }
                                            case "x1": {
                                                s.style.display = "none";
                                                break;
                                            }
                                            case "x2": {
                                                s.style.display = "none";
                                                break;
                                            }
                                            case "W": {
                                                let wStr = '('+W.p+", "+W.q+')';
                                                s.innerHTML = wStr;
                                                break;
                                            }
                                        }
                                    }
                                });
                                
                                checkForX(fxInp[2].value, data);
                                break;
                            }

                            case 17:
                            case 4.1: {
                                // a*|x-p|+q
                                fxValue = r.fx.exec(fxValue)[0];
                                let a = b = c = p = q = 1;

                                abs.forEach(r => {
                                    switch (r.id) {
                                        case 0: {
                                            a = eval(r.re.exec(fxValue)[0]);
                                            if (a[0] === '+') a = a.split('+')[1];
                                            break;
                                        } case 1: {
                                            p = eval(r.re.exec(fxValue)[0]);
                                            if (p[0] === '+') p = p.split('+')[1];
                                            break;
                                        } case 2: { 
                                            q = eval(r.re.exec(fxValue)[0]);
                                            if (q[0] === '+') q = q.split('+')[1];
                                            break; 
                                        }   
                                    }
                                });
            
                                function f(x) {
                                    return (a*Math.abs(eval(x-p)))+q;
                                }
            
                                data.length = 0;
                                for (let x = leftX; x < rightX; x++) {
                                    data.push({x:x,y:f(x)});
                                } 
            
                                func2d.options.elements.line.tension = 0;
                                checkForX(fxInp[2].value, data);
                                break;
                            }
                            
                            case 9:
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
                            case 6.1:
                            case 6.2: {
                                fxValue = r.fx.exec(fxValue)[0];
                                fxValue = fxValue.split('|')[1];
            
                                function f(x) {
                                    return Math.abs(x);
                                }
            
                                data.length = 0;
                                for (let x = leftX; x < rightX; x++) {
                                    data.push({x:x,y:f(x)});
                                }
            
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

// Funkcja kwadratowa
let deltaFx = (a, b, c) => {return b**2 - 4*a*c}
let x1Fx = (a, b, d) => {return -b - Math.sqrt(d)/(2*a)}
let x2Fx = (a, b, d) => {return -b + Math.sqrt(d)/(2*a)}
let pFx = (a, b) => {return -b/(2*a)}
let qFx = (a, d) => {return -d/(4*a)}

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