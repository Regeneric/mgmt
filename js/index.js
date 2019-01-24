/*--SETUP--*/
const ipcRenderer = require("electron").ipcRenderer;
const remote = require("electron").remote;

const titleBtns = document.querySelectorAll(".title-btn");
/*-!SETUP!-*/

/*--PROPS--*/
let win = null;
/*-!PROPS!-*/

/*--RUN--*/
titleBtns.forEach(function(btn) {
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
            }
        }
    });
});
/*-!RUN!-*/