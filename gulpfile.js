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

const { src, dest, watch, parallel } = require ('gulp');
//const { src, dest, watch, parallel } require 'gulp';//gulp compilacion tiempo real

//CSS

const sass = require('gulp-sass')(require('sass'));//Aqui esta la linea de error
const plumber = require ('gulp-plumber');//plumber
const autoprefixer = require ('autoprefixer');//constar autoprefixer
const cssnano = require ('cssnano');//constar cssnano
const postcss = require('gulp-postcss');//constar postcss
const sourcemaps = require('gulp-sourcemaps')//para buscar en css un estilo espeficico para localizarlo

//IMAGENES
const cache = require ('gulp-cache');//para imagenpng
const imagenmin = require ('gulp-imagemin');//para imagen png
const webp = require ('gulp-webp');//para webp
const avif = require ('gulp-avif');//AVIF

//JAVASCRIPT
const terser = require('gulp-terser-js');

function css( done ) {
    src('src/scss/**/*.scss')//Identificar scss a compilar
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())//Compilar
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))//Almacenar
    done();
}

//Formato PNG misma calidad mas ligeras
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagenmin(opciones)))
        .pipe(dest('build/img'))
    done();
}

//  CONVERTIR A WEBP
function versionWebp(done) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

//IMAGENES AVIF
function versionAvif(done) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}
function javascript(done) {
    src('src/js/**/**.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'))

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//EJECUTAR FUNCIONES EN PARALELO
//exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); Para cuando quieres convertir las imagenes a avif y webp
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);//solo correr el programa