// Importuje `functionA` i `functionB` jako nazwane eksporty z pliku `moduleA.js`.
// Możesz używać tych funkcji w kodzie jako `functionA()` i `functionB()`.
import { functionA, functionB } from './moduleA.js';

// Importuje wszystko z pliku `moduleB.js` jako obiekt `ModuleB`.
// Wszystkie eksporty z `moduleB.js` będą dostępne jako właściwości obiektu `ModuleB`.
// Na przykład, jeśli `moduleB.js` eksportuje `foo`, możesz użyć `ModuleB.foo`.
import * as ModuleB from './moduleB.js';

// Importuje domyślny eksport z pliku `moduleC.js`.
// Domyślny eksport można nazwać dowolnie, tutaj nazwano go `defaultExport`.
import defaultExport from './moduleC.js';

// Importuje domyślny eksport oraz nazwane eksporty `namedExport1` i `namedExport2` z pliku `moduleD.js`.
// Domyślny eksport jest dostępny jako `defaultExport`, a nazwane eksporty jako `namedExport1` i `namedExport2`.
import defaultExport, { namedExport1, namedExport2 } from './moduleD.js';

// Importuje nazwany eksport `func1` z pliku `moduleE.js`.
// Możesz używać tej funkcji w kodzie jako `func1()`.
import { func1 } from './moduleE.js';

// Importuje nazwane eksporty `func2` i `func3` z pliku `moduleF.js`.
// Możesz używać tych funkcji w kodzie jako `func2()` i `func3()`.
import { func2, func3 } from './moduleF.js';

// Importuje wszystko z pliku `moduleG.js` jako obiekt `ModuleG`.
// Wszystkie eksporty z `moduleG.js` będą dostępne jako właściwości obiektu `ModuleG`.
import * as ModuleG from './moduleG.js';

// Importuje domyślny eksport z pliku `moduleH.js`.
// Domyślny eksport można nazwać dowolnie, tutaj nazwano go `defaultExportH`.
import defaultExportH from './moduleH.js';

// Importing multiple functions, classes, or variables from different modules

// Import specific functions or variables from a module

// Import everything from a module as an object

// Import a default export

// Import a default export and named exports together

// Import multiple modules in one file

// Example usage
functionA();
functionB();
ModuleB.someFunction();
defaultExport();
namedExport1();
func1();
func2();
ModuleG.anotherFunction();
defaultExportH();