/*--SETUP--*/
// const ipcRenderer = require("electron").ipcRenderer;
const remote = require("electron").remote;

const title = document.querySelector(".title");
    const titleBtns = document.querySelectorAll(".title-btn");

const menu = document.querySelectorAll(".menu ul li");
    const menuDrop = document.querySelectorAll(".menu ul .dropdown");
    const liDrop = document.querySelectorAll(".menu ul .li-drop");

const closeImg = document.querySelector("#closeImg");
const site = document.querySelector("main");
/*-!SETUP!-*/

/*--PROPS--*/
let win = null;
let file = edit = help = 1;

const funcProp = {
    dir: __dirname,
    file: "func2d.html",
    protocol: "file:",
    slashes: true
};
const func3DProp = {
    dir: __dirname,
    file: "func3d.html",
    protocol: "file:",
    slashes: true
};

const scienceProp = {
    dir: __dirname,
    file: "science.html",
    protocol: "file:",
    slashes: true
};
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
            } 
            case "maxi": break;
            case "close": {
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
                file = edit = help += 1; // do zmiany
                if (!(file % 2)) menuDrop[0].style.display = "block";
                else menuDrop[0].style.display = "none";
                
                menuDrop[1].style.display = "none";
                menuDrop[2].style.display = "none";
                break;
            } case "edit": {
                file = edit = help += 1; // do zmiany
                if (!(edit % 2)) menuDrop[1].style.display = "block";
                else menuDrop[1].style.display = "none";

                menuDrop[0].style.display = "none";
                menuDrop[2].style.display = "none";
                break;
            } case "help": {
                file = edit = help += 1; // do zmiany
                if (!(help % 2)) menuDrop[2].style.display = "block";
                else menuDrop[2].style.display = "none";

                menuDrop[0].style.display = "none";
                menuDrop[1].style.display = "none";
                break;
            }
        }
    });
});

liDrop.forEach(ld => {
    ld.addEventListener("click", () => {
        win = remote.getCurrentWindow();
        win.setResizable(true);
        
        switch(ld.id) {
            case "base": {
                win.setSize(330, 510);
                win = loadWindow(win, mainProp);
                break;
            } case "func2d": { 
                win.setSize(1290, 730);
                win = loadWindow(win, funcProp);
                break;
            } case "poss-funcs": {
                const ipcRenderer = require("electron").ipcRenderer;
                    ipcRenderer.send("popCreate", 1);
                    ipcRenderer.send("help2dShow", 1);
                break;
            } case "func3d": {
                win.setSize(1280, 730);
                win = loadWindow(win, func3DProp);
                break;
            } case "science": {
                win.setSize(1280, 730);;
                win = loadWindow(win, scienceProp);
                break;
            }
        }
        win.setResizable(false);
    });
});

menuDrop.forEach(md => {
    site.addEventListener("mousedown", () => {
        md.style.display = "none";
    });
});
/*-!EVENTS!-*/
/*-!RUN!-*/