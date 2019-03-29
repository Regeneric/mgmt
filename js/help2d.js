/*--INFO--*/
// Author: Hubert Batkiewicz
/*-!INFO!-*/

/*--SETUP--*/
const button = '<button class="btn1"></button>';
const btnDiv = document.querySelector(".vertical-btn");

const helpBtns = document.querySelectorAll(".help-btn");

const fx = require("./js/data/regExes").fx();
const desc = new Array();
/*-!SETUP!-*/

/*--PROPS--*/
let cnt = 0;
// fx.forEach(f => {
//     desc.push(f.desc[0]);
// });

// desc.forEach(d => console.log(d));
/*-!PROPS!-*/

/*--RUN--*/
helpBtns.forEach(hb => {
    hb.addEventListener("click", () => {
        if (hb.id == "bttn1") {
            cnt = 0; 
            const range = document.createRange();
                range.selectNodeContents(btnDiv);
                range.deleteContents();
    
            fx.forEach(f => {
                if (f.id < 1) {
                    btnDiv.appendChild(
                        document.createRange().createContextualFragment(button)
                    ); cnt++;   
                } 
            });
            
            const domBtn = document.querySelectorAll(".btn1");
            domBtn.forEach(db => {
                db.className = "btn"+cnt;
            });
    
            fx.forEach((f, i) => {
                if (f.id < 1) {
                    domBtn[i].innerHTML = f.desc[0];
                    console.log("i", i, "domBtn.length", domBtn.length);
                } 
            });
        } else if (hb.id == "bttn2") {
            cnt = 0;
            const range = document.createRange();
                range.selectNodeContents(btnDiv);
                range.deleteContents();
    
            fx.forEach(f => {
                if (f.id >= 1 && f.id < 4) {
                    btnDiv.appendChild(
                        document.createRange().createContextualFragment(button)
                    ); cnt++;   
                } 
            });
            
            const domBtn = document.querySelectorAll(".btn1");
            domBtn.forEach(db => {
                db.className = "btn"+cnt;
            });
    
            fx.forEach((f, i) => {
                if (f.id >= 1 && f.id < 4) {
                    domBtn[i].innerHTML = f.desc[0];
                    console.log("i", i, "domBtn.length", domBtn.length);
                } 
            });
        }
    });
});

/*-!RUN!-*/ 