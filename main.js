/*--SETUP--*/
const electron = require("electron");
const path = require("path");
const url = require("url");

const {app, Menu, BrowserWindow} = electron;
/*-!SETUP!-*/

/*--PROPS--*/
let mainWindow = null;
    const main = {
        width: 1280,
        height: 720,
        title: "Main Window",
        show: false,
        resizable: false
    };  const mainProp = {
            dir: __dirname,
            file: "index.html",
            protocol: "file:",
            slashes: true
    };
/*-!PROPS!-*/

/*--RUN--*/
app.on("ready", function() {
    mainWindow = new BrowserWindow(main);
        mainWindow = loadWindow(mainWindow, mainProp);

    /*--EVENTS--*/
    mainWindow.once("ready-to-show", function() {
        mainWindow.show();
        // mainWindow.setPosition(x, y);
    });
    mainWindow.once("close", function() {
        mainWindow = null;
        app.quit();
    });
    /*-!EVENTS!-*/

    // Menu.setApplicationMenu(null);
});

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