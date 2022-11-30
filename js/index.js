// VARIABLES Y CONSTANTES
let totalCompra = 0
const PRODUCTOS = [],
    $productsSection = document.querySelector(".all-products"),
    $cartSection = document.querySelector(".cart"),
    $total = document.querySelector(".total"),
    $cartQuantity = document.querySelectorAll(".cartQuantity"),
    $filterBtn = Array.from(document.querySelectorAll(".filter-btn")),
    $buyBtn = document.querySelector(".buyBtn"),
    $vaciarBtn = document.querySelector(".emptyBtn")

document.addEventListener("DOMContentLoaded", () => {
    getCart()
    showAllProducts()
})

const showProducts = products => {
    /* Muestra los productos en la sección de "productos" y los agrega a un array */
    $productsSection.innerHTML = ""
    PRODUCTOS.length = 0
    products.forEach(product => {
        PRODUCTOS.push(product)
        const {id, marca, modelo, precio, imagen} = product
        $productsSection.innerHTML += `
        <div class="card">
            <div class="card-img">
                <img src=${imagen} alt="${marca} ${modelo}">
            </div>
            <div class="card-info">
                <div class="name-container">
                    <span class="name">${marca} ${modelo}</span>
                </div>
                <div class="price-container">
                    <span class="price">$${precio}</span>
                </div>
            </div>
            <div class="card-action">
                <button id="${id}" onClick="addToCartArray(${id})" class="addToCartBtn icon-btn add-btn">
                    <div class="add-icon"></div>
                    <div class="btn-txt"><i class="fa-solid fa-cart-plus addToCartBtn"></i></div>
                </button>
            </div>
        </div>        
        `
    })
}

async function showAllProducts(){
    /* Trae el archivo json con todos los productos y los muestra */
    const productosFetch = await fetch("productos.json")
    const productosJson = await productosFetch.json()
    showProducts(productosJson)
}

const filterProducts = async (e) => {
    /* Permite filtrar los productos */
    let marcaElegida = e.target.textContent
    $filterBtn.forEach(btn => btn.classList.remove("active"))
    e.target.classList.add("active")
    if (marcaElegida === "All"){
        showAllProducts()
    }else{
        const productosFetch = await fetch("productos.json")
        const productosJson = await productosFetch.json()
        // Filtra según la marca elegida
        const productosFiltrados = productosJson.filter(product => product.marca === marcaElegida)
        showProducts(productosFiltrados)
    }
}

$filterBtn.forEach(btn => {
    btn.onclick = (e) => filterProducts(e)
})

const addToCartArray = (id) => {
    /* Agrega el producto al carrito */
    if (IDS.indexOf(id) !== -1){
        throwAlert("El producto ya se ecuentra en el carrito", "Puedes cambiar la cantidad desde ahí.", "warning")
    }else{
        PRODUCTOS.forEach(product => {
            if(product.id === parseInt(id) && CARRITO.indexOf(product) === -1 && IDS.indexOf(product.id) === -1){
                CARRITO.push(product)
                IDS.push(product.id)
                updateCart()
                updateTotal()
                throwAlert("Producto agregado al carrito!", "", "success")
            }
        })
    }
}

const updateCart = () => {
    /* Actualiza el carrito y lo muestra */
    $cartSection.innerHTML = ""
    CARRITO.forEach(product => {
        const {id, marca, modelo, precio, cantidad, imagen} = product
        $cartSection.innerHTML += `
        <div class="cardInCart">
            <div class="container-img">
                <img src=${imagen} alt="${marca} ${modelo}">
            </div>
            <div class="info">
                <span class="nameInCart">${marca} ${modelo}</span>
                <span class="priceInCart">$${precio}</span>
                <input id="${id}" onChange="updateTotal(event)" type="number" min="1" max="5" value="${cantidad}" class="cart-quantity">
            </div>
                <i id="${id}" onClick="deleteProductFromCart(${id})" class="fa-solid fa-trash deleteBtn"></i>
            </div>
        `
    })
}

const deleteProductFromCart = id => {
    /* Elimina un producto del carrito */
    let index = IDS.indexOf(id)
    IDS.splice(index, 1)
    CARRITO.splice(index, 1)
    updateTotal()
    updateCart()
    PRODUCTOS.forEach(product => {
        if(product.id === parseInt(id)){
            product.cantidad = 1
        }
    })
}

const updateTotal = e => {
    /* Actualiza el total de la compra */
    if(e){
        let id = parseInt(e.target.id),
            quantity = parseInt(e.target.value)
        if (quantity > 5){
            quantity = 5
            e.target.value = 5
        }
        CARRITO.forEach(product => product.id === id ? product.cantidad = quantity : e.target.value = quantity)
    }
    totalCompra = 0
    CARRITO.forEach(product => totalCompra += product.precio * product.cantidad)
    $total.textContent = `Total: $${totalCompra}` 
    saveProductsAndPrice()
    $cartQuantity.forEach(span => span.textContent = CARRITO.length !== 0 ? CARRITO.map(producto => producto.cantidad).reduce((a, b) => a + b) : "0")
}

const saveProductsAndPrice = () => {
    /* Guarda los datos en el Local Storage */
    localStorage.setItem("carrito", JSON.stringify(CARRITO))
    localStorage.setItem("total", JSON.stringify(totalCompra))
    localStorage.setItem("ids", JSON.stringify(IDS))
}

function getCart(){
    /* Obtiene el carrito del Local Storage, si este no existe, lo crea */
    CARRITO = localStorage.getItem("carrito") === null ? CARRITO = [] : JSON.parse(localStorage.getItem("carrito"))
    IDS = localStorage.getItem("ids") === null ? IDS = [] : JSON.parse(localStorage.getItem("ids"))
    totalCompra = JSON.parse(localStorage.getItem("total"))
    updateCart()
    updateTotal()
    $cartQuantity.textContent = CARRITO.length !== 0 ? CARRITO.map(producto => producto.cantidad).reduce((a, b) => a + b) : "0"
}

$buyBtn.onclick = () => {
    /* Simula la compra */
    if (CARRITO.length > 0){
        throwAlert(`Tu compra de $${totalCompra} ha sido realizada!`, "Gracias por confiar en nosotros.", "success")
        totalCompra = 0
        CARRITO = []
        IDS = []
        updateCart()
        updateTotal()
    }else{
        throwAlert("El carrito se encuentra vacío.", "Agrega productos para poder comprar.", "error")
    }
}

$vaciarBtn.onclick = () => {
    /* Vacía el carrito */
    if (CARRITO.length > 0){
        throwAlert("Carrito vacío!", "", "success")
        totalCompra = 0
        CARRITO = []
        IDS = []
        updateCart()
        updateTotal()
    }else{
        throwAlert("El carrito ya se encuentra vacío.", "", "error")
    }
}

function throwAlert(primaryMessage, secondaryMessage, type){
    /* Lanza una alerta dependiendo el caso */
    Swal.fire(
        `${primaryMessage}`,
        `${secondaryMessage}`,
        `${type}`
    ) 
}