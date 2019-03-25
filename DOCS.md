# WGEC - Scientific Calculator

W świecie galopującej technologii, coraz potężniejszych komputerów i nacisku na multiplatformowość aplikacji, do których tworzenia łatwo będzie znaleźć utalentowanych ludzi, Electron, razem z całym dobrodziejstwem webowych technologii, wydaje się być rozwiązaniem niemal idealnym. 

Bo jak inaczej nazwać rozwiązanie, które za pomocą języka JavaScript, przeglądarki Chromium i środowiska uruchomieniowego Node, pozwala w krótkim czasie i w sytuacji ograniczonych zasobów, napisać aplikacje od komunikatora głosowo-tekstowego, przez narzędzia do tworzenia interfejsów graficznych, a na dowolnym innym pomyślę kończąc?
A do tego przeniesienie kodu, aby uruchamiał się natywnie w naszej przeglądarce internetowej, osiągamy niemal zerowym kosztem.

Nasza autorska aplikacja, WGEC, przedstawia w prosty i przystępny sposób koncepcję tego, jak w przyszłości może wyglądać produkcja oraz dystrybucja aplikacji, gdzie postawiono w dużej mierze na skalowalność kodu, oraz prostotę jego pisania. Pokazuje, że dowolny typ projektu może napisać zarówno grupa zapaleńców, jak i potężna korporacja, a obydwoje będą korzystać z tych samych narzędzi i rozwiązań.

Gdzie język JavaScript jest już na tyle dojrzały, że sam w sobie, bez żadnych dodatkowych frameworków, jest w stanie zapewnić interaktywność i odpowiednie działanie w rękach zarówno amatorów, jak i doświadczonych programistów.
Gdzie HTML i CSS w kilka chwil pozwolą zestawić miły dla oka i responsywny interfejs, który we współpracy z grafikami może być nie do odróżnienia od natywnych rozwiązań, znanych chociażby z UWP Microsoftu.
Gdzie za pomocą Node możemy uruchamiać aplikację na drugim końcu świata i bez problemu komunikować się z klientem na naszym komputerze czy nawet telefonie!
Gdzie rozwiązanie pozwala wykorzystywać tak popularne teraz rozwiązanie, jakim jest React czy Vue, lub oprzeć się na sprawdzonym jQuery, aby poprawić zarówno wrażenia wizualne, jak i samo działanie aplikacji.

Naukowy kalkulator, którego bazę i wszelkie modułowe rozwiązania można dowolnie przerabiać i dodawać, bez obaw o kompatybilność z resztą aplikacji, to tylko jeden z tysięcy pomysłów, które można zastosować, aby przekazać ideę tego, jak proste stało się w dzisiejszych czasach nowoczesnych i multiplatformowych aplikacji.

## Zespół oraz współtwórcy

**Hubert Batkiewicz**  
Koordynacja projektu, baza kodowa i modułowość aplikacji, dokumentacja techniczna

**Gabriel Król**  
Główny programista, skrypty i narzędzia deweloperskie, działanie i responsywność interfejsu

**Patryk Piszczek**  
Oprawa graficzna, działanie i responsywność interfejsu, zachowania specyficzne dla platformy

## Oprogramoawnie i technologie

**Software**
  * **OS**: Arch Linux | Ubuntu 18.10 | Windows 10 (1809) | macOS 10.14.3
  * **VM**: QEMU | VMWare
  * **Edytor**: Visual Studio Code | VIM
  * **Grafika**: InkScape | GIMP | Figma
  * **VC**: Git | GitHub
  * **Misc**: Simplenote | Slack | Kitematic

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

# Dokumentacja
## main.js

Ładowanie zawartości pliku HTML do okna przeglądarki
```js 
  function loadWindow(oWindow: any, oProp: any): loadWindow  
  function windowProps(file: any): obj
```

Poniższy przykład pokazuje, jak załadować zawartość okna po utworzeniu obiektu BrowserWindow:
```js
  const props = {
    width: 1280,
    height: 720,
    title: "Main Window"
  }; const windowProps = windowProps("index.html");

  // W głównym procesie
  const {BrowserWindow} = require("electron");
  const win = new BrowserWindow(props);
    win = loadWindow(win, windowProps);
```

## base.js

> `function calculate(action: any): void`  
> `function uncolor(action: any): void`

## func2d.js
### Funkcja kwadratowe

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

### Funkcja homograficzna

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

### Funkcja liniowa

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

### Wykres funkcji sinus

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

### Różne

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

## conv.js
### Waluty, czas, objętość

Możliwe do przeliczenia waluty. Kalkulator oparty o aktualizowane przez sieć kursy walut z Europejskiego Banku Centralnego
```js
  (property) currency: () => string[]
  (property) time: () => string[]
  (property) volume: () => string[]
```

Kroki dla `time` i `volume` są analogiczne
```js
  const select = document.querySelectorAll(".selector");
  const currency = require("./js/data/conv").currency();

  // Krok opcjonalny, jeśli w select znajdują się już jakieś dzieci:
  select.forEach(s => {
    const range = document.createRange();
        range.selectNodeContents(s);
        range.deleteContents();
  });

  // Konwersja string na node i dorzucenie do select
  select.forEach(s => {
    currency.forEach(c => {
      s.appendChild(
        document.createRange().createContextualFragment(c)
      );
    });
  });
```

## regExes.js
### Wyrażenia regularne do funkcji

```js
(property) fx: () => {
    id: number;
    name: string;
    fx: RegExp;
    desc: string[];
}[]
```

### Parametry funkcji

```js
(property) quad: () => {
    id: number;
    name: string;
    re: RegExp;
}[]

(property) quadNeg: () => {
    id: number;
    name: string;
    re: RegExp;
}[]

(property) abs: () => {
    id: number;
    name: string;
    re: RegExp;
}[]
```

Przechwytywanie funkcji wprowadzonej w pole input przez użytkownika. Odnajdywanie parametrów odbywa się analogicznie, do sposobu poniżej.
```js
const fxBtn = document.querySelector(".fx-btn");
const fxInp = document.querySelector(".fx-inp");

const fxFind = require("./js/data/regExes").fx();

fxBtn.addEventListener("click", () => {
  fxFind.forEach(f => {
    if (f.fx.test(fxInp.value)) {
      switch(f.id) {
        case 0.1: {
          console.log("Funkja liniowa", fxInp.value);
          break;
        } 
        case 1.1: {
          console.log("Funkcja kwadratowa", fxInp.value);
          break;
        }
      }
    }
  });
});
```