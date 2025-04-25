const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click",  event => {
        const productBox = event.target.closest(".showcase");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cart-content");

const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".showcase-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItem = cartContent.querySelectorAll(".cart-product-title");
    for(let item of cartItem){
        if(item.textContent === productTitle){
            alert("This item is already in the cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" alt="cart-img">
        <div class="cart-detail">
            <div class="cart-info">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement" id="decrement">-</button>
                <span class="number">1</span>
                <button class="increment" id="increment">+</button>
            </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>
        </div>
    `;

    cartContent.appendChild(cartBox);

    alert(`✅ ${productTitle} has been successfully added to your cart.`);

    cartBox.querySelector(".cart-remove").addEventListener("click", () =>{
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event =>{
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if(event.target.id === "decrement" && quantity > 1){
            quantity--;
            if(quantity === 1){
                decrementButton.style.color = "#999";
            }
        } else if(event.target.id === "increment"){
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();
};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");

    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");

        const price = parseFloat(priceElement.textContent.trim().replace(/[₱,]/g, '')) || 0;
        const quantity = parseInt(quantityElement.textContent.trim()) || 0;

        total += price * quantity;
    });

    totalPriceElement.textContent = `₱${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
};

let cartItemCount = 0;

const updateCartCount = (change) => {
    const cartItemBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;

    if (cartItemCount > 0) {
        cartItemBadge.style.visibility = "visible";
        cartItemBadge.textContent = cartItemCount;
    } else {
        cartItemBadge.style.visibility = "hidden";
        cartItemBadge.textContent = "";
    }
};

const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () =>{
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if(cartBoxes.length === 0){
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase!");
});