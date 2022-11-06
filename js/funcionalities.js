const $btnHamburger = document.getElementById("hamburgerBtn"),
    $btnSidebar = document.querySelector(".openClose-sidebar"),
    $sidebar = document.querySelector(".sidebar"),
    $menu = document.querySelector(".hamburger-menu"),
    $filterBtn = Array.from(document.querySelectorAll(".filter-btn"))

$btnHamburger.onclick = () => {
    $menu.classList.toggle("open-close-menu");
}

const filterProducts = (e) => {
    $filterBtn.forEach(btn => btn.classList.remove("active"))
    e.target.classList.add("active")
}

$filterBtn.forEach(btn => {
    btn.onclick = (e) => filterProducts(e)
})

document.onclick = (e) => {
    if (e.target.matches(".fa-cart-shopping") || e.target.matches(".fa-heart")){
        $sidebar.classList.toggle("open-close-sidebar")
    }

    if (e.target.matches(".fa-x")){
        $sidebar.classList.remove("open-close-sidebar")
    }
}