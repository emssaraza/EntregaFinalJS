/* const productos = [
  {
    imagen: "img/juguetes.jpg",
    nombre: "Campanilla loro",
    categoria: "Juguetes",
    precio: 6000
  },
  {
    imagen: "img/juguetes-2.jpg",
    nombre: "Pelota con sonido",
    categoria: "Juguetes",
    precio: 15000
  },
  {
    imagen: "img/comederos.jpg",
    nombre: "Comedero",
    categoria: "Juguetes",
    precio: 50000
  },
  {
    imagen: "img/higiene.jpg",
    nombre: "Regadera perro",
    categoria: "Cuidado",
    precio: 60000
  },
  {
    imagen: "img/higiene-2.jpg",
    nombre: "Jabon antipulgas",
    categoria: "Cuidado",
    precio: 13000
  },
  {
    imagen: "img/limpieza.jpg",
    nombre: "Cepillo suave",
    categoria: "Cuidado",
    precio: 19000
  },
  {
    imagen: "img/paseo.jpg",
    nombre: "Correa larga",
    categoria: "Paseo",
    precio: 30000
  },
  {
    imagen: "img/descanso.jpg",
    nombre: "Cama artesanal",
    categoria: "Paseo",
    precio: 14.99
  },
  {
    imagen: "img/descanso-2.jpg",
    nombre: "Cama pequeña",
    categoria: "Paseo",
    precio: 20000
  }
]; */

const contenedorTarjetas = document.getElementById("tarjeta-productos");
const filtroInput = document.getElementById("filtro");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const listaProductos = document.getElementById("lista-productos");
const cantidadProductos = document.getElementById("cantidad-productos");
const sumaTotal = document.getElementById("suma-total");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const finalizarCompra = document.getElementById("finalizar-compra");
const productosAgregados = [];

let totalProductos = 0;
let totalPrecio = 0;
let productos = [];

// Codigo que se ejecuta automaticamente
document.body.onload = function () {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      productos = json;
      generarTarjetas(productos);
    });
};

// Generar tarjetas de productos
function generarTarjetas(productos) {

  productos.forEach(function (producto) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    const imagen = document.createElement("img");
    imagen.src = producto.image;
    tarjeta.appendChild(imagen);

    const nombre = document.createElement("h3");
    nombre.textContent = producto.title;
    tarjeta.appendChild(nombre);

    const categoria = document.createElement("p");
    categoria.innerHTML = "<span>Categoría:</span> " + producto.category;
    tarjeta.appendChild(categoria);

    const precio = document.createElement("p");
    precio.innerHTML = "<span>Precio:</span> $" + producto.price;
    tarjeta.appendChild(precio);

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar";
    tarjeta.appendChild(botonAgregar);

    botonAgregar.addEventListener("click", function () {
      agregarProducto(producto);
      actualizarContadorCarro();
      mostrarPopup("Producto agregado");
    });

    contenedorTarjetas.appendChild(tarjeta);
  });
}

// Función para mostrar el popup con el mensaje
function mostrarPopup(mensaje) {
  Swal.fire('Producto Agregado')

  // Desaparecer el popup después de 3 segundos
  setTimeout(function () {
    popup.style.display = "none";
  }, 3000);
}

// Función para agregar un producto a la lista de productos agregados
function agregarProducto(producto) {
  productosAgregados.push(producto);
  totalProductos++;
  totalPrecio += producto.price;

  // Actualizar la lista de productos en HTML
  const itemLista = document.createElement("li");
  itemLista.textContent = producto.title;
  listaProductos.appendChild(itemLista);

  // Actualizar la cantidad de productos en HTML
  cantidadProductos.textContent =
    "Cantidad de productos agregados: " + totalProductos;

  // Actualizar la suma total del precio en HTML
  sumaTotal.textContent = "Suma total: $" + totalPrecio.toFixed(0);
}
function borrarProductos() {
  productosAgregados.length = 0;
  totalProductos = 0;
  totalPrecio = 0;
  actualizarContadorCarro();

  // Limpiar la lista de productos en HTML
  listaProductos.innerHTML = "";

  // Actualizar la cantidad de productos en HTML
  cantidadProductos.textContent =
    "Cantidad de productos agregados: " + totalProductos;

  // Actualizar la suma total del precio en HTML
  sumaTotal.textContent = "Suma total: $" + totalPrecio.toFixed(2);
}
// Función para vaciar el carrito
vaciarCarrito.addEventListener("click", borrarProductos);

// Función para finalizar la compra
finalizarCompra.addEventListener("click", function () {
  borrarProductos ()
  Swal.fire(
    'Compra Finalizada',
    'Pronto recibiras la confirmación en tu email',
    'success'
  )
});

// Función para filtrar los productos
function filtrarProductos() {
  const textoFiltro = filtroInput.value.toLowerCase();
  const productosFiltrados = productos.filter(function (producto) {
    const nombre = producto.title.toLowerCase();
    const categoria = producto.category.toLowerCase();
    return nombre.includes(textoFiltro) || categoria.includes(textoFiltro);
  });

  // Limpiar el contenedor de tarjetas
  contenedorTarjetas.innerHTML = "";

  // Generar las tarjetas de los productos filtrados
  productosFiltrados.forEach(function (producto) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";

    const imagen = document.createElement("img");
    imagen.src = producto.image;
    tarjeta.appendChild(imagen);

    const nombre = document.createElement("h3");
    nombre.textContent = producto.name;
    tarjeta.appendChild(nombre);

    const categoria = document.createElement("p");
    categoria.innerHTML = "<span>Categoría:</span> " + producto.category;
    tarjeta.appendChild(categoria);

    const precio = document.createElement("p");
    precio.innerHTML = "<span>Precio:</span> $" + producto.price.toFixed(0);
    tarjeta.appendChild(precio);

    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "Agregar";
    tarjeta.appendChild(botonAgregar);

    contenedorTarjetas.appendChild(tarjeta);
  });
}
// Función para mostrar el carrito
const popupCarro = document.getElementById("popupcarro");
const botonCarrito = document.getElementById("boton-carrito");
botonCarrito.addEventListener("click", function () {
  popupCarro.classList.add("visible");
});

const botoncerrarCarro = document.getElementById("cerrar-carro");
botoncerrarCarro.addEventListener("click", function () {
  popupCarro.classList.remove("visible");
});

function actualizarContadorCarro() {
  const cantidadCarrito = document.getElementById("contador-productos");
  cantidadCarrito.textContent = productosAgregados.length;
}

// Evento para el input de filtro
filtroInput.addEventListener("input", filtrarProductos);
