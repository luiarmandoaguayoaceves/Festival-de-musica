document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
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