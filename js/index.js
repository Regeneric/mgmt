/*--SETUP--*/
const ipcRenderer = require("electron").ipcRenderer;
const remote = require("electron").remote;

const title = document.querySelector(".title");
const titleBtns = document.querySelectorAll(".title-btn");
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
    /*-!EVENTS!-*/
});
/*-!RUN!-*/