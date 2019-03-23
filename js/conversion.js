/*--INFO--*/
// Author: Hubert Batkiewicz
/*-!INFO!-*/

/*--SETUP--*/
const time = require("./data/time");
    const {secToMin, minToHr, hrToDay, dayToWeek, weekToMnt, mntToYear, yearToDec, decToAge} = time;
/*--SETUP--*/


/*--PROPS--*/
let input = 232323;
let type1 = "sec";
let type2 = "min";
/*-!PROPS!-*/


/*--RUN--*/
(() => {
    console.log(secToMin({
        input: input,
        growing: false
    }));
})();

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