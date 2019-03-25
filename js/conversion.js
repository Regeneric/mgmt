/*--INFO--*/
// Author: Hubert Batkiewicz
// Contributors: Patryk Piszczek
/*-!INFO!-*/

/*--SETUP--*/
const curr = require("./js/data/conv").currency();
const time = require("./js/data/conv").time();
const volume = require("./js/data/conv").volume();

const btn = document.querySelector(".fx-btn");
    
const cvInp = document.querySelector(".cv-inp");
const curResult = document.querySelector("#curr_result");
const curReplace = document.querySelector(".cur-span-replace");
/*--SETUP--*/

/*--RUN--*/
loadCurrency();

function loadCurrency() {
    // Loading currency list
    const curSelect = document.querySelectorAll(".cur-select");
    curSelect.forEach(cs => {
        const range = document.createRange();
            range.selectNodeContents(cs);
            range.deleteContents();
    });
    curSelect.forEach(cs => {
        curr.forEach(c => {
            cs.appendChild(
                document.createRange().createContextualFragment(c)
            );
        });
    })
    
    const curSpan = document.querySelectorAll(".cur-span");
    curSpan.forEach(cs => {
        switch(cs.id) {
            case "value": {
                cs.innerHTML = "Wartość: ";
                break;
            }
            case "from": {
                cs.innerHTML = "Waluta z:";
                break;   
            }
            case "to": {
                cs.innerHTML = "Waluta na:";
                break;
            }
        }
    });

    const options = document.querySelectorAll(".currency_from .cur-select option");
    curReplace.innerHTML = options[0].value;

    options.forEach(o => {
        o.addEventListener("click", () => {
            curReplace.innerHTML = o.value;
        });
    });
    
    btn.addEventListener("click", () => {
        const curFrom = curSelect[0].options[curSelect[0].selectedIndex].value.toString();
        const curTo = curSelect[1].options[curSelect[1].selectedIndex].value.toString();
        const howMuch = parseFloat(cvInp.value);
            
        const base = curFrom;
        const api = "https://api.exchangeratesapi.io/latest?base=" + base;
    
        fetch(api)
            .then(data => data.json())
            .then(json => {
                Object.entries(json).forEach(key => {
                    Object.entries(key[1]).forEach(k => {
                        if (k[0] == curTo) {
                            const result = (k[1]*howMuch).toFixed(2);
                            curResult.innerHTML = result + ' ' + curTo;
                        }
                    });
                });
            })
        .catch(err => console.log(err));
    });
}

function loadTime() {
    const curSelect = document.querySelectorAll(".cur-select");
    curSelect.forEach(cs => {
        const range = document.createRange();
        range.selectNodeContents(cs);
        range.deleteContents();
    });

    curSelect.forEach(cs => {
        time.forEach(t => {
            cs.appendChild(
                document.createRange().createContextualFragment(t)
            );
        });
    });

    const curSpan = document.querySelectorAll(".cur-span");
    curSpan.forEach(cs => {
        switch(cs.id) {
            case "value": {
                cs.innerHTML = "Wartość: ";
                break;
            }
            case "from": {
                cs.innerHTML = "Czas z:";
                break;   
            }
            case "to": {
                cs.innerHTML = "Czas na:";
                break;
            }
        }
    });

    const options = document.querySelectorAll(".currency_from .cur-select option");
    curReplace.innerHTML = options[0].value;

    options.forEach(o => {
        o.addEventListener("click", () => {
            curReplace.innerHTML = o.value;
        });
    });

    btn.addEventListener("click", () => {
        const curFrom = curSelect[0].options[curSelect[0].selectedIndex].value.toString();
        const curTo = curSelect[1].options[curSelect[1].selectedIndex].value.toString();
        const howMuch = parseFloat(cvInp.value);

        if (curFrom == curTo) curResult.innerHTML = howMuch + ' ' + curTo;
        else {
            const result = convert(curFrom, curTo, howMuch, "time");
            curResult.innerHTML = parseFloat(result).toFixed(2) + ' ' + curTo;
        }
    });
}

function loadVolume() {
    const curSelect = document.querySelectorAll(".cur-select");
    curSelect.forEach(cs => {
        const range = document.createRange();
        range.selectNodeContents(cs);
        range.deleteContents();
    });

    curSelect.forEach(cs => {
        volume.forEach(v => {
            cs.appendChild(
                document.createRange().createContextualFragment(v)
            );
        });
    });

    const curSpan = document.querySelectorAll(".cur-span");
    curSpan.forEach(cs => {
        switch(cs.id) {
            case "value": {
                cs.innerHTML = "Wartość: ";
                break;
            }
            case "from": {
                cs.innerHTML = "Objętość z:";
                break;   
            }
            case "to": {
                cs.innerHTML = "Objętość na:";
                break;
            }
        }
    });

    const options = document.querySelectorAll(".currency_from .cur-select option");
    curReplace.innerHTML = options[0].value;

    options.forEach(o => {
        o.addEventListener("click", () => {
            curReplace.innerHTML = o.value;
        });
    });

    btn.addEventListener("click", () => {
        const curFrom = curSelect[0].options[curSelect[0].selectedIndex].value.toString();
        const curTo = curSelect[1].options[curSelect[1].selectedIndex].value.toString();
        const howMuch = parseFloat(cvInp.value);

        if (curFrom == curTo) curResult.innerHTML = howMuch + ' ' + curTo;
        else {
            const result = convert(curFrom, curTo, howMuch, "volume");
            curResult.innerHTML = parseFloat(result).toFixed(2) + ' ' + curTo;
        }
    });
}

function convert(from, to, howMuch, type) {
    switch(type) {
        case "time": {
            const {timeConvert} = require("./js/data/conv");
            return timeConvert(from, to, howMuch);
        }
        case "volume": {
            const {volumeConvert} = require("./js/data/conv");
            return volumeConvert(from, to, howMuch);
        }
    }
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