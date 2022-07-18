document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
    
}

function navegacionFija(){
    const barra = document.querySelector('.header');//almacenar la clase header
    const sobreFestival = document.querySelector('.sobre-festival');//almacenar la clase sobre festival

    window.addEventListener('scroll', function(){//ejecutar funcion al usar el scroll
        //console.log( sobreFestival.getBoundingClientRect() );//es un metodo el cual te da informacion del scroll (ej ubicacion)
        if (sobreFestival.getBoundingClientRect().bottom<0) {//cuando pase la parte de abajo del la etiqueta con clase ".sobre-festival"
             barra.classList.add('fijo');//agrega la clase fijo ala etiqueta header
        }else{
             barra.classList.remove('fijo');//mientras no, la quita
        }

    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');//almacenamos la etiqueta por la clase 

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) { //hacer una funcion al hacer click (escuchando)
             e.preventDefault();

             const seccionScroll = e.target.attributes.href.value; //almacenar el valor de la etiqueta a en una variable
             const seccion = document.querySelector(seccionScroll);//seleccionar el valor segun la variable de arriva
             seccion.scrollIntoView({ behavior: "smooth"});//es el metodo para el scroll lento
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
                <source srcset="build/img/thumb/${i}.avif" type="image/avif">
                <source srcset="build/img/thumb/${i}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
        
    }
}

function mostrarImagen(id){
    const imagen = document.createElement('picture');//crear elemento picture
        imagen.innerHTML = `
                <source srcset="build/img/grande/${id}.avif" type="image/avif">
                <source srcset="build/img/grande/${id}.webp" type="image/webp">
                <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
        `;//codigo html

        //Crear Overlay con la imagen
        const overlay = document.createElement('DIV');//Crear elemento div
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');//agregar clase overlay
        overlay.onclick = function(){
            const body = document.querySelector('body'); //seleccionar body
            body.classList.remove ('fijar-body');
            overlay.remove();
        }

        //Boton para cerrar el modal
        const cerrarModal = document.createElement('P');
        cerrarModal.textContent = 'X';
        cerrarModal.classList =('btn-cerrar');
        cerrarModal.onclick = function(){
            
            const body = document.querySelector('body'); //seleccionar body
            body.classList.remove ('fijar-body');
            overlay.remove();
        }
        overlay.appendChild(cerrarModal);

        //Añadirlo al HTML
        const body = document.querySelector('body'); //seleccionar body
        body.appendChild(overlay);
        body.classList = ('fijar-body');
}