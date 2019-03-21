## Used technology

**Main**  
 * HTML 5
 * CSS 3
 * JavaScript
 * Node.js && NPM
 * Electron

**Node Modules**
 * electron-builder
 * chart.js
   * chartjs-plugin-zoom
 * plotly.js-dist

**Main testing env**
 * Arch Linux && Ubuntu 18.10
 * Windows 10 (1809)
 * macOS 10.14.3

### main.js

> `function loadWindow(oWindow: any, oProp: any): loadWindow`

### base.js

> `function calculate(action: any): void`  
> `function uncolor(action: any): void`

### func2d.js
#### Quadratic equation
> `let deltaFx: (a: any, b: any, c: any) => number`  

> `let x1Fx: (a: any, b: any, d: any) => number`  
> `let x2Fx: (a: any, b: any, d: any) => number`  
> `let x12Fx: (a: any, b: any) => number`  

> `let pFx: (a: any, b: any) => number`  
> `let qFx: (a: any, d: any) => number`  

> `function findABCPos(P: any, fx: any): void`  
> `function findABCNeg(P: any, fx: any): void`  

> `function drawDPos(fx: any, X: any, range: any, data: any): void`  
> `function drawDZero(fx: any, X: any, range: any, data: any): void`  
> `function drawDNeg(fx: any, W: any, range: any, data: any): void`  

> `function showDivs(s: any, P: any, W: any, X: any): void`

#### Homonymous equation

> `function drawHomoPos(a: any, p: any, q: any, x: any, range: any, data: any): void`  
> `function drawHomoPos(a: any, p: any, q: any, x: any, range: any, data: any): void`  
> `function drawHomoTinyXPos(range: any, data: any): void`  
> `function drawHomoTinyXNeg(range: any, data: any): void`  

> `function findAPQXPos(a: any, p: any, q: any, x: any, fx: any): obj`
> `function findAPos(a: any, fx: any): any`  

#### Linear equation

> `function drawLinearFx(fx: any, a: any, b: any, range: any, data: any): void`

#### Sinus graph

> `function drawSinFx(fx: any, range: any, data: any): void`

#### Misc

> `function checkForX(x: any, obj: any): void`  
> `function findZero(obj: any): void`