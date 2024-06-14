
const contenedorRegistro = document.querySelector(".contenedorRegistro");
const contenedorInicio = document.querySelector(".contenedorInicio");
let posicionContenedor = "abajo";
let anchoPantalla = window.innerWidth;

window.addEventListener("resize", () => {
    anchoPantalla = window.innerWidth;
    console.log(anchoPantalla)
})

function desplazarContenedor(contenedor) {
    if (anchoPantalla < 900) {
        if (posicionContenedor === "abajo") {
            contenedor.style.top = "25vh";
            posicionContenedor = "arriba";
        } else {
            contenedor.style.top = "100vh";
            posicionContenedor = "abajo";
        }
    } else {
        if (contenedor === contenedorRegistro) {
            contenedorInicio.style.opacity = 0;
            contenedorInicio.style.zIndex = 0;
            aparecerContenedor(contenedorRegistro)
        } else {
            contenedorRegistro.style.opacity = 0;
            contenedorRegistro.style.zIndex = 0;
            aparecerContenedor(contenedorInicio)
        }
    }
}

function desaparecerBoton(boton) {
    if (anchoPantalla < 900) {
        boton.style.opacity = 0;
        setTimeout(() => {
            boton.style.opacity = 1;
        }, 1000);
    }
}

function aparecerContenedor(contenedor) {
    setTimeout(() => {
        contenedor.style.opacity = 1;
        contenedor.style.zIndex = 500;
    }, 1000);
}
