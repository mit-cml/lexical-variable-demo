# lexical-variable-demo [![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

This is a demo of the use of the 
[blockly-block-lexical-variables](https://github.com/mit-cml/blockly-plugins/tree/main/block-lexical-variables)
Blockly plugin.  Note that it uses [Webpack](https://webpack.js.org/) and ``ES6 Modules``.

## Installation

Optionally update to the latest version of the plugin:
```
npm update @mit-app-inventor/blockly-block-lexical-variables
```
then
```
npm install --legacy-peer-deps
```

## Running

```
npm run start
```

## Browse
[http://localhost:3000/index.html](http://localhost:3000/index.html)

Clicking the "Generate Code" link will send the generated code to the browser's
console.

## Build a deployable version into the 'docs' directory
```
npm run build
```
