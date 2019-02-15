/*--SETUP--*/
const ipcRenderer = require("electron").ipcRenderer;
const remote = require("electron").remote;

const title = document.querySelector(".title");
const titleBtns = document.querySelectorAll(".title-btn");

const menu = document.querySelectorAll(".menu ul li");
const menuDrop = document.querySelectorAll(".menu ul .dropdown");
const liDropEl = document.querySelectorAll(".menu ul .li-drop");

const closeImg = document.querySelector("#closeImg");
const site = document.querySelector("html");
/*-!SETUP!-*/

/*--PROPS--*/
let win = null;
/*-!PROPS!-*/

/*--RUN--*/
titleBtns.forEach(btn => {
    /*--EVENTS--*/
    btn.addEventListener("click", () => {
        switch(btn.id) {
            case "mini": {
                win = remote.getCurrentWindow();
                win.minimize();
                break;
            } case "maxi": {
                break;
            } case "close": {
                win = remote.getCurrentWindow();
                win.close();
                break;
            }
        }
    });

    btn.addEventListener("mouseover", () => {
        btn.id == "close" ? closeImg.src = "img/close-title-ml.png" : null;
    });
    btn.addEventListener("mouseout", () => {
        btn.id == "close" ? closeImg.src = "img/close-title-m.png" : null;
    });
    /*-!EVENTS!-*/
});

/*--EVENTS--*/
menu.forEach(m => {
    m.addEventListener("click", () => {
        switch(m.id) {
            case "file": {
                menuDrop[0].style.display = "block";
                break;
            }
            case "edit": {
                menuDrop[1].style.display = "block";
                break;
            }
            case "help": {
                menuDrop[2].style.display = "block";
                break;
            }
        }
    });
});

menuDrop.forEach(m => {
    m.addEventListener("mouseleave", () => {
        site.addEventListener("mousedown", () => {
            m.style.display = "none";
        });
    });
});

// site.addEventListener("mousedown", () => {
//     menuDrop.forEach(md => {
//         md.style.display = "none";
//     });
// });

liDropEl.forEach(ld => {
    ld.addEventListener("click", () => {
        ld.id == "theme" ? console.log("Dupsko") :
        console.log("Pupcia");
    });
});
/*-!EVENTS!-*/
/*-!RUN!-*/