const $btnHamburger = document.getElementById("hamburgerBtn"),
    $btnSidebar = document.querySelector(".openClose-sidebar"),
    $sidebar = document.querySelector(".sidebar"),
    $menu = document.querySelector(".hamburger-menu"),
    $inputSearch = document.querySelector("#buscador")

$btnHamburger.onclick = () => {
    $menu.classList.toggle("open-close-menu");
}

document.onclick = (e) => {
    if (e.target.matches(".fa-cart-shopping") || e.target.matches(".fa-heart")){
        $sidebar.classList.toggle("open-close-sidebar")
    }

    if (e.target.matches(".fa-x")){
        $sidebar.classList.remove("open-close-sidebar")
    }
}

$inputSearch.onkeyup = (e) => {
    let buscado = e.target.value.toLowerCase()
    filter(buscado)
}

function filter(buscado){
    document.querySelectorAll(".card").forEach(card => {
        card.children[1].children[0].children[0].textContent.toLowerCase().includes(buscado)
        ? card.classList.remove("filter")
        : card.classList.add("filter")
    })
}
