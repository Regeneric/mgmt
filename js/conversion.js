/*--INFO--*/
// Author: Hubert Batkiewicz
/*-!INFO!-*/

/*--SETUP--*/
// Currency
////////////////////////////////////////////////////////////////
const btn = document.querySelector(".fx-btn");

const cvInp = document.querySelector(".cv-inp");
const curSelect = document.querySelectorAll(".cur-select");
const curResult = document.querySelector("#curr_result");
////////////////////////////////////////////////////////////////

// Time
////////////////////////////////////////////////////////////////


// Volume
////////////////////////////////////////////////////////////////

/*--SETUP--*/

/*--RUN--*/
/*--EVENTS--*/

// Currency
////////////////////////////////////////////////////////////////
btn.addEventListener("click", () => {
    const curFrom = curSelect[0].options[curSelect[0].selectedIndex].value.toString();
    const curTo = curSelect[1].options[curSelect[1].selectedIndex].value.toString();
    const howMuch = cvInp.value;
        
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
////////////////////////////////////////////////////////////////

/*-!EVENTS!-*/
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