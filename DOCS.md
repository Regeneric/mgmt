## WGEC - Scientific Calculator
tutaj opis

## Zespół oraz współtwórcy
tutaj opis

## Główne założenia
tutaj opis

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

Ładowanie zawartości pliku HTML do okna przeglądarki
```js 
  function loadWindow(oWindow: any, oProp: any): loadWindow
```

Poniższy przykład pokazuje, jak załadować zawartość okna po utworzeniu obiektu BrowserWindow:
```js
  const props = {
    width: 1280,
    height: 720,
    title: "Main Window"
  }; const windowProps = {
        dir: __dirname,
        file: "index.html",
        protocol: "file:",
        slashes: true
  };

  // W głównym procesie
  const {BrowserWindow} = require("electron");
  const win = new BrowserWindow(props);
    win = loadWindow(win, windowProps);
```

### base.js

> `function calculate(action: any): void`  
> `function uncolor(action: any): void`

### func2d.js
#### Quadratic equation

Obliczanie delty oraz miejsc zerowych:
```js
  let deltaFx: (a: any, b: any, c: any) => number  

  let x1Fx: (a: any, b: any, d: any) => number  
  let x2Fx: (a: any, b: any, d: any) => number  
  let x12Fx: (a: any, b: any) => number
```  

Na przykładzie równania `2*x^2+3*x-9`:
```js
  let d = deltaFx(2, 3, -9);
  
  if (d > 0) {
    let x1 = x1Fx(2, 3, d);
    let x2 = x2Fx(2, 3, d);
  } else if (d == 0) {
    let x12 = x12Fx(2, 3);
  } else {
    x1 = "Brak";
    x2 = "Brak";
    x12 = "Brak";
  }
```

Obliczanie wierzchołka:
```js
  let pFx: (a: any, b: any) => number  
  let qFx: (a: any, d: any) => number  
```

Na przykładzie równania `2*x^2+3*x-9`:
```js
  let W = {p: 0, q: 0};
  let d = deltaFx(2, 3, -9);

  let W.p = pFx(2, 3);
  let W.q = qFx(2, d); 
```

Odnajdywanie współczynników A, B i C:
```js
  function findABCPos(P: any, fx: any): void  
  function findABCNeg(P: any, fx: any): void  
```

Na przykładzie równania `2*x^2+3*x-9`:
```js
  const P = {a: 0, b: 0, c: 0};
  const fx = "2*x^2+3*x-9";

  findABCPos(P, fx); 
  // findABCNeg(P, fx); dla a < 0

  function findABCPos(P, fx) {
      // Wyrażenia regularne używane są do znalezienia współczynników
      const quad = require("./js/data/regExes").quad();
      quad.forEach(r => {
          switch (r.id) {
              case 0: {
                  P.a = eval(r.re.exec(fx)[0]);
                  if (P.a[0] === '+') P.a = P.a.split('+')[1];
                  break;
              } case 1: {
                  P.b = eval(r.re.exec(fx)[0]);
                  if (P.b[0] === '+') P.b = P.b.split('+')[1];
                  break;
              } case 2: { 
                  P.c = eval(r.re.exec(fx)[0]);
                  if (P.c[0] === '+') P.c = P.c.split('+')[1];
                  break; 
              }   
          }
      });
  }
```

Rysowanie wykresów funkcji kwadratowej na podstawie wyliczonej wartości delty oraz pokazywanie divów, które wyświetlają informacje o funkcji.
```js
  function drawDPos(fx: any, X: any, range: any, data: any): void  
  function drawDZero(fx: any, X: any, range: any, data: any): void  
  function drawDNeg(fx: any, W: any, range: any, data: any): void  

  function showDivs(s: any, P: any, W: any, X: any): void
```

Na przykładzie równania `2*x^2+3*x-9`:
```js
  const squareDiv = document.querySelectorAll(".square");

  const fx = "2*x^2+3*x-9".replace('^', "**");
  const range = 25;
  const data = new Array();

  let d = deltaFx(2, 3, -9);
  const X = {x1: 0, x2: 0};
  const W = {p: 0, q: 0};

  X.x1 = x1Fx(2, 3, d);
  X.x2 = x2Fx(2, 3, d);
  W.p = pFx(2, 3);
  W.q = qFx(2, d);

  if (d > 0) drawDPos(fx, X, range, data);
  else if (d == 0) drawDZero(fx, X, range, data);
  else drawDNeg(fx, W, range, data);

  squareDiv.forEach(s => s.style.display = "block");
  squareDiv.forEach(s => showDivs(s, P, W, X)); // Obiekt P ma określone parametry A, B i C
```

#### Homonymous equation

Rysowanie wykresów funkcji homograficznej:
```js 
  function drawHomoPos(a: any, p: any, q: any, x: any, range: any, data: any): void  
  function drawHomoShortPos(fx: any, a: any, range: any, data: any): void  
  function drawHomoTinyXPos(range: any, data: any): void  
  function drawHomoTinyXNeg(range: any, data: any): void  
```

Odnajdywanie parametrów A, P, Q oraz X:
```js
  function findAPQXPos(a: any, p: any, q: any, x: any, fx: any): obj
  function findAPos(a: any, fx: any): any
```

Na przkładzie `3*|x-p|+3`:
```js
  const func2d = require("chart.js");
  func2d.options.elements.line.tension = 0.0; 

  // Domyślne wartości określone globalnie
  let a = b = x = p = q = 1;

  const data = new Array();
  const range = 25;
  let P = findAPQXPos(a, p, q, x, fxValue);
    a = P.a; p = P.p; q = P.q; x = P.x;

  drawHomoPos(a, p, q, x, range, data);
```

Na przykładzie `a*|x|`:
```js
  const func2d = require("chart.js");
  func2d.options.elements.line.tension = 0.0; 

  const fx = "a*|x|".split('|');
  const data = new Array();
  const range = 25;
  
  let a = findAPos(a, fx);
  drawHomoShortPos(fx, a, range, data);
```

#### Linear equation

Podstawowa funkcja pozwalająca głównie obliczać równania liniowe, potrafi jednak poradzić sobie także z czymkolwiek, co nie wymaga rozbijania na poszczególne parametry i mieści w się w pojedynczym stringu równania.
```js
function drawLinearFx(fx: any, a: any, b: any, range: any, data: any): void
```

Na przykładzie `2*x+10`:
```js
  const fx = "2*x+10";
  const data = new Array();
  const range = 25;

  drawLinearFx(fx, 2, 10, range, data);
```

Na przykładzie `a*(x-b)*(x+c)`:
```js
  // Domyślne wartości określone globalnie
  let a = b = c = 1;

  fx = "a*(x-b)*(x+c)";
  const data = new Array();
  const range = 25;

  drawLinearFx(fx, a, b, range, data);
```

#### Sinus graph

Rysowanie wykresu funkcji sinus, zasada działania bardzo podobna, do rysowania wykresu funkcji liniowej.
```js
function drawSinFx(fx: any, range: any, data: any): void
```

Na przykładzie `sin(x)`:
```js
  const func2d = require("chart.js");
  func2d.options.elements.line.tension = 0.7; // Zmiękczeni ostrych kątów przy rysowaniu

  const fx = "sin(x)".replace("sin", "Math.sin");
  const data = new Array();
  const range = 1000;

  drawSinFx(fx, range, data);
```

Na przykładzie `3*sin(x+1)-2`:
```js
  const func2d = require("chart.js");
  func2d.options.elements.line.tension = 0.7; // Zmiękczeni ostrych kątów przy rysowaniu

  const fx = "3*sin(x+1)-2".replace("sin", "Math.sin");
  const data = new Array();
  const range = 1000;

  drawSinFx(fx, range, data);
```

#### Misc

Odnajdywanie miejsc zerowych funkcji i określanie wartości funkcji.
```js
  function checkForX(x: any, obj: any): void
  function findZero(obj: any): void
```

```js
  const func2d = require("chart.js");

  const zeroBtn = document.querySelector("#find-zero");
  const checkX = document.querySelector("#check-for-x");

  const data = {x: 1, y: 0};

  zeroBtn.addEventListener("click", () => {
    ptBgColour.length = 0;
    ptBorderCl.length = 0;

    if (fxInp[3].checked) findZero(data); 
    func2d.update();
  });

  checkForX(checkX, data);
  func2d.update();
```