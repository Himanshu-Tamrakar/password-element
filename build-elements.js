const fs = require('fs-extra');
const concat = require('concat');

var f = []
var css = ""
fs.readdir("./dist/password-element", function(err, items) {
  for (let index = 0; index < items.length; index++) {
    if(items[index].includes(".js")) {f.push("./dist/password-element/" + items[index]);}
    else if (items[index].includes(".css")) {
      css = "./dist/password-element/" + items[index];
    }
  }
  build(f);
});

 function build(files) {
   console.log(files)
  // const files = [
  //   './dist/password-element/scripts.9ddf727ecc94cd123172.js',
  //   './dist/password-element/runtime-es2015.f80f43fdfe5b65e71027.js',
  //   './dist/password-element/runtime-es5.b955bc8e9160c78c7a86.js',

  //   './dist/password-element/polyfills-es2015.15a782f8537150de6053.js',
  //   './dist/password-element/polyfills-es5.ae9d6bbf477df79fb45f.js',

  //   './dist/password-element/main-es2015.8a1a2f7f76f2a2c71301.js',
  //   './dist/password-element/main-es5.53c45a4828b018d64634.js',
  // ]
  
  fs.ensureDir('elements')
  concat(files, 'elements/elements.js');
  fs.copyFile(css, 'elements/styles.css')
  //await fs.copy('./dist/elements/assets/', 'elements/assets/' )

}