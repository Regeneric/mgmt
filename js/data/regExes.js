module.exports = {
    fx: function() {
        const fx = [{
            id: 0.1,
            name: "linearFx",
            fx: /^([0-9]{1,7}|a)\*([0-9]{1,7}|x)(\+|\-)([0-9]{1,7}|b)$/
            // a*x+b
            // 3*x+b
            // 3*x+3
            // 3*3+b
            // 3*3+3
        }, {
            id: 0.2,
            name: "linearFxShortAdd",
            fx: /^([0-9]{1,11}|x)(\+|\-)([0-9]{1,11}|b)$/
            // x+b
            // 3+b
            // x+b
            // 3+3
        }, {
            id: 0.3,
            name: "linearFxShortMult",
            fx: /^([0-9]{1,11}|a)\*([0-9]{1,11}|x)$/
            // a*x
            // 3*x
            // a*3
            // 3*3
        }, {
            id: 0.4,
            name: "linearFxTiny",
            fx: /^[0-9]{1,20}$/
            // 3
        },

        {
            id: 1.1,
            name: "genSquareFx",
            fx: /^([0-9]{1,6}|a)\*x\^2(\+|\-)([0-9]{1,6}|b)\*x(\+|\-)([0-9]{1,6}|c)$/
            // a*x^2+b*x+c
            // 3*x^2+b*c+c
            // 
        }, 
        
        
        {
            id: 3, // do poprawy
            name: "genSquareFxTiny",
            fx: /^([0-9]{1,20}|a)\*x\^2$/
            // a*x^2
        }, {
            id: 4,
            name: "ratSquareFx",
            fx: /^([0-9]{1,5}|a)\*\(x(\+|\-)([0-9]{1,5}|b)\)\*\(x(\+|\-)([0-9]{1,6}|c)\)$/
            // a*(x-b)*(x-c)
        }, {
            id: 5,
            name: "canSquareFx",
            fx: /^([0-9]{1,6}|a)\*\(x(\+|\-)([0-9]{1,6}|p)\)\^2(\+|\-)([0-9]{1,6}|q)$/
            // a*(x-p)^2+q
        }, {
            id: 6, // do poprawy
            name: "absValueFx",
            fx: /^([0-9]{1,6}|a)\*\|x(\+|\-)([0-9]{1,6}|p)\|(\+|\-)([0-9]{1,7}|q)$/
            // a*|x-p|+q
        }, {
            id: 7,
            name: "homoFx",
            fx: /^([0-9]{1,7}|a)\/\(x(\+|\-)([0-9]{1,7}|p)\)(\+|\-)([0-9]{1,7}|q)$/
            // a/(x-p)+q
        }, {
            id: 8,
            name: "homoFxShort",
            fx: /^([0-9]{1,20}|a)\/x$/
            // a/x
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
            id: 11,
            name: "linearFxNeg",
            fx: /^.([0-9]{1,11}|a)\*x(\+|\-)([0-9]{1,11}|b)$/
            // -a*x+b
        }, {
            id: 12,
            name: "linearFxShortNeg",
            fx: /^.x(\+|\-)([0-9]{1,11}|b)$/
            // -x+b
        }, {
            id: 13,
            name: "genSquareFxNeg",
            fx: /^.([0-9]{1,6}|a)\*x\^2(\+|\-)([0-9]{1,6}|b)\*x(\+|\-)([0-9]{1,6}|c)$/
            // -a*x^2+b*x+c
        }, {
            id: 14, // do poprawy
            name: "genSquareFxTinyNeg",
            fx: /^(.[0-9]{1,20}|a)\*x\^2$/
            // -a*x^2
        }, {
            id: 15,
            name: "ratSquareFxNeg",
            fx: /^.([0-9]{1,5}|a)\*\(x(\+|\-)([0-9]{1,5}|b)\)\*\(x(\+|\-)([0-9]{1,6}|c)\)$/
            // -a*(x-b)*(x-c)
        }, {
            id: 16,
            name: "canSquareFxNeg",
            fx: /^.([0-9]{1,6}|a)\*\(x(\+|\-)([0-9]{1,6}|p)\)\^2(\+|\-)([0-9]{1,6}|q)$/
            // -a*(x-p)^2+q
        }, {
            id: 17, // do poprawy
            name: "absValueFxNeg",
            fx: /^.([0-9]{1,6}|a)\*\|x(\+|\-)([0-9]{1,6}|p)\|(\+|\-)([0-9]{1,7}|q)$/
            // -a*|x-p|+q
        }, {
            id: 18,
            name: "homoFxNeg",
            fx: /^.([0-9]{1,7}|a)\/\(x(\+|\-)([0-9]{1,7}|p)\)(\+|\-)([0-9]{1,7}|q)$/
            // -a/(x-p)+q
        }, {
            id: 19,
            name: "homoFxShortNeg",
            fx: /^.([0-9]{1,20}|a)\/x$/
            // -a/x
        }, {
            id: 20,
            name: "absValueFxShortNeg",
            fx: /^.\|x\|$/
            // -|x|
        }]; return fx;
    },
    quad: function() {
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
        }]; return regQuad;
    }, 
    quadNeg: function() {
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
        }]; return regQuadNeg;
    },
    abs: function() {
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
        }]; return regAbs;
    }
}