/*--SETUP--*/
const electron = require("electron");
const path = require("path");
const url = require("url");

const {app, BrowserWindow, ipcMain, ipcRenderer} = electron;
/*-!SETUP!-*/

/*--PROPS--*/
let mainWindow = null;
    const main = {
        width: 1280,
        height: 720,
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
    const funcProp = {
        dir: __dirname,
        file: "func2d.html",
        protocol: "file:",
        slashes: true
    }; const func3DProp = {
            dir: __dirname,
            file: "func3d.html",
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
        // mainWindow.setPosition(x, y);
    });
    mainWindow.once("close", () => {
        mainWindow = null;
        app.quit();
    });

    // Menu.setApplicationMenu(null);
});

ipcMain.on("inputBox", (e, input) => {
    console.log(input);
    e.sender.send("inputBox", input);
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