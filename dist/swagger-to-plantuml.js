/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var SwaggerToPlantuml;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/diagramBuilder.ts":
/*!*******************************!*\
  !*** ./src/diagramBuilder.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar DiagramBuilder = /** @class */ (function () {\r\n    function DiagramBuilder() {\r\n        this.diagramText = 'test';\r\n    }\r\n    DiagramBuilder.prototype.getDiagramText = function () {\r\n        return this.diagramText;\r\n    };\r\n    return DiagramBuilder;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DiagramBuilder);\r\n\n\n//# sourceURL=webpack://SwaggerToPlantuml/./src/diagramBuilder.ts?");

/***/ }),

/***/ "./src/documentation/openApiDocumentation.ts":
/*!***************************************************!*\
  !*** ./src/documentation/openApiDocumentation.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar OpenApiDocumentation = /** @class */ (function () {\r\n    function OpenApiDocumentation(docJson) {\r\n        this.doc = docJson;\r\n    }\r\n    return OpenApiDocumentation;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OpenApiDocumentation);\r\n\n\n//# sourceURL=webpack://SwaggerToPlantuml/./src/documentation/openApiDocumentation.ts?");

/***/ }),

/***/ "./src/documentation/swaggerDocumentation.ts":
/*!***************************************************!*\
  !*** ./src/documentation/swaggerDocumentation.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar SwaggerDocumentation = /** @class */ (function () {\r\n    function SwaggerDocumentation(docJson) {\r\n        this.doc = docJson;\r\n    }\r\n    return SwaggerDocumentation;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwaggerDocumentation);\r\n\n\n//# sourceURL=webpack://SwaggerToPlantuml/./src/documentation/swaggerDocumentation.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _documentation_swaggerDocumentation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./documentation/swaggerDocumentation */ \"./src/documentation/swaggerDocumentation.ts\");\n/* harmony import */ var _documentation_openApiDocumentation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./documentation/openApiDocumentation */ \"./src/documentation/openApiDocumentation.ts\");\n/* harmony import */ var _diagramBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diagramBuilder */ \"./src/diagramBuilder.ts\");\n\r\n\r\n\r\nvar SwaggerToPlantuml = /** @class */ (function () {\r\n    function SwaggerToPlantuml(docJson) {\r\n        if (!(docJson instanceof Object)) {\r\n            throw 'Input documentation must be a JSON Object';\r\n        }\r\n        // Check swagger\r\n        if ('swagger' in docJson && docJson.swagger === '2.0') {\r\n            this.doc = new _documentation_swaggerDocumentation__WEBPACK_IMPORTED_MODULE_0__[\"default\"](docJson);\r\n        }\r\n        else if ('openapi' in docJson && docJson.openapi.match(/^3\\.[0-9]+\\.[0-9]+$/)) {\r\n            this.doc = new _documentation_openApiDocumentation__WEBPACK_IMPORTED_MODULE_1__[\"default\"](docJson);\r\n        }\r\n        else {\r\n            throw 'Input documentation format not supported';\r\n        }\r\n        this.diagram = new _diagramBuilder__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n    }\r\n    SwaggerToPlantuml.prototype.getDiagramText = function () {\r\n        return this.diagram.getDiagramText();\r\n    };\r\n    SwaggerToPlantuml.prototype.execute = function () {\r\n    };\r\n    return SwaggerToPlantuml;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SwaggerToPlantuml);\r\n\n\n//# sourceURL=webpack://SwaggerToPlantuml/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	SwaggerToPlantuml = __webpack_exports__["default"];
/******/ 	
/******/ })()
;