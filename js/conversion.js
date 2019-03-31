/*--INFO--*/
// Author: Hubert Batkiewicz
// Contributors: Patryk Piszczek
/*-!INFO!-*/

/*--SETUP--*/
const curr = require("./js/data/conv").currency();
const time = require("./js/data/conv").time();
const volume = require("./js/data/conv").volume();
const it = require("./js/data/conv").itConv();

const {spansText} = require("./js/data/conv");

const btn = document.querySelector(".fx-btn");
    
const cvInp = document.querySelector(".cv-inp");
const curResult = document.querySelector("#curr_result");
const curReplace = document.querySelector(".cur-span-replace");
const curSelect = document.querySelectorAll(".cur-select");
const curSpan = document.querySelectorAll(".cur-span");
/*--SETUP--*/

/*--RUN--*/
loadCurrency();

function loadCurrency() {
    // Loading currency list
    laodElements(curSelect, curr);
    spansText(curSpan, "currency");

    const options = document.querySelectorAll(".currency_from .cur-select option");
    curReplace.innerHTML = options[0].value;

    /*--EVENTS--*/    
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
    /*-!EVENTS!-*/
}

function loadTime() {
    // Loading currency list
    laodElements(curSelect, time);
    spansText(curSpan, "time");

    const options = document.querySelectorAll(".currency_from .cur-select option");
    curReplace.innerHTML = options[0].value;

    /*--EVENTS--*/
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
    /*-!EVENTS!-*/
}

function loadVolume() {
    // Loading currency list
    laodElements(curSelect, volume);
    spansText(curSpan, "volume");

    const options = document.querySelectorAll(".currency_from .cur-select option");
    curReplace.innerHTML = options[0].value;

    /*--EVENTS--*/
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
    /*-!EVENTS!-*/
}

function loadIt() {
    // Loading currency list
    laodElements(curSelect, it);
    spansText(curSpan, "it");

    const options = document.querySelectorAll(".currency_from .cur-select option");
    curReplace.innerHTML = options[0].value;

    /*--EVENTS--*/
    options.forEach(o => {
        o.addEventListener("click", () => {
            curReplace.innerHTML = o.value;
        });
    });

    btn.addEventListener("click", () => {
        const curFrom = curSelect[0].options[curSelect[0].selectedIndex].value.toString();
        const curTo = curSelect[1].options[curSelect[1].selectedIndex].value.toString();
        const howMuch = (cvInp.value).toString();
        
        const result = convert(curFrom, curTo, howMuch, "it");
        
        if (result === "ZABRONIONE") curResult.innerHTML = result;
        else curResult.innerHTML = result + ' ' + curTo;
    });
    /*-!EVENTS!-*/
}

function convert(from, to, howMuch, type) {
    switch(type) {
        case "it": {
            const {itConvert} = require("./js/data/conv");
            return itConvert(from, to, howMuch);
        }
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

function laodElements(where, data) {
    where.forEach(w => {
        const range = document.createRange();
            range.selectNodeContents(w);
            range.deleteContents();
        
        data.forEach(d => {
            w.appendChild(
                document.createRange().createContextualFragment(d)
            );
        });
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