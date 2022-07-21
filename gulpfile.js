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

import pkg from 'gulp';
const { src, dest, watch, parallel } = pkg;
//import { src, dest, watch, parallel } from 'gulp';//gulp compilacion tiempo real

//CSS

import sass from ('gulp-sass','sass') ;
import plumber from 'gulp-plumber';//plumber
import autoprefixer from 'autoprefixer';//importar autoprefixer
import cssnano from 'cssnano';//importar cssnano
import postcss from 'postcss';//importar postcss

//IMAGENES
import cache from 'gulp-cache';//para imagenpng
import imagenmin from 'gulp-imagemin';//para imagen png
import webp from 'gulp-webp';//para webp
import avif from 'gulp-avif';//AVIF

function css( done ) {
    src('src/scss/**/*.scss')//Identificar scss a compilar
        .pipe(plumber())
        .pipe(sass())//Compilar
        .pipe(sasss())
        .pipe(postcss([autoprefixer(), cssnano()]))
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
        .pipe(dest('build/js'));

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

const _css = css;
export { _css as css };
export const js = javascript;
// exports.imagenes = imagenes;
const _versionWebp = versionWebp;
export { _versionWebp as versionWebp };
const _versionAvif = versionAvif;
export { _versionAvif as versionAvif };
//EJECUTAR FUNCIONES EN PARALELO
// exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); Para cuando quieres convertir las imagenes a avif y webp
 const _dev = parallel(css, javascript, dev);
export { _dev as dev };//solo correr el programa