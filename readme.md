# example-starter
## 2016 Ændrew Rininsland

Example Starter is a tool to quickly scaffold and populate items from the
[graphics-examples][1] GitHub repo.

## User instructions

1. Download the latest release for your platform.
  * *[Mac][2]*
  * *[Windows][3]*
2. Run `example-starter.app` / `example-stater.exe`
3. Drag a `.txt` spreadsheet into the interface
4. Choose a chart type. Example Starter will offer suggestions based on your
data, but you can choose any chart type in `graphic-examples`.
5. Click "Let's Go!"
6. Choose a destination folder
7. Example Starter will copy your data and the example into the chosen directory, start [srvlr][4],
open your code editor in the appropriate directory and load the example into Chrome.
8. Start coding!


## Dev instructions

```
$ npm install
```

### Run

```
$ npm start
```

### Build

```
$ npm run build
```

Builds the app for OS X, Linux, and Windows, using [electron-packager](https://github.com/electron-userland/electron-packager).


## License

MIT © [Ændrew Rininsland](http://ig.ft.com)

[1]: https://github.com/ft-interactive/graphics-examples
[4]: https://github.com/kavanagh/srvlr
