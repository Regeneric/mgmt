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

        let milis = null;

        if (curFrom == curTo) curResult.innerHTML = howMuch + ' ' + curTo;
        else {
            switch(curFrom) {
                case "SEK": {
                    milis = howMuch*1000;
                    break;
                }
                case "MIN": {
                    milis = howMuch*60*1000;
                    break;
                }
                case "HRS": {
                    milis = howMuch*60*60*1000;
                    break;
                }
                case "DAY": {
                    milis = howMuch*60*60*24*1000;
                    break;
                }
                case "WEK": {
                    milis = howMuch*60*60*24*7*1000;
                    break;
                }
                case "MNT": {
                    milis = howMuch*60*60*24*7*4*1000;
                    break;
                }
                case "YRS": {
                    milis = howMuch*60*60*24*7*4*12*1000;
                    break;
                }
                case "AGE": {
                    milis = howMuch*60*60*24*7*4*12*100*1000;
                    break;
                }
            }

            switch(curTo) {
                case "SEK": {
                    curResult.innerHTML = (milis/1000).toFixed(2) + ' ' + curTo;
                    break;
                }
                case "MIN": {
                    curResult.innerHTML = (milis/60/1000).toFixed(2) + ' ' + curTo;
                    break;
                }
                case "HRS": {
                    curResult.innerHTML = (milis/60/60/1000).toFixed(2) + ' ' + curTo;
                    break;
                }
                case "DAY": {
                    curResult.innerHTML = (milis/60/60/24/1000).toFixed(2) + ' ' + curTo;
                    break;
                }
                case "WEK": {
                    curResult.innerHTML = (milis/60/60/24/7/1000).toFixed(2) + ' ' + curTo;
                    break;
                }
                case "MNT": {
                    curResult.innerHTML = (milis/60/60/24/7/4/1000).toFixed(2) + ' ' + curTo;
                    break;
                }
                case "YRS": {
                    curResult.innerHTML = (milis/60/60/24/7/4/12/1000).toFixed(2) + ' ' + curTo;
                    break;
                }
                case "AGE": {
                    curResult.innerHTML = (milis/60/60/24/7/4/12/100/1000).toFixed(2) + ' ' + curTo;
                    break;
                }
            }
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