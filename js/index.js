let totalCompra = 0
document.addEventListener("DOMContentLoaded", () => {
    getCart()
    showAllProducts()
})
const PRODUCTOS = [],
    $productsSection = document.querySelector(".all-products"),
    $cartSection = document.querySelector(".cart"),
    $total = document.querySelector(".total"),
    $cartQuantity = document.querySelectorAll(".cartQuantity"),
    $filterBtn = Array.from(document.querySelectorAll(".filter-btn"))

const showProducts = products => {
    $productsSection.innerHTML = ""
    products.forEach(product => {
        PRODUCTOS.push(product)
        const {id, marca, modelo, precio, cantidad, imagen} = product
        $productsSection.innerHTML += `
        <div class="card">
                <div class="card-img">
                    <img src=${imagen} alt="">
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
                    <i id="${id}" onClick="addToCartArray(${id})" class="fa-solid fa-cart-plus addToCartBtn"></i>
                    <i id="${id}" class="fa-solid fa-heart-circle-plus addToWishBtn"></i>
                </div>
            </div>
        `
    })
}

async function showAllProducts(){
    const productosFetch = await fetch("productos.json")
    const productosJson = await productosFetch.json()
    showProducts(productosJson)
}

const filterProducts = async (e) => {
    let marcaElegida = e.target.textContent
    $filterBtn.forEach(btn => btn.classList.remove("active"))
    e.target.classList.add("active")
    if (marcaElegida === "All"){
        showAllProducts()
    }else{
        const productosFetch = await fetch("productos.json")
        const productosJson = await productosFetch.json()
        const productosFiltrados = productosJson.filter(product => product.marca === marcaElegida)
        showProducts(productosFiltrados)
    }
}

$filterBtn.forEach(btn => {
    btn.onclick = (e) => filterProducts(e)
})

const addToCartArray = (id) => {
    PRODUCTOS.forEach(product => {
        if(product.id === parseInt(id) && CARRITO.indexOf(product) === -1 && IDS.indexOf(product.id) === -1){
            CARRITO.push(product)
            IDS.push(product.id)
            updateCart()
            updateTotal()
        }
    })
}

const updateCart = () => {
    $cartSection.innerHTML = ""
    CARRITO.forEach(product => {
        const {id, marca, modelo, precio, cantidad, imagen} = product
        $cartSection.innerHTML += `
        <div class="cardInCart">
            <div class="container-img">
                <img src=${imagen} alt="">
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
    let index = IDS.indexOf(id)
    IDS.splice(index, 1)
    CARRITO.splice(index, 1)
    updateTotal()
    updateCart()
}

const updateTotal = e => {
    if(e){
        let id = parseInt(e.target.id),
            quantity = parseInt(e.target.value)
        CARRITO.forEach(product => {
            if (product.id === id) {
                product.cantidad = quantity 
            }else{
                e.target.value = quantity
            } 
                
        })
    }
    totalCompra = 0
    CARRITO.forEach(product => {
        totalCompra += product.precio * product.cantidad
    })
    $total.textContent = `Total: $${totalCompra}` 
    saveProductsAndPrice()
    $cartQuantity.forEach(span => {
        span.textContent = CARRITO.length !== 0 ? CARRITO.map(producto => producto.cantidad).reduce((a, b) => a + b) : "0"
    })
}

const saveProductsAndPrice = () => {
    localStorage.setItem("carrito", JSON.stringify(CARRITO))
    localStorage.setItem("total", JSON.stringify(totalCompra))
    localStorage.setItem("ids", JSON.stringify(IDS))
}

function getCart(){
    CARRITO = localStorage.getItem("carrito") === null ? CARRITO = [] : JSON.parse(localStorage.getItem("carrito"))
    IDS = localStorage.getItem("ids") === null ? IDS = [] : JSON.parse(localStorage.getItem("ids"))
    totalCompra = JSON.parse(localStorage.getItem("total"))
    updateCart()
    updateTotal()
    $cartQuantity.textContent = CARRITO.length !== 0 ? CARRITO.map(producto => producto.cantidad).reduce((a, b) => a + b) : "0"
}

