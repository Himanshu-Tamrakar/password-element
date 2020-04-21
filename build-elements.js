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
  fs.ensureDir('elements')
  concat(files, 'elements/elements.js');
  if(css != "") fs.copyFile(css, 'elements/styles.css')
  //await fs.copy('./dist/elements/assets/', 'elements/assets/' )


  // const srcpath = '/home/himanshu/Learning/password-element/elements/elements.js'
  // const dstpath = '/home/himanshu/Learning/password-element-use/src/assets/password/elements.js'
  // //With a callback:
  // fs.move(srcpath, dstpath, err => {
  // if (err) return console.error(err)
  //   console.log('success!')
  // })

  // const srcpath1 = '/home/himanshu/Learning/password-element/elements/styles.css'
  // const dstpath1 = '/home/himanshu/Learning/password-element-use/src/assets/password/styles.css'
  // //With a callback:
  // fs.move(srcpath1, dstpath1, err => {
  //   if (err) return console.error(err)
  //   console.log('element move to destination folder!')
  // })
}
