let totalCompra = 0
document.addEventListener("DOMContentLoaded", () => {
    getCart()
    showProducts()
})
const PRODUCTOS = [],
$productsSection = document.querySelector(".all-products"),
$cartSection = document.querySelector(".cart"),
$total = document.querySelector(".total")


class Zapatilla {
    constructor(id, marca, modelo, precio, cantidad, URL, inCart, inWishlist){
        this.id = id;
        this.marca = marca;
        this.precio = precio;
        this.modelo = modelo;
        this.cantidad = cantidad;
        this.URL = URL;
        this.inCart = inCart;
        this.inWishlist = inWishlist;
    }
}

function showProducts(){
    const jordan = new Zapatilla(1, "Jordan", "Fly", 9999, 1, "img/jordan1.jpg")
    const nike = new Zapatilla(2, "Nike", "Air Max", 20000, 1, "img/nike1.jpg")
    const adidas = new Zapatilla(3, "Adidas", "Yeezy", 49999, 1, "img/adidas1.webp")
    const puma = new Zapatilla(4, "Puma", "Cave", 13000, 1, "img/puma1.jpg")
    PRODUCTOS.push(jordan)
    PRODUCTOS.push(nike)
    PRODUCTOS.push(adidas)
    PRODUCTOS.push(puma)
    PRODUCTOS.forEach(product => {
        $productsSection.innerHTML += `
        <div class="card">
                <div class="card-img">
                    <img src=${product.URL} alt="">
                </div>
                <div class="card-info">
                    <div class="name-container">
                        <span class="name">${product.marca} ${product.modelo}</span>
                    </div>
                    <div class="price-container">
                        <span class="price">$${product.precio}</span>
                    </div>
                </div>
                <div class="card-action">
                    <i id="${product.id}" onClick="addToCartArray(${product.id})" class="fa-solid fa-cart-plus addToCartBtn"></i>
                    <i id="${product.id}" class="fa-solid fa-heart-circle-plus addToWishBtn"></i>
                </div>
            </div>
        `
    })
}

const addToCartArray = (id) => {
    PRODUCTOS.forEach(product => {
        if(product.id === parseInt(id) && CARRITO.indexOf(product) === -1 && IDS.indexOf(product.id) === -1){
            CARRITO.push(product)
            IDS.push(product.id)
            addToCart()
            updateTotal()
        }
    })
}

const addToCart = () => {
    $cartSection.innerHTML = ""
    CARRITO.forEach(product => {
        $cartSection.innerHTML += `
        <div class="cardInCart">
            <div class="container-img">
                <img src=${product.URL} alt="">
            </div>
            <div class="info">
                <span class="nameInCart">${product.marca} ${product.modelo}</span>
                <span class="priceInCart">$${product.precio}</span>
                <input id="${product.id}" onClick="updateTotal(event)" type="number" min="1" max="5" value="${product.cantidad}" class="cart-quantity">
            </div>
                <i id="${product.id}" class="fa-solid fa-trash deleteBtn"></i>
            </div>
        `
    })
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
    addToCart()
    updateTotal()

}

