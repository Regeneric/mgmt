/*--SETUP--*/
const electron = require("electron");
const path = require("path");
const url = require("url");

const {app, BrowserWindow, ipcMain, ipcRenderer, session} = electron;
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