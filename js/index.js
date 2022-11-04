let totalCompra = 0,
    seguirComprando = true
const CARRITO = []
const PRODUCTOS = []

class Zapatilla {
    constructor(id, marca, modelo, precio, stock){
        this.id = id;
        this.marca = marca;
        this.precio = precio;
        this.modelo = modelo;
        this.stock = stock;
    }
}

const jordan = new Zapatilla(1, "Jordan", "Fly", 9999, 35)
const nike = new Zapatilla(2, "Nike", "Air Max", 20000, 50)
const adidas = new Zapatilla(3, "Adidas", "Yeezy", 49999, 10)
const puma = new Zapatilla(4, "Puma", "Cave", 13000, 80)
PRODUCTOS.push(jordan)
PRODUCTOS.push(nike)
PRODUCTOS.push(adidas)
PRODUCTOS.push(puma)

console.log(PRODUCTOS);

const descuento = (cantidad, totalCompra) => {
    let totalCompra2 = totalCompra
    if (cantidad >= 2 && cantidad < 5){
        let descuento = (totalCompra * 10) / 100
        console.log(descuento);
        totalCompra2 -= descuento
    }else if (cantidad >= 5){
        let descuento = (totalCompra * 20) / 100
        console.log(descuento);
        totalCompra2 -= descuento
    }
    console.log(totalCompra2);
    return totalCompra2
}

const  iniciarCompra = () => {
    while (seguirComprando) {
        let producto = parseInt(prompt('Escoge el producto que deseas comprar: 1.Jordan - 2.Nike - 3.Adidas - 4.Puma'))
        while (producto !== 1 && producto !== 2 && producto !== 3 && producto !== 4){
            producto = parseInt(prompt('Escoge el producto que deseas comprar: 1.Jordan - 2.Nike - 3.Adidas - 4.Puma'))
        }
        CARRITO.push(PRODUCTOS[producto - 1])
        let seguir = parseInt(prompt('¿Desea seguir comprando?: 1.SI - 2.NO'))
        while (seguir !== 1 && seguir !== 2){
            seguir = parseInt(prompt('¿Desea seguir comprando?: 1.SI - 2.NO'))
        }
        if (seguir === 2) {
            seguirComprando = false
        }
    }
    console.log(CARRITO);

    totalCompra = CARRITO.map(producto => producto.precio).reduce((a, b) => a + b)
    console.log(totalCompra);
    alert(`El total de su compra es de $${totalCompra}`)
    if(CARRITO.length > 1){
        let discount = descuento(CARRITO.length, totalCompra)
        alert(`Con el descuento aplicado, termina pagando: $${discount}`)
    }
}

// iniciarCompra()
