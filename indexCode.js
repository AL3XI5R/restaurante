const hamburguesa = document.querySelector(".fa-bars");
const links = document.querySelector(".links");
const lineaDivision = document.querySelector(".lineaDivision");
/* const header = document.querySelector("header"); */
const movimientoCelular = 0.02;
const movimientoTablet = 0.01;
const movimientoEscritorio = 0.05
let tamañoPantalla = window.innerWidth;
const textoAMover = document.querySelector(".textosMesaOscuraScroll");
const linksHeader = document.querySelectorAll(".links a");
const barraCarga = document.querySelector(".rellenoCarga");
const pantallaCarga = document.querySelector(".pantallaCarga")
const contenidoPagina = document.querySelector(".contenidoCompleto")
let progreso = 10;
const body = document.querySelector("body")

/* Al cargar la página se guarda la posicion de las imagenes; 
Al hacer resize se vuelve a guardar;
Cuando la imagen no está en el viewport vuelve a esa posicion;
 */

document.addEventListener("DOMContentLoaded", () => {
  
  function multimediaCargada() {
    ilustraciones = document.querySelectorAll(".multimedia")
    video = document.querySelector(".videoFondo")

    ilustraciones.forEach(ilustracion => {
      if (!ilustracion.complete) {
        return false
      }
    })
    if (video.readyState !== 4) {
      return false
    }
    return true;
  }

  function cambiarProgresoCarga() {
    barraCarga.classList.add("bg-slate-50")
    if (progreso < 85) {
      console.log(progreso)
      progreso += 1;
      barraCarga.style.width = `${progreso}%`
      barraCarga.textContent = `${Math.floor(progreso)}%`;
      setTimeout(cambiarProgresoCarga, 100);
    } else if (multimediaCargada()) {
      barraCarga.classList.add("duration-700")
      progreso = 100;
      barraCarga.style.width = `${progreso}%`
      barraCarga.textContent = `${progreso}%`;
      setTimeout(() => {
        pantallaCarga.classList.add("duration-700")
        pantallaCarga.style.filter = "brightness(0)"
        setTimeout(() => {
          pantallaCarga.classList.add("hidden");
          contenidoPagina.classList.remove("hidden");
          setTimeout(() => {
            contenidoPagina.style.filter = "brightness(1)";
            body.removeChild(pantallaCarga)
            setTimeout(() => {
              contenidoPagina.removeAttribute("style", "")
              contenidoPagina.classList.remove("brightness-0")
            }, 200);
          }, 0);
        }, 1000);
      }, 500);
    } else {
      setTimeout(cambiarProgresoCarga, 100);
    }
  }
  cambiarProgresoCarga()

  linksHeader.forEach(link => {
    link.setAttribute("data-contenido-link", link.textContent)});
})





function actualizarTamañoPantalla() {
  tamañoPantalla = window.innerWidth
  if( tamañoPantalla < 560) {
  textoAMover.classList.remove("moverScrollInverso")
} else {
  textoAMover.classList.add("moverScrollInverso")
}
}

window.addEventListener("resize", actualizarTamañoPantalla)




const header = document.querySelector("header");

window.addEventListener("scroll", () =>{
    scrollActual = window.scrollY;
    if (scrollActual > 1) {
        header.classList.add("scrollHeader")
    } else {
        header.classList.remove("scrollHeader")
    }
})












hamburguesa.addEventListener("click", () => {
    console.log("click")
    links.classList.toggle("active");
    lineaDivision.classList.toggle("active");
    header.classList.toggle("active");
})





function moverScroll(objeto) {
  let posicionInicial = parseFloat(getComputedStyle(objeto).top); /* posición inicial del elemento */
  let scrollDirection = 0; /* dirección de scroll */
  let scrollYOffset = 0; /* cantidad de scroll */
  let posicionNueva = null;

  function actualizarPosicionInicial() {
    posicionInicial = parseFloat(getComputedStyle(objeto).top);
  }
  
  actualizarPosicionInicial();
  
  window.addEventListener('scroll', () => {
    actualizarPosicionInicial();
    const scrollActual = window.scrollY;
    const nuevoScroll = scrollActual > scrollYOffset ? 1 : scrollActual < scrollYOffset ? -1 : 0;   /* Dirección del scroll */

    if (nuevoScroll !== scrollDirection) {
        scrollDirection = nuevoScroll;
    }

    scrollYOffset = scrollActual; /* Actualizar el scroll */

    const inicio = Date.now();
    const duracion = 2500; // Milisegundos

    function move() {
      const elapsed = Date.now() - inicio;
      const progreso = Math.min(elapsed / duracion, 1); /* Máximo 1 */
      const progresoSuave = easeOutQuart(progreso);
      if (tamañoPantalla <= 560){
          posicionNueva = posicionInicial + scrollDirection * scrollYOffset * movimientoCelular * progresoSuave;
        }else if(tamañoPantalla  > 560){
            posicionNueva = posicionInicial + scrollDirection * scrollYOffset * movimientoTablet * progresoSuave;
        } else if (tamañoPantalla > 1050){
              posicionNueva = posicionInicial + scrollDirection * scrollYOffset * movimientoEscritorio * progresoSuave;
      }

      objeto.style.top = `${posicionNueva}px`;

      if (progreso < 1) {
        requestAnimationFrame(move); /* Continúa animando hasta que el progreso sea 1 */
      }
    }

    // Verificar si estamos en el tope de la página
    const atTop = (scrollActual === 0);
    const atBottom = (window.innerHeight + scrollActual >= document.documentElement.scrollHeight);

    if (atTop || atBottom) {
      scrollYOffset = scrollActual + (atTop ? 800 : 100); /* Aumenta scrollYOffset cuando se llega al tope de la página */
      scrollDirection = atTop ? -1 : 1; /* Simula el scroll inverso cuando se llega a los topes */
      move();
    } else {
      move();
    }
  });

  window.addEventListener('scroll', actualizarPosicionInicial);

  /* Función de easing para suavizar el movimiento */
  function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
  }
}

// Llamar a la función con diferentes elementos
document.querySelectorAll('.moverScroll').forEach(elemento => {
  moverScroll(elemento);
});



/* --------SCROLL INVERSO---------- */


function moverScrollInverso(objeto) {
  let posicionInicialInverso = parseFloat(getComputedStyle(objeto).top); /* posición inicial del elemento */
  let direccionScrollInverso = 0; /* dirección de scroll */
  let scrollYOfsetInverso = 0; /* cantidad de scroll */
  let posicionNuevaInverso = null;

  function actualizarposicionInicialInverso() {
    posicionInicialInverso = parseFloat(getComputedStyle(objeto).top);
  }
  
  actualizarposicionInicialInverso();
  
  window.addEventListener('scroll', () => {
    actualizarposicionInicialInverso();
    const scrollActualInverso = window.scrollY;
    const nuevoScrollInverso = scrollActualInverso > scrollYOfsetInverso ? 1 : scrollActualInverso < scrollYOfsetInverso ? -1 : 0; /* Dirección del scroll */

    if (nuevoScrollInverso !== direccionScrollInverso) {
        direccionScrollInverso = nuevoScrollInverso;
    }

    scrollYOfsetInverso = scrollActualInverso; /* Actualizar el scroll */

    const inicioInverso = Date.now();
    const duracionInverso = 2500; // Milisegundos

    function move() {
      const elapsedInverso = Date.now() - inicioInverso;
      const progresoInverso = Math.min(elapsedInverso / duracionInverso, 1); /* Máximo 1 */
      const progresoSuaveInverso = easeOutQuart(progresoInverso);
      if (tamañoPantalla <= 560){
        posicionNuevaInverso = posicionInicialInverso - direccionScrollInverso * scrollYOfsetInverso * (movimientoCelular + 0.01) * progresoSuaveInverso;
      }else if(tamañoPantalla  > 560){
          posicionNuevaInverso = posicionInicialInverso - direccionScrollInverso * scrollYOfsetInverso * (movimientoTablet + 0.01) * progresoSuaveInverso;
      } else if (tamañoPantalla > 1050){
            posicionNuevaInverso = posicionInicialInverso - direccionScrollInverso * scrollYOfsetInverso * (movimientoEscritorio + 0.01) * progresoSuaveInverso;
    }

      objeto.style.top = `${posicionNuevaInverso}px`;

      if (progresoInverso < 1) {
        requestAnimationFrame(move); /* Continúa animando hasta que el progreso sea 1 */
      }
    }

    // Verificar si estamos en el tope de la página
    const atTopInverso = (scrollActualInverso === 0);
    const atBottomInverso = (window.innerHeight + scrollActualInverso >= document.documentElement.scrollHeight);

    if (atTopInverso || atBottomInverso) {
      direccionScrollInverso = atTopInverso ? 1 : 1; /* Simula el scroll inverso cuando se llega a los topes */
      scrollYOfsetInverso = atTopInverso ? -800 : 800; /* Ajusta el offset de scroll para continuar el movimiento */
      move();
    } else {
      move();
    }
  });

  window.addEventListener('scroll', actualizarposicionInicialInverso);

  /* Función de easing para suavizar el movimiento */
  function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
  }
}

// Llamar a la función con diferentes elementos
document.querySelectorAll('.moverScrollInverso').forEach(elementoInverso => {
  moverScrollInverso(elementoInverso);
  console.log(elementoInverso)
});
