/*--SETUP--*/
const ipcRenderer = require("electron").ipcRenderer;
const remote = require("electron").remote;

const title = document.querySelector(".title");
const titleBtns = document.querySelectorAll(".title-btn");

const menu = document.querySelectorAll(".menu ul li");
const menuDrop = document.querySelectorAll(".menu ul .dropdown");

const closeImg = document.querySelector("#closeImg");
const site = document.querySelector("html");
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

menu.forEach(function(m) {
    /*--EVENTS--*/
    m.addEventListener("click", function() {
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
    /*-!EVENTS!-*/
});

site.addEventListener("mousedown", function() {
    menuDrop.forEach(function(md) {
        md.style.display = "none";
    });

    menu.forEach(function(m) {
        // m.style.backgroundColor = "#3c3c3c";
    });
});
/*-!RUN!-*/