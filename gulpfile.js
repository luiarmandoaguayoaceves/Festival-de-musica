// function tarea(done){//Funciona como done, callback o fn
// console.log("Desde la primer tarea");
// done();//Finaliza la tarea
// }
// function tarea2 (done){
//     console.log("Segunda tarea");
//     done();
// }

// exports.tarea = tarea;//para exportar y poder ejecutarla
// exports.tarea2 = tarea2;

const {src, dest, watch}= require('gulp')
const sass = require ('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

function css(done){
    src('src/scss/**/*.scss')//Identificar scss a compilar
    .pipe(plumber())    
    .pipe(sass())//Compilar
    .pipe(dest('build/css'))//Almacenar
    done();
}
function dev (done){
    watch('src/scss/**/*.scss', css);
    done();
}
exports.css = css;
exports.dev = dev;