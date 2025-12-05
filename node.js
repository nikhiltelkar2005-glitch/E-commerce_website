
function setupMobileMenu() {
    const menuButtons = document.querySelectorAll(".menu-btn");

    menuButtons.forEach(button => {
        const menu = button.nextElementSibling;

        button.addEventListener("click", () => {
            const isVisible = window.getComputedStyle(menu).display !== "none";

            if (isVisible) {
                menu.style.display = "none";
            } else {
                menu.style.display = "flex";
                menu.style.flexDirection = "column";
                menu.style.position = "absolute";
                menu.style.right = "20px";
                menu.style.top = "64px";
                menu.style.background = "rgba(255,255,255,0.98)";
                menu.style.padding = "12px";
                menu.style.borderRadius = "10px";
                menu.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                menu.style.gap = "12px";
            }
        });
    }); 
}

setupMobileMenu();

function setupAccountTabs() {
    const loginBtn = document.getElementById("showLogin");
    const registerBtn = document.getElementById("showRegister");
    const indicator = document.getElementById("indicator");

    const loginForm = document.getElementById("LoginForm");
    const registerForm = document.getElementById("RegForm");

    if (!loginBtn || !registerBtn || !indicator) return;

    function activate(tab) {
        if (tab === "login") {
            loginBtn.classList.add("active");
            registerBtn.classList.remove("active");

            loginForm.style.display = "block";
            registerForm.style.display = "none";

            indicator.style.transform = "translateX(0)";
        }

        if (tab === "register") {
            registerBtn.classList.add("active");
            loginBtn.classList.remove("active");

            registerForm.style.display = "block";
            loginForm.style.display = "none";

            indicator.style.transform = "translateX(100%)";
        }
    }

    loginBtn.addEventListener("click", () => activate("login"));
    registerBtn.addEventListener("click", () => activate("register"));

    activate("login");
}

setupAccountTabs();


function setupProductGallery() {
    const mainImage = document.getElementById("ProductImg");
    const thumbnails = document.querySelectorAll(".thumb");

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", () => {
            const src = thumb.getAttribute("src");

            mainImage.style.opacity = "0.5";

            setTimeout(() => {
                mainImage.src = src;
                mainImage.style.opacity = "1";
            }, 150);

            thumbnails.forEach(t => t.classList.remove("active"));
            thumb.classList.add("active");
        });
    });
}

setupProductGallery();


function parsePrice(text) {
    const number = text.replace(/[^\d]/g, "");
    return parseFloat(number) || 0;
}

function formatINR(value) {
    return "₹" + value.toLocaleString("en-IN");
}

function updateCart() {
    const rows = document.querySelectorAll("#cartBody tr");

    let subtotal = 0;

    rows.forEach(row => {
        const priceText = row.querySelector(".cart-info small").innerText;
        const price = parsePrice(priceText);

        const qtyInput = row.querySelector(".qty");
        const qty = parseInt(qtyInput.value) || 1;

        const itemTotal = price * qty;

        row.querySelector(".subtotal").innerText = formatINR(itemTotal);

        subtotal += itemTotal;
    });

    document.getElementById("summarySubtotal").innerText = formatINR(subtotal);
    document.getElementById("summaryTax").innerText = formatINR(0);
    document.getElementById("summaryTotal").innerText = formatINR(subtotal);
}

function setupCartFunctions() {
    const cartTable = document.getElementById("cartBody");
    if (!cartTable) return;

    cartTable.addEventListener("input", event => {
        if (event.target.classList.contains("qty")) {
            updateCart();
        }
    });

    cartTable.addEventListener("click", event => {
        if (event.target.classList.contains("remove")) {
            event.preventDefault();
            event.target.closest("tr").remove();
            updateCart();
        }
    });

    updateCart();
}

setupCartFunctions();



function setupRevealAnimations() {
    const elements = document.querySelectorAll(
        ".product-card, .offer-box, .testimonial-card, .brand-grid img, section"
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all .6s ease";
        observer.observe(el);
    });
}

setupRevealAnimations();


document.addEventListener("click", event => {
    const menus = document.querySelectorAll(".menu");

    menus.forEach(menu => {
        const isMenuOpen = window.getComputedStyle(menu).display !== "none";
        const clickedInsideMenu = menu.contains(event.target);
        const clickedButton = event.target.closest(".menu-btn");

        if (isMenuOpen && !clickedInsideMenu && !clickedButton) {
            if (window.innerWidth <= 600) {
                menu.style.display = "none";
            }
        }
    });
});