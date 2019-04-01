/*--INFO--*/
// Author: Hubert Batkiewicz
// Contributors: Gabriel Król
/*-!INFO!-*/

/*--SETUP--*/
const {remote} = require("electron");

const titleBtns = document.querySelectorAll(".title-btn");
const menu = document.querySelectorAll(".menu ul li");
    const menuDrop = document.querySelectorAll(".menu ul .dropdown");
    const liDrop = document.querySelectorAll(".menu ul .li-drop");

const closeImg = document.querySelector("#closeImg");
const site = document.querySelector("main");
/*-!SETUP!-*/

/*--PROPS--*/
let win = null;

const funcProp = windowProps("func2d.html");
const func3DProp = windowProps("func3d.html");

const scienceProp = windowProps("science.html");
const conversionProp = windowProps("conversion.html");
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
                if  (menuDrop[0].style.display == "none" || menuDrop[0].style.display == "") { 
                    menuDrop[0].style.display = "block";
                    menuDrop[1].style.display = "none";
                    menuDrop[2].style.display = "none";
                }
                else menuDrop[0].style.display = "none"
                break;
            } 
            case "edit": { 
                if  (menuDrop[1].style.display == "none" || menuDrop[1].style.display == "") { 
                    menuDrop[1].style.display = "block";
                    menuDrop[0].style.display = "none";
                    menuDrop[2].style.display = "none";
                }
                else menuDrop[1].style.display = "none"
                break;
            } case "help": {
                if  (menuDrop[2].style.display == "none" || menuDrop[2].style.display == "") { 
                    menuDrop[2].style.display = "block";
                    menuDrop[0].style.display = "none";
                    menuDrop[1].style.display = "none";
                }
                else menuDrop[2].style.display = "none"
                break;
            }
        }
    });
});

liDrop.forEach(ld => {
    ld.addEventListener("click", () => {
        const {ipcRenderer} = require("electron");

        win = remote.getCurrentWindow();
        win.setResizable(true);
        
        switch(ld.id) {
            case "base": {
                win.setSize(335, 480);
                win = loadWindow(win, mainProp);

                break;
            } case "func2d": { 
                win.setSize(1280, 730);
                win = loadWindow(win, funcProp);

                break;
            } case "poss-funcs": {
                ipcRenderer.send("popCreate", 1);
                ipcRenderer.send("help2dShow", 1);

                break;
            } case "about": {
                ipcRenderer.send("popCreate", 1);
                ipcRenderer.send("aboutShow", 1);

                break;
            } case "func3d": {
                win.setSize(1280, 730);
                win = loadWindow(win, func3DProp);

                break;
            } case "science": {
                win.setSize(550, 480);
                win = loadWindow(win, scienceProp);

                break;
            } case "conversion": {
                win.setSize(480, 320);
                win = loadWindow(win, conversionProp);

                break;
            }
        } // win.setResizable(false);

        switch(ld.id) {
            case "currency": {
                loadCurrency();
                break;
            }
            case "it": {
                loadIt();
                break
            } 
            case "time": { 
                loadTime();
                break;
            } case "volume": {
                loadVolume();
                break;
            }
        }
    });
});

menuDrop.forEach(md => {
    site.addEventListener("mousedown", () => {
        md.style.display = "none";
    });
});


/*-!EVENTS!-*/
/*-!RUN!-*/


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