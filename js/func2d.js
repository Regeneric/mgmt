/*--SETUP--*/
const math = require("mathjs");
const chart = require("chart.js");

// const body = document.querySelector("body").style.backgroundColor = "#fff";
const ctx = document.getElementById("func2d-chart").getContext("2d");

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
                    precision: 200,
                    min: -25,
                    max: 25
                }
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
        id: 11,
        name: "linearFxNeg",
        fx: /^.([0-9]{1,11}|a)\*x(\+|\-)([0-9]{1,11}|b)$/
        // -a*x+b
    }, {
        id: 1,
        name: "linearFxShort",
        fx: /^x(\+|\-)([0-9]{1,11}|b)$/
        // x+b
    }, {
        id: 12,
        name: "linearFxShortNeg",
        fx: /^.x(\+|\-)([0-9]{1,11}|b)$/
        // -x+b
    }, {
        id: 2,
        name: "genSquareFx",
        fx: /^([0-9]{1,6}|a)\*x\^2(\+|\-)([0-9]{1,6}|b)\*x(\+|\-)([0-9]{1,6}|c)$/
        // a*x^2+b*x+c
    }, {
        id: 13,
        name: "genSquareFxNeg",
        fx: /^.([0-9]{1,6}|a)\*x\^2(\+|\-)([0-9]{1,6}|b)\*x(\+|\-)([0-9]{1,6}|c)$/
        // -a*x^2+b*x+c
    }, {
        id: 3, // do poprawy
        name: "genSquareFxTiny",
        fx: /^([0-9]{1,20}|a)\*x\^2$/
        // a*x^2
    }, {
        id: 14, // do poprawy
        name: "genSquareFxTinyNeg",
        fx: /^(.[0-9]{1,20}|a)\*x\^2$/
        // -a*x^2
    }, {
        id: 4,
        name: "ratSquareFx",
        fx: /^([0-9]{1,5}|a)\*\(x(\+|\-)([0-9]{1,5}|b)\)\*\(x(\+|\-)([0-9]{1,6}|c)\)$/
        // a*(x-b)*(x-c)
    }, {
        id: 15,
        name: "ratSquareFxNeg",
        fx: /^.([0-9]{1,5}|a)\*\(x(\+|\-)([0-9]{1,5}|b)\)\*\(x(\+|\-)([0-9]{1,6}|c)\)$/
        // -a*(x-b)*(x-c)
    }, {
        id: 5,
        name: "canSquareFx",
        fx: /^([0-9]{1,6}|a)\*\(x(\+|\-)([0-9]{1,6}|p)\)\^2(\+|\-)([0-9]{1,6}|q)$/
        // a*(x-p)^2+q
    }, {
        id: 16,
        name: "canSquareFxNeg",
        fx: /^.([0-9]{1,6}|a)\*\(x(\+|\-)([0-9]{1,6}|p)\)\^2(\+|\-)([0-9]{1,6}|q)$/
        // -a*(x-p)^2+q
    }, {
        id: 6, // do poprawy
        name: "absValueFx",
        fx: /^([0-9]{1,6}|a)\*\|x(\+|\-)([0-9]{1,6}|p)\|(\+|\-)([0-9]{1,7}|q)$/
        // a*|x-p|+q
    }, {
        id: 17, // do poprawy
        name: "absValueFxNeg",
        fx: /^.([0-9]{1,6}|a)\*\|x(\+|\-)([0-9]{1,6}|p)\|(\+|\-)([0-9]{1,7}|q)$/
        // -a*|x-p|+q
    }, {
        id: 7,
        name: "homoFx",
        fx: /^([0-9]{1,7}|a)\/\(x(\+|\-)([0-9]{1,7}|p)\)(\+|\-)([0-9]{1,7}|q)$/
        // a/(x-p)+q
    }, {
        id: 18,
        name: "homoFxNeg",
        fx: /^.([0-9]{1,7}|a)\/\(x(\+|\-)([0-9]{1,7}|p)\)(\+|\-)([0-9]{1,7}|q)$/
        // -a/(x-p)+q
    }, {
        id: 8,
        name: "homoFxShort",
        fx: /^([0-9]{1,20}|a)\/x$/
        // a/x
    }, {
        id: 19,
        name: "homoFxShortNeg",
        fx: /^.([0-9]{1,20}|a)\/x$/
        // -a/x
    }, {
        id: 9,
        name: "thirdPolyFx",
        fx: /^([0-9]{1,3}|a)\*x\^3(\+|\-)([0-9]{1,3}|b)\*x\^2(\+|\-)([0-9]{1,4}|c)\*x(\+|-)([0-9]{1,4}|p)$/
        // a*x^3+b*x^2+c*x+p
    }, {
        id: 10,
        name: "absValueFxShort",
        fx: /^\|x\|$/
        // |x|
    }, {
        id: 21,
        name: "absValueFxShort",
        fx: /^.\|x\|$/
        // -|x|
    }]; 

    const regQuad = [{
        id: 0,
        name: "regA",
        re: /^.[0-9]{0,6}/g
    }, {
        id: 1,
        name: "regB",
        re: /(?=)(\+|\-)[0-9]{1,6}/g
    }, {
        id: 2,
        name: "regC",
        re: /(?=)(\+|\-)[0-9]{1,6}$/g
    }];
    const regQuadNeg = [{
        id: 0,
        name: "regA",
        re: /^.[0-9]{0,6}/g
    }, {
        id: 1,
        name: "regB",
        re: /[0-9]{1}(\+|\-)[0-9]{1,6}/g
    }, {
        id: 2,
        name: "regC",
        re: /(?=)(\+|\-)[0-9]{1,6}$/g
    }];

    const regAbs = [{
        id: 0,
        name: "regA",
        re: /^.[0-9]{0,6}/g
    }, {
        id: 1,
        name: "regB",
        re: /\|x(\+|\-)[0-9]{1,6}\|/
    }, {
        id: 2,
        name: "regC",
        re: /(?=)(\+|\-)[0-9]{1,6}$/g
    }];
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/
fxBtn[0].addEventListener("click", () => {
    func2d.options.elements.line.tension = 0.3;
    squareDiv.forEach(s => s.style.display = "none");

    rightX = fxInp[0].value;
    leftX = ~rightX+1; 

    fxValue = fxInp[1].value
    fxInp[3].checked = false;
    func2d.destroy();

    regExes.forEach(r => {
        if (r.fx.test(fxValue)) {
            switch(r.id) {
                // Funkcja liniowa i inne proste
                case 0:
                case 11:
                case 1:
                case 12:
                case 3:
                case 14:
                case 4:
                case 15:
                case 5:
                case 16:
                case 7:
                case 18:
                case 8: 
                case 19: {
                    fxValue = r.fx.exec(fxValue)[0];
                    fxValue = fxValue.replace('^', "**");  // Zamienia x^2 na x**2 przy funkcji kwadratowej
                    let a = b = c = p = q = 1;

                    function f(x) {
                        console.log(eval(fxValue));
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
                case 2: {
                    fxValue = r.fx.exec(fxValue)[0];
                    let a = b = c = p = q = 1;
                    let W = {p: 0, q: 0};

                    if (pos) {
                        regQuad.forEach(r => {
                            switch (r.id) {
                                case 0: {
                                    a = r.re.exec(fxValue)[0];
                                    if (a[0] === '+') a = a.split('+')[1];
                                    break;
                                } case 1: {
                                    b = r.re.exec(fxValue);
                                    if (b[0] === '+') b = b.split('+')[1];
                                    break;
                                } case 2: { 
                                    c = r.re.exec(fxValue)[0];
                                    if (c[0] === '+') c = c.split('+')[1];
                                    break; 
                                }   
                            }
                        });
                    } else {
                        regQuadNeg.forEach(r => {
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

                    let d = deltaFx(a, b, c);
                    let x1 = x1Fx(a, b, d);
                    let x2 = x2Fx(a, b, d);

                    p = pFx(a, b);
                    q = qFx(a, d);
                        W.p = p;
                        W.q = q;

                    function f(x) {
                        console.log(eval(fxValue));
                        return eval(fxValue);
                    }

                    // trzeba jakoś zwiększyć dokładność rysowanej paraboli
                    data.length = 0;

                    for (let x = leftX; x < x1; x++) {
                        data.push({x: x, y:f(x)});
                    }
                    for (let x = x1; x < W.p; x++) {
                        data.push({x: x, y:f(x)});
                    }
                    for (let x = W.p; x < x2; x++) {
                        data.push({x: x, y:f(x)});
                    }
                    for (let x = x2; x < rightX; x++) {
                        data.push({x: x, y:f(x)});
                    }

                    // 1*x^2-2*x-8

                    squareDiv.forEach(s => s.style.display = "block");                
                    squreDesc.forEach(s => {
                        switch (s.id) {
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
                    });
                    
                    checkForX(fxInp[2].value, data);
                    break;
                }
                case 17:
                case 6: {
                    // a*|x-p|+q
                    fxValue = r.fx.exec(fxValue)[0];
                    let a = b = c = p = q = 1;

                    regAbs.forEach(r => {
                        switch (r.id) {
                            case 0: {
                                a = r.re.exec(fxValue)[0];
                                if (a[0] === '+') a = a.split('+')[1];
                                break;
                            } case 1: {
                                b = r.re.exec(fxValue)[0];
                                b = b.split('|')[1];
                                break;
                            } case 2: { 
                                c = r.re.exec(fxValue)[0];
                                if (c[0] === '+') c = c.split('+')[1];
                                break; 
                            }   
                        }
                    });

                    function f(x) {
                        let res = eval(b);
                        return (a*Math.abs(res))+c;
                    }

                    data.length = 0;
                    for (let x = leftX; x < rightX; x++) {
                        data.push({x:x,y:f(x)});
                    } 

                    checkForX(fxInp[2].value, data);
                    break;
                }
                case 9:
                case 21: {
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
                case 10: {
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
}); 

fxBtn[1].addEventListener("click", () => {
    ptBgColour.length = 0;
    ptBorderCl.length = 0;

    checkForX(fxInp[2].value, data);
    func2d.update();
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