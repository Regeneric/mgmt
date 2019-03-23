/*--INFO--*/
// Author: Hubert Batkiewicz
/*-!INFO!-*/

module.exports = {
    secToMin: (obj) => {
        if (obj.growing) return (obj.input/60).toFixed(6);
        else return (obj.input*60).toFixed(6);
    },
    minToHr: () => {
        return "minToHr ok";
    },
    hrToDay: () => {
        return "hrToDay ok";
    },
    dayToWeek: () => {
        return "dayToWeek ok";
    },
    weekToMnt: () => {
        return "weekToMnt ok";
    },
    mntToYear: () => {
        return "mntToYear ok";
    },
    yearToDec: () => {
        return "yearToDec ok";
    },
    decToAge: () => {
        return "decToAge ok";
    }
}


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