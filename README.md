## vocab

Rapidly scaffold out visual-vocabulary projects

## Install

* **Note: requires a node version >= 6 and an npm version >= 3.**
* **If you have installation or compilation issues with this project, please see [our debugging guide](https://github.com/chentsulin/electron-react-boilerplate/issues/400)**

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/ft-interactive/vocab.git
```

And then install dependencies.
**ProTip**: Install with [yarn](https://github.com/yarnpkg/yarn) for faster and safer installation:

```bash
$ cd vocab && npm install
```

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a server sends hot updates to the renderer process:

```bash
$ npm run dev
```

You Run these two commands __simultaneously__ in different console tabs:

```bash
$ npm run start-renderer-dev
$ npm run start-main-dev
```

## Editor Configuration
**Atom**
```bash
apm install editorconfig es6-javascript atom-ternjs javascript-snippets linter linter-eslint language-babel autocomplete-modules file-icons
```

**VSCode**
* [Editorconfig](https://github.com/editorconfig/editorconfig-vscode)
* [ESLint](https://github.com/Microsoft/vscode-eslint)
* [Flow](https://github.com/flowtype/flow-for-vscode)
* [Babel](https://github.com/dzannotti/vscode-babel)
* [Jest](https://github.com/orta/vscode-jest)
* [ES6 Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
* [React Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
:bulb: *If you are using the `flow-for-vscode` plugin, make sure to disable the `flowtype-errors/show-errors` eslint rule in the `.eslintrc` by setting it to `0`*

**Sublime**
* [Editorconfig Integration](https://github.com/sindresorhus/editorconfig-sublime#readme)
* [Linting](https://github.com/SublimeLinter/SublimeLinter3)
* [ESLint Integration](https://github.com/roadhump/SublimeLinter-eslint)
* [Syntax Highlighting](https://github.com/babel/babel-sublime)
* [Autocompletion](https://github.com/ternjs/tern_for_sublime)
* [Node Snippets](https://packagecontrol.io/packages/JavaScript%20%26%20NodeJS%20Snippets)
* [ES6 Snippets](https://packagecontrol.io/packages/ES6-Toolkit)

**Others**
* [Editorconfig](http://editorconfig.org/#download)
* [ESLint](http://eslint.org/docs/user-guide/integrations#editors)
* Babel Syntax Plugin

## DevTools

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

*See [electron-debug](https://github.com/sindresorhus/electron-debug) for more information.*

#### DevTools extension

This boilerplate is included following DevTools extensions:

* [Devtron](https://github.com/electron/devtron) - Install via [electron-debug](https://github.com/sindresorhus/electron-debug).
* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer).

You can find the tabs on Chrome DevTools.

If you want to update extensions version, please set `UPGRADE_EXTENSIONS` env, just run:

```bash
$ UPGRADE_EXTENSIONS=1 npm run dev
# For Windows
$ set UPGRADE_EXTENSIONS=1 && npm run dev
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```
DEBUG_PROD=true npm run package
```


## CSS Modules

This boilerplate out of the box is configured to use [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

If you want to import global css libraries (like `bootstrap`), you can just write the following code in `.global.css`:

```css
@import "~bootstrap/dist/css/bootstrap.css";
```

## Sass support

If you want to use Sass in your app, you only need to import `.sass` files instead of `.css` once:
```js
import './app.global.scss';
```


## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)

#### Module Structure

This boilerplate uses a [two package.json structure](https://github.com/electron-userland/electron-builder/wiki/Two-package.json-Structure). For an example app that uses this boilerplate and packages native dependencies, see [erb-sqlite-example](https://github.com/amilajack/erb-sqlite-example).

1. If the module is native to a platform or otherwise should be included with the published package (i.e. bcrypt, openbci), it should be listed under `dependencies` in `./app/package.json`.
2. If a module is `import`ed by another module, include it in `dependencies` in `./package.json`.   See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md).
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.

## Static Type Checking
This project comes with Flow support out of the box! You can annotate your code with types, [get Flow errors as ESLint errors](https://github.com/amilajack/eslint-plugin-flowtype-errors), and get [type errors during runtime](https://github.com/codemix/flow-runtime) during development. Types are completely optional.

## Native-like UI

If you want to have native-like User Interface (OS X El Capitan and Windows 10), [react-desktop](https://github.com/gabrielbull/react-desktop) may perfect suit for you.

## Dispatching redux actions from main process

see discusses in [#118](https://github.com/chentsulin/electron-react-boilerplate/issues/118) and [#108](https://github.com/chentsulin/electron-react-boilerplate/issues/108)

## How to keep the boilerplate updated

If your application is a fork from this repo, you can add this repo to another git remote:

```sh
git remote add upstream https://github.com/chentsulin/electron-react-boilerplate.git
```

Then, use git to merge some latest commits:

```sh
git pull upstream master
```

## Maintainers

- [C. T. Lin](https://github.com/chentsulin)
- [Jhen-Jie Hong](https://github.com/jhen0409)
- [Amila Welihinda](https://github.com/amilajack)
