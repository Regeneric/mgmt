/*--INFO--*/
// Author: Hubert Batkiewicz
/*-!INFO!-*/

module.exports = {
    fx: () => {
        const fx = [{
            id: 0.1,
            name: "linearFx",
            fx: /^(\+|\-){0,1}(\d{0,10}|a)[*]{0,1}[(]{0,1}(\d{1,10}|x)[)]{0,1}(\+|\-){0,1}(\d{0,10}|b)$/,
            desc: [
                "a*x+b",
                "a*x+b",
                "3*x+b",
                "3*x+3",
                "3*3+b",
                "3*3+3",
                "3+b",
                "x+3",
                "3+3",
                "a*x",
                "3*x",
                "a*3",
                "3*3",
                "3",
                "-a*x+b",
                "-a*x+b",
                "-3*x+b",
                "-3*x+3",
                "-3*3+b",
                "-3*3+3",
                "-3+b",
                "-x+3",
                "-3+3",
                "-a*x",
                "-3*x",
                "-a*3",
                "-3*3",
                "-3"
            ]
        },        {
            id: 0.11,
            name: "linearFxNegAll",
            fx: /^[-]{1}([\d]{1,7}|a)\*\([-]{1}([\d]{1,7}|x)\)(\+|\-)([\d]{1,7}|b)$/,
            desc: [
                "-a*(-x)+b",
                "-3*(-x)+b",
                "-a*(-3)+b",
                "-a*(-x)+3",
                "-3*(-3)+b",
                "-3*(-x)+3",
                "-3*(-3)+3"
            ]
        }, {
            id: 0.21,
            name: "linearFxNegX",
            fx: /^([\d]{1,7}|a)\*\([-]{1}([\d]{1,7}|x)\)(\+|\-)([\d]{1,7}|b)$/,
            desc: [
                "a*(-x)+b",
                "3*(-x)+b",
                "a*(-3)+b",
                "a*(-x)+3",
                "3*(-3)+b",
                "3*(-x)+3",
                "3*(-3)+3"
            ]
        }, {
            id: 0.31,
            name: "linearFxShortNegAllAdd",
            fx: /^[-]{1}([\d]{1,11}|x)(\+|\-)\([-]{1}([\d]{1,11}|b)\)$/,
            desc: [
                "-x+(-b)",
                "-3+(-b)",
                "-x+(-3)",
                "-3+(-3)"
            ]
        }, {
            id: 0.41,
            name: "linearFxShortNegBAdd",
            fx: /^([\d]{1,11}|x)(\+|\-)\([-]{1}([\d]{1,11}|b)\)$/,
            desc: [
                "x+(-b)",
                "3+(-b)",
                "x+(-3)",
                "3+(-3)"
            ]
        }, {
            id: 0.51,
            name: "linearFxShortNegAllMult",
            fx: /^[-]{1}([\d]{1,11}|a)\*\([-]{1}([\d]{1,11}|x)\)$/,
            desc: [
                "-a*(-x)",
                "-3*(-x)",
                "-a*(-3)",
                "-3*(-3)"
            ]
        }, {
            id: 0.61,
            name: "linearFxShortNegBAdd",
            fx: /^([\d]{1,11}|a)\*\([-]{1}([\d]{1,11}|x)\)$/,
            desc: [
                "a*(-x)",
                "3*(-x)",
                "a*(-3)",  
                "3*(-3)"
            ]
        },

        
        {
            id: 1.1,
            name: "genSquareFx",
            fx: /^([\d]{1,6}|a)\*([\d]{1,6}|x)\^2(\+|\-)([\d]{1,6}|b)\*([\d]{1,5}|x)(\+|\-)([\d]{1,6}|c)$/,
            desc: [
                "a*x^2+b*x+c",
                "3*x^2+b*x+c",
                "a*3^2+b*x+c",
                "a*x^2+3*x+c",
                "a*x^2+b*3+c",
                "a*x^2+b*x+3",
                "3*3^2+b*x+c",
                "3*x^2+3*x+c",
                "3*x^2+b*3+c",
                "3*x^2+b*x+3",
                "3*3^2+3*x+c",
                "3*3^2+b*3+c",
                "3*3^2+b*x+3",
                "3*3^2+3*3+c",
                "3*3^2+3*3+3"
            ] // dodać x^2+b*x+c
        }, {
            id: 1.2,
            name: "genSquareFxShort",
            fx: /^([\d]{1,10}|a)\*([\d]{1,10}|x)\^2$/,
            desc: [
                "a*x^2",
                "3*x^2",
                "a*3^2",
                "3*3^2"
            ]
        }, {
            id: 1.3,
            name: "genSquareFxTiny",
            fx: /^([\d]{1,20}|x)\^2$/,
            desc: [
                "x^2",
                "3^2"
            ]
        }, {
            id: 1.11,
            name: "genSquareFxNeg",
            fx: /^[-]{1}([\d]{1,6}|a)\*([\d]{1,6}|x)\^2(\+|\-)([\d]{1,6}|b)\*([\d]{1,5}|x)(\+|\-)([\d]{1,6}|c)$/,
            desc: [
                "-a*x^2+b*x+c",
                "-3*x^2+b*x+c",
                "-a*3^2+b*x+c",
                "-a*x^2+3*x+c",
                "-a*x^2+b*3+c",
                "-a*x^2+b*x+3",
                "-3*3^2+b*x+c",
                "-3*x^2+3*x+c",
                "-3*x^2+b*3+c",
                "-3*x^2+b*x+3",
                "-3*3^2+3*x+c",
                "-3*3^2+b*3+c",
                "-3*3^2+b*x+3",
                "-3*3^2+3*3+c",
                "-3*3^2+3*3+3"
            ]
        }, {
            id: 1.12,
            name: "genSquareFxTinyNeg",
            fx: /^[-]{1}([\d]{1,10}|a)\*([\d]{1,10}|x)\^2$/,
            desc: [
                "-a*x^2",
                "-3*x^2",
                "-a*3^2",
                "-3*3^2"
            ]
        }, 

        
        {
            id: 2.1,
            name: "ratSquareFx",
            fx: /^([\d]{1,5}|a)\*\([-]{0,1}([\d]{1,5}|x)(\+|\-|\/|\*)([\d]{1,5}|b)\)\*\([-]{0,1}([\d]{1,5}|x)(\+|\-|\/|\*)([\d]{1,6}|c)\)$/,
            desc: [
                "a*(x-b)*(x-c)",
                "3*(x-b)*(x-c)",
                "a*(3-b)*(3-c)",
                "a*(x-3)*(x-c)",
                "a*(x-b)*(x-3)",
                "3*(3-b)*(3-c)",
                "3*(x-3)*(x-c)",
                "3*(x-b)*(x-3)",
                "3*(3-3)*(3-c)",
                "3*(3-b)*(3-3)",
                "3*(3-3)*(3-3)",
                "a*(x*b)*(x*c)",
                "a*(x/b)*(x/c)",
                "a*(-x-b)*(-x-c)"
            ] // dodać (x-b)*(x-c)
        }, {
            id: 2.11,
            name: "ratSquareFxNeg",
            fx: /^[-]{1}([\d]{1,5}|a)\*\([-]{0,1}([\d]{1,5}|x)(\+|\-|\/|\*)([\d]{1,5}|b)\)\*\([-]{0,1}([\d]{1,5}|x)(\+|\-|\/|\*)([\d]{1,6}|c)\)$/,
            desc: [
                "-a*(x-b)*(x-c)",
                "-3*(x-b)*(x-c)",
                "-a*(3-b)*(3-c)",
                "-a*(x-3)*(x-c)",
                "-a*(x-b)*(x-3)",
                "-3*(3-b)*(3-c)",
                "-3*(x-3)*(x-c)",
                "-3*(x-b)*(x-3)",
                "-3*(3-3)*(3-c)",
                "-3*(3-b)*(3-3)",
                "-3*(3-3)*(3-3)",
                "-a*(x*b)*(x*c)",
                "-a*(x/b)*(x/c)",
                "-a*(-x-b)*(-x-c)",
            ]
        }, 
        {
            id: 3.1,
            name: "canSquareFx",
            fx: /^([\d]{1,6}|a)\*\([-]{0,1}([\d]{1,5}|x)(\+|\-|\/|\*)([\d]{1,6}|p)\)\^2(\+|\-|\/|\*)([\d]{1,6}|q)$/,
            desc: [
                "a*(x-p)^2+q",
                "3*(x-p)^2+q",
                "a*(3-p)^2+q",
                "a*(x-3)^2+q",
                "a*(x-p)^2+3",
                "3*(3-p)^2+q",
                "3*(x-3)^2+q",
                "3*(x-p)^2+3",
                "3*(x-3)^2+3",
                "3*(3-3)^2+q",
                "3*(3-3)^2+3",
                "a*(-x-p)^2+q",
                "a*(x*p)^2*q",
                "a*(x/p)^2/q"
            ] // dodać (x-p)^2+q
        }, {
            id: 3.11,
            name: "canSquareFxNeg",
            fx: /^[-]{1}([\d]{1,6}|a)\*\([-]{0,1}([\d]{1,5}|x)(\+|\-|\/|\*)([\d]{1,6}|p)\)\^2(\+|\-|\/|\*)([\d]{1,6}|q)$/,
            desc: [
                "-a*(x-p)^2+q",
                "-3*(x-p)^2+q",
                "-a*(3-p)^2+q",
                "-a*(x-3)^2+q",
                "-a*(x-p)^2+3",
                "-3*(3-p)^2+q",
                "-3*(x-3)^2+q",
                "-3*(x-p)^2+3",
                "-3*(x-3)^2+3",
                "-3*(3-3)^2+q",
                "-3*(3-3)^2+3",
                "-a*(-x-p)^2+q",
                "-a*(x*p)^2*q",
                "-a*(x/p)^2/q"
            ]
        }, 
        

        {
            id: 4.1,
            name: "absValueFx",
            fx: /^([\d]{1,6}|a)\*\|([\d]{1,5}|x)(\+|\-)([\d]{1,6}|p)\|(\+|\-)([\d]{1,7}|q)$/,
            desc: [
                "a*|x-p|+q",
                "3*|x-p|+q",
                "a*|3-p|+q",
                "a*|x-3|+q",
                "a*|x-p|+3",
                "3*|3-p|+q",
                "3*|x-3|+q",
                "3*|x-p|+3",
                "3*|3-3|+q",
                "3*|3-p|+3",
                "3*|3-3|+q"
            ] // dodać |x-p|+q
        }, {
            id: 4.11, //17
            name: "absValueFxNeg",
            fx: /^[-]{1}([\d]{1,6}|a)\*\|[-]{0,1}([\d]{1,5}|x)(\+|\-)([\d]{1,6}|p)\|(\+|\-)([\d]{1,7}|q)$/,
            desc: [
                "-a*|x-p|+q",
                "-3*|x-p|+q",
                "-a*|3-p|+q",
                "-a*|x-3|+q",
                "-a*|x-p|+3",
                "-3*|3-p|+q",
                "-3*|x-3|+q",
                "-3*|x-p|+3",
                "-3*|3-3|+q",
                "-3*|3-p|+3",
                "-3*|3-3|+q"
            ]
        },

        
        {
            id: 5.1, // dokończyć
            name: "homoFx",
            fx: /^[-]{0,1}([\d]{1,7}|a)\/\([-]{0,1}([\d]{1,7}|x)(\+|\-)([\d]{1,7}|p)\)(\+|\-)([\d]{1,7}|q)$/,
            desc: [
                "a/(x-p)+q",
                "3/(x-p)+q",
                "a/(3-p)+q",
                "a/(x-3)+q",
                "a/(x-p)+3",
                "3/(3-p)+q",
                "3/(x-3)+q",
                "3/(x-p)+3",
                // "3/(3-3)+q",
                "3/(3-p)+3",
                // "3/(3-3)+3",
                "-a/(x-p)+q",
                "-3/(x-p)+q",
                "-a/(3-p)+q",
                "-a/(x-3)+q",
                "-a/(x-p)+3",
                "-3/(3-p)+q",
                "-3/(x-3)+q",
                "-3/(x-p)+3",
                // "-3/(3-3)+q",
                "-3/(3-p)+3",
                // "-3/(3-3)+3"
                "-a/(-x-p)+q",
                "-3/(-x-p)+q",
                "-a/(-3-p)+q",
                "-a/(-x-3)+q",
                "-a/(-x-p)+3",
                "-3/(-3-p)+q",
                "-3/(-x-3)+q",
                "-3/(-x-p)+3",
                // "-3/(-3-3)+q",
                "-3/(-3-p)+3",
                // "-3/(-3-3)+3"
                "a/(-x-p)+q",
                "3/(-x-p)+q",
                "a/(-3-p)+q",
                "a/(-x-3)+q",
                "a/(-x-p)+3",
                "3/(-3-p)+q",
                "3/(-x-3)+q",
                "3/(-x-p)+3",
                // "3/(-3-3)+q",
                "3/(-3-p)+3",
                // "3/(-3-3)+3",
            ]
        }, {
            id: 5.2,
            name: "homoFxShort",
            fx: /^[-]{0,1}([\d]{1,7}|a)\/[-]{0,1}([\d]{1,7}|x)(\+|\-)([\d]{1,7}|q)$/,
            desc: [
                "a/x+q",
                "3/x+q",
                "a/3+q",
                "a/x+3",
                "3/3+q",
                "3/x+3",
                "3/3+3",
                "-a/x+q",
                "-3/x+q",
                "-a/3+q",
                "-a/x+3",
                "-3/3+q",
                "-3/x+3",
                "-3/3+3",
                "a/-x+q",
                "3/-x+q",
                "a/-3+q",
                "a/-x+3",
                "3/-3+q",
                "3/-x+3",
                "3/-3+3",
                "-a/-x+q",
                "-3/-x+q",
                "-a/-3+q",
                "-a/-x+3",
                "-3/-3+q",
                "-3/-x+3",
                "-3/-3+3"
            ]
        }, {
            id: 5.3,
            name: "homoFxTiny",
            fx: /^[-]{0,1}([\d]{1,12}|a)\/[-]{0,1}([\d]{1,12}|x)$/,
            desc: [
                "a/x",
                "3/x",
                "a/3",
                "3/3",
                "-a/x",
                "-3/x",
                "-a/3",
                "-3/3",
                "a/-x",
                "3/-x",
                "a/-3",
                "3/-3",
                "-a/-x",
                "-3/-x",
                "-a/-3",
                "-3/-3"
            ]
        },
        

        {
            id: 6.1,
            name: "absValueFxShort",
            fx: /^([\d]{1,8}|a)\*\|([\d]{1,8}|x)\|$/,
            desc: [
                "a*|x|",
                "3*|x|",
                "a*|3|",
                "3*|3|"
            ]
        }, {
            id: 6.2,
            name: "absValueFxTiny",
            fx: /^\|([\d]{1,20}|x)\|$/,
            desc: [
                "|x|",
                "|3|"
            ]
        }, {
            id: 6.11,
            name: "absValueFxTinyNegAbs",
            fx: /^[-]{1}\|([\d]{1,20}|x)\|$/,
            desc: [
                "-|x|",
                "-|3|"
            ]
        }, {
            id: 6.21,
            name: "absValueFxTinyNegX",
            fx: /^\|[-]{1}([\d]{1,20}|x)\|$/,
            desc: [
                "|-x|",
                "|-3|"
            ]
        }, {
            id: 6.31,
            name: "absValueFxTinyNegAll",
            fx: /^[-]{1}\|[-]{1}([\d]{1,20}|x)\|$/,
            desc: [
                "-|-x|",
                "-|-3|"
            ]
        }, 
        
        
        {
            id: 7.1,
            name: "sinusFxLong",
            fx: /^[-]{0,1}([\d]{1,11}|a)\*sin\([-]{0,1}([\d]{1,11}|x)(\+|\-|\*|\/)([\d]{1,11}|b)\)(\+|\-|\*|\/)([\d]{1,11}|c)$/,
            desc: [
                "a*sin(x*b)+c"
            ]
        }, {
            id: 7.2,
            name: "sinusFx",
            fx: /^[-]{0,1}([\d]{1,11}|a)\*sin\([-]{0,1}([\d]{1,11}|x)\)(\+|\-|\*|\/)([\d]{1,11}|c)$/,
            desc: [
                "a*sin(x)+c"
            ]
        }, {
            id: 7.3,
            name: "sinusFxShort",
            fx: /^[-]{0,1}sin\([-]{0,1}([\d]{1,11}|x)\)(\+|\-|\*|\/)([\d]{1,11}|c)$/,
            desc: [
                "sin(x)+c"
            ]
        }, {
            id: 7.4,
            name: "sinusFx",
            fx: /^[-]{0,1}sin\([-]{0,1}([\d]{1,11}|x)\)$/,
            desc: [
                "sin(x)"
            ]
        }]; return fx;
    },
    quad: () => {
        const regQuad = [{
            id: 0,
            name: "regA",
            re: /^([\d]{1,6}|a)/g
        }, {
            id: 1,
            name: "regB",
            re: /(?=)(\+|\-)([\d]{1,6}|b)/g
        }, {
            id: 2,
            name: "regC",
            re: /(?=)(\+|\-)([\d]{1,6}|c)$/g
        }]; return regQuad;
    }, 
    quadNeg: () => {
        const regQuadNeg = [{
            id: 0,
            name: "regA",
            re: /^[-]{1}([\d]{1,6}|a)/g
        }, {
            id: 1,
            name: "regB",
            re: /[\d]{1}(\+|\-)([\d]{1,6}|b)/g
        }, {
            id: 2,
            name: "regC",
            re: /(?=)(\+|\-)([\d]{1,6}|c)$/g
        }]; return regQuadNeg;
    },
    abs: () => {
        const regAbs = [{
            id: 0,
            name: "regA",
            re: /^[-]{0,1}([\d]{1,6}|a)/g
        }, {
            id: 1,
            name: "regP",
            re: /(\-|\+)([\d]{1,7}|p)/
        }, {
            id: 2,
            name: "regQ",
            re: /(?=)(\+|\-)([\d]{1,6}|q)$/g
        }, {
            id: 3,
            name: "regX",
            re: /\|[-]{0,1}([\d]{1,7}|x)/g
        }]; return regAbs;
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