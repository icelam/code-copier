# Code Copier #

### Development Note ###
All JS files are packed using Gulp + Browserify + Babelify. To setup Vue which works without webpack, vue template compiler is used. `vue/dist/vue.esm.js` is imported instead of directly importing `vue`.

### Installation ###

* `npm install`

### Dev Server ###

* `npm run dev`

### Build Production ###

All the build files can be found in `/dist` folder.

* `npm run build`

### Debug ###
* Chrome
  1. Go to `chrome://extensions/` page
  2. Enable development mode on upper right coner
  3. Load unpack and select `/dist` folder

* Firefox
  1. Go to `about:debugging#/runtime/this-firefox` page
  2. Choose `Load Temporary Add-on`
  3. Select `manifest.json` inside `/dist` folder

### Pack Extension ###
* Chrome: Zip all content inside `/dist` folder after build, upload the zip file to webstore
* Firefox: TBC

`npm run pack` has been set to simplify the process.

