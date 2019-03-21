/*--INFO--*/
// Author: Hubert Batkiewicz
// Contributors: Gabriel Król
/*-!INFO!-*/

/*--SETUP--*/
const electron = require("electron");
const path = require("path");
const url = require("url");

const {app, BrowserWindow, ipcMain, ipcRenderer} = electron;
/*-!SETUP!-*/

/*--PROPS--*/
let mainWindow = null;
    const main = {
        width: 330,
        height: 490,
        title: "Main Window",
        show: false,
        resizable: false,
        frame: false,
    };  const mainProp = {
            dir: __dirname,
            file: "index.html",
            protocol: "file:",
            slashes: true
    };

let popWindow = null;
    const pop = {
        width: 800,
        height: 480,
        title: "Help",
        show: false,
        resizable: false,
        frame: false
    };  const help2dProp = {
        dir: __dirname,
        file: "help2d.html",
        protocol: "file:",
        slashes: true
    };  const aboutProp = {
        dir: __dirname,
        file: "about.html",
        protocol: "file:",
        slashes: true
    };
/*-!PROPS!-*/

/*--RUN--*/
/*--EVENTS--*/
app.on("ready", () => {
    mainWindow = new BrowserWindow(main);
        mainWindow = loadWindow(mainWindow, mainProp);

    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });
    mainWindow.once("close", () => {
        mainWindow = null;
        app.quit();
    });
     
    // Menu.setApplicationMenu(null);
});
/*-!EVENTS!-*/

function loadWindow(oWindow, oProp) {
    this.oWindow = oWindow;
    this.oWindow.loadURL(url.format({
        pathname: path.join(oProp.dir, oProp.file),
        protocol: oProp.protocol,
        slashes: oProp.slashes
    }));
    return this.oWindow;
}
/*-!RUN!-*/

/*--IPC--*/
ipcMain.on("popCreate", (e, data) => popWindow = new BrowserWindow(pop));
ipcMain.on("help2dShow", (e, data) => {
    popWindow = loadWindow(popWindow, help2dProp)
    popWindow.on("ready-to-show", () => popWindow.show());
    popWindow.on("close", () => popWindow = null);
});
ipcMain.on("aboutShow", (e, data) => {
    popWindow = loadWindow(popWindow, aboutProp);
    popWindow.on("ready-to-show", () => popWindow.show());
    popWindow.on("close", () => popWindow = null);
});
/*-!IPC!- */


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