const fs = require('fs');
const path = require('path');

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(dir, 'script.js'), 'utf8');

let bundled = html.replace(
  /<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?">/,
  '<style>\n' + css + '\n</style>'
);

bundled = bundled.replace(
  '<script src="assets/js/gsap.min.js"></script>',
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha384-g4NTh/Iv5PPU4xPyhEWqPcwtNXOvdaDI8LLnyYfyNZOjKJeYQyjzQ9X5275eBjpt" crossorigin="anonymous"></script>'
);
bundled = bundled.replace(
  '<script src="assets/js/ScrollTrigger.min.js"></script>',
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" integrity="sha384-Z3REaz79l2IaAZqJsSABtTbhjgOUYyV3p90XNnAPCSHg3EMTz1fouunq9WZRtj3d" crossorigin="anonymous"></script>'
);
bundled = bundled.replace(
  '<script src="assets/js/lenis.min.js"></script>',
  '<script src="https://unpkg.com/lenis@1.1.18/dist/lenis.min.js" integrity="sha384-tKsJDT6PlUI0pSBt9/sBKJluKgA19/a6mBrDsZaXotLB4ZYfMGM6xt6/WgGpYhTm" crossorigin="anonymous"></script>'
);

bundled = bundled.replace(
  '<script src="script.js"></script>',
  '<script>\n' + js + '\n</script>'
);

fs.writeFileSync(path.join(dir, 'all-in-one.html'), bundled, 'utf8');
console.log('all-in-one.html bundled successfully: ' + fs.statSync(path.join(dir, 'all-in-one.html')).size + ' bytes');
