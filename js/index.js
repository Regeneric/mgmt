/*--SETUP--*/
const ipcRenderer = require("electron").ipcRenderer;
const remote = require("electron").remote;

const title = document.querySelector(".title");
const titleBtns = document.querySelectorAll(".title-btn");

const closeImg = document.querySelector("#closeImg");
/*-!SETUP!-*/

/*--PROPS--*/
let win = null;
/*-!PROPS!-*/

/*--RUN--*/
titleBtns.forEach(function(btn) {
    /*--EVENTS--*/
    btn.addEventListener("click", function() {
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

    btn.addEventListener("mouseover", function() {
        if (btn.id == "close") closeImg.src = "img/close-title-ml.png";
    });
    btn.addEventListener("mouseout", function() {
        if (btn.id == "close") closeImg.src = "img/close-title-m.png";
    });
    /*-!EVENTS!-*/
});
/*-!RUN!-*/