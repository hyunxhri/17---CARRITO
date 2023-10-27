// SELECTORES

const carrito = document.querySelector("#carrito")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const listaCursos = document.querySelector("#lista-cursos")


// VARIABLES
    let articulosCarrito = []

// FUNCIONES

const vaciarElementosCarrito = () => {
    limpiarHTML()
    articulosCarrito = []
    localStorage.setItem("articulos", JSON.stringify(articulosCarrito))
}

const eliminarCurso = (e) => {
    if(e.target.classList.contains("borrar-curso")){
        const cursoID = e.target.getAttribute("data-id")
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID) // Copia todos los elementos diferentes al id que ha clickado, es decir, está borrado.
        almacenaCarrito(articulosCarrito) // Almacena de nuevo el carrito sin ese curso
    }
}

const addCurso = (e) => {
    e.preventDefault()
    if(e.target.classList.contains("agregar-carrito")){
        const curso = e.target.parentElement.parentElement
        leerDatosCurso(curso)
    }
}

// Lee la información del curso seleccionado
const leerDatosCurso = (curso) => {
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }


    if(localStorage.getItem("articulos")){
        actualizaCarrito(infoCurso)
    } else {
        almacenaCarrito(articulosCarrito)
    }
}


const actualizaCarrito = (infoCurso) => {
    articulosCarrito = JSON.parse(localStorage.getItem("articulos"))

    // Revisamos si ya existe el curso en el carrito
    const existe = articulosCarrito.some(curso => curso.id  === infoCurso.id) // Comprueba si el id del curso que recorre en el carrito (curso) coincide con el id del curso que vamos a meter (infoCurso)
    if (existe){
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++
                return curso
            }
        })
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso] //Copia lo que tenemos en el carrito y le añade el nuevo curso
    }

    almacenaCarrito(articulosCarrito)
}

const carritoHTML = () => {
    limpiarHTML()

    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `
        contenedorCarrito.appendChild(row)
    })
}

const limpiarHTML = () => {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.firstChild.remove()
    }
}

const almacenaCarrito = (articulosCarrito) => {
    localStorage.setItem("articulos", JSON.stringify(articulosCarrito))
    const articulosStr = localStorage.getItem("articulos")
    console.log(articulosStr)
    carritoHTML()
}


// LISTENERS
const cargarEventsListeners = () => {
    listaCursos.addEventListener("click", addCurso)
    carrito.addEventListener("click", eliminarCurso)
    vaciarCarrito.addEventListener("click", vaciarElementosCarrito)
    window.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("articulos"))
        carritoHTML()
      })
}

cargarEventsListeners()

