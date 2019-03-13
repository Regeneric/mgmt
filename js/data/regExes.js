module.exports = {
    fx: function() {
        const fx = [{
            id: 0.1, //0
            name: "linearFx",
            fx: /^([0-9]{1,7}|a)\*([0-9]{1,7}|x)(\+|\-)([0-9]{1,7}|b)$/
            // a*x+b
            // 3*x+b
            // 3*x+3
            // 3*3+b
            // 3*3+3
        }, {
            id: 0.2, //1
            name: "linearFxShortAdd",
            fx: /^([0-9]{1,11}|x)(\+|\-)([0-9]{1,11}|b)$/
            // x+b
            // 3+b
            // x+3
            // 3+3
        }, {
            id: 0.3, //nowe
            name: "linearFxShortMult",
            fx: /^([0-9]{1,11}|a)\*([0-9]{1,11}|x)$/
            // a*x
            // 3*x
            // a*3
            // 3*3
        }, {
            id: 0.4, //nowe
            name: "linearFxTiny",
            fx: /^[0-9]{1,20}$/
            // 3
        }, 

        {
            id: 1.1, //2
            name: "genSquareFx",
            fx: /^([0-9]{1,6}|a)\*([0-9]{1,6}|x)\^2(\+|\-)([0-9]{1,6}|b)\*([0-9]{1,5}|x)(\+|\-)([0-9]{1,6}|c)$/
            // a*x^2+b*x+c
            // 3*x^2+b*x+c
            // a*3^2+b*x+c
            // a*x^2+3*x+c
            // a*x^2+b*3+c
            // a*x^2+b*x+3
            // 3*3^2+b*x+c
            // 3*x^2+3*x+c
            // 3*x^2+b*3+c
            // 3*x^2+b*x+3
            // 3*3^2+3*x+c
            // 3*3^2+b*3+c
            // 3*3^2+b*x+3
            // 3*3^2+3*3+c
            // 3*3^2+3*3+3
            // dodać x^2+b*x+c
        }, {
            id: 1.2, //3
            name: "genSquareFxShort",
            fx: /^([0-9]{1,10}|a)\*([0-9]{1,10}|x)\^2$/
            // a*x^2
            // 3*x^2
            // a*3^2
            // 3*3^2
        }, {
            id: 1.3, //nowe
            name: "genSquareFxTiny",
            fx: /^([0-9]{1,20}|x)\^2$/
            // x^2
            // 3^2
        }, {
            id: 2.1, //4
            name: "ratSquareFx",
            fx: /^([0-9]{1,5}|a)\*\(([0-9]{1,5}|x)(\+|\-)([0-9]{1,5}|b)\)\*\(([0-9]{1,5}|x)(\+|\-)([0-9]{1,6}|c)\)$/
            // a*(x-b)*(x-c)
            // 3*(x-b)*(x-c)
            // a*(3-b)*(3-c)
            // a*(x-3)*(x-c)
            // a*(x-b)*(x-3)
            // 3*(3-b)*(3-c)
            // 3*(x-3)*(x-c)
            // 3*(x-b)*(x-3)
            // 3*(3-3)*(3-c)
            // 3*(3-b)*(3-3)
            // 3*(3-3)*(3-3)
            // dodać (x-b)*(x-c)
        }, {
            id: 3.1, //5
            name: "canSquareFx",
            fx: /^([0-9]{1,6}|a)\*\(([0-9]{1,5}|x)(\+|\-)([0-9]{1,6}|p)\)\^2(\+|\-)([0-9]{1,6}|q)$/
            // a*(x-p)^2+q
            // 3*(x-p)^2+q
            // a*(3-p)^2+q
            // a*(x-3)^2+q
            // a*(x-p)^2+3
            // 3*(3-p)^2+q
            // 3*(x-3)^2+q
            // 3*(x-p)^2+3
            // 3*(x-3)^2+3
            // 3*(3-3)^2+q
            // 3*(3-3)^2+3
            // dodać (x-p)^2+q
        },
        
        {
            id: 4.1, //6
            name: "absValueFx",
            fx: /^([0-9]{1,6}|a)\*\|([0-9]{1,5}|x)(\+|\-)([0-9]{1,6}|p)\|(\+|\-)([0-9]{1,7}|q)$/
            // a*|x-p|+q
            // 3*|x-p|+q
            // a*|3-p|+q
            // a*|x-3|+q
            // a*|x-p|+3
            // 3*|3-p|+q
            // 3*|x-3|+q
            // 3*|x-p|+3
            // 3*|3-3|+q
            // 3*|3-p|+3
            // 3*|3-3|+q
            // dodać |x-p|+q
        }, 
        
        {
            id: 5.1, //7
            name: "homoFx",
            fx: /^([0-9]{1,7}|a)\/\(x(\+|\-)([0-9]{1,7}|p)\)(\+|\-)([0-9]{1,7}|q)$/
            // a/(x-p)+q
        }, {
            id: 5.2, //8
            name: "homoFxShort",
            fx: /^([0-9]{1,20}|a)\/x$/
            // a/x
        }, 
        
        {
            id: 6.1, //nowe
            name: "absValueFxShort",
            fx: /^([0-9]{1,8}|a)\*\|([0-9]{1,8}|x)\|$/
            // a*|x|
            // 3*|x|
            // a*|3|
            // 3*|3|
        }, {
            id: 6.2, //10
            name: "absValueFxTiny",
            fx: /^\|([0-9]{1,20}|x)\|$/
            // |x|
            // |3|
        }, 
        
        
        {
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
            re: /(?=)(\+|\-)([0-9]{1,6}|b)/g
        }, {
            id: 2,
            name: "regC",
            re: /(?=)(\+|\-)([0-9]{1,6}|c)$/g
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
            name: "regP",
            re: /(\-|\+)([0-9]{1,7}|p)/
        }, {
            id: 2,
            name: "regQ",
            re: /(?=)(\+|\-)([0-9]{1,6}|\q)$/g
        }, {
            id: 3,
            name: "regX",
            re: /\|([0-9]{1,7}|x)/g
        }]; return regAbs;
    }
}