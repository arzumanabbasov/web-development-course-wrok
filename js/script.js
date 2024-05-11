// Declare variables outside event handlers for global accessibility
const cart = document.querySelector('.shopping-cart');
const login = document.querySelector('.login-form');
const navbar = document.querySelector('.navbar');

// Function to toggle shopping cart
document.querySelector('#cart-btn').onclick = () => {
  cart.classList.toggle('active');
  login.classList.remove('active');
  navbar.classList.remove('active');
}

// Function to toggle login form
document.querySelector('#login-btn').onclick = () => {
  login.classList.toggle('active');
  cart.classList.remove('active');
  navbar.classList.remove('active');
}

// Function to toggle navbar
document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  cart.classList.remove('active');
  login.classList.remove('active');
}

// Close components on scroll
window.onscroll = () => {
  cart.classList.remove('active');
  login.classList.remove('active');
  navbar.classList.remove('active');
}

// Initialize Swiper for Review Slider
var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  loop: true,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    991: {
      slidesPerView: 3,
    },
  },
});

// Function to update total amount
function updateTotalAmount() {
  let total = 0;
  document.querySelectorAll('.box').forEach(item => {
    // Extract the price from each item
    let price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
    total += price;
  });
  // Update the total amount in the HTML
  document.querySelector('.total span').textContent = '$' + total.toFixed(2);
}

// Event listener for removing items
document.querySelectorAll('.remove-item').forEach(item => {
  item.addEventListener('click', event => {
    // Get the parent element of the clicked "X" icon
    const box = event.target.closest('.box');
    // Remove the parent element from the DOM
    box.remove();
    // Update the total amount
    updateTotalAmount();
  });
});

// Call the function initially to calculate the total amount
updateTotalAmount();

// Select all elements with class "add-to-cart" and attach click event listener
document.querySelectorAll('.add-to-cart').forEach(item => {
  item.addEventListener('click', event => {
    // Find the parent element (product) of the clicked icon
    const product = event.target.closest('.product');
    // Extract product details
    const productName = product.querySelector('h3').textContent;
    const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
    // Add product to shopping cart
    addToCart(productName, productPrice);
  });
});

// Function to add items to cart
function addToCart(name, price) {
  // Create a new cart item element
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item');

  // Construct the cart item HTML content
  cartItem.innerHTML = `
      <span class="item-name">${name}</span>
      <span class="item-price">$${price.toFixed(2)}</span>
      <button class="remove-item-btn">Remove</button>
  `;

  // Append the cart item to the shopping cart
  cart.appendChild(cartItem);

  // Calculate total price
  let total = 0;
  document.querySelectorAll('.item-price').forEach(item => {
    total += parseFloat(item.textContent.replace('$', ''));
  });

  // Update total price in the UI
  document.querySelector('.total span').textContent = `$${total.toFixed(2)}`;

  // Add event listener to remove button
  cartItem.querySelector('.remove-item-btn').addEventListener('click', () => {
    // Remove the cart item from the shopping cart
    cartItem.remove();
    // Recalculate total price after item removal
    let updatedTotal = 0;
    document.querySelectorAll('.item-price').forEach(item => {
      updatedTotal += parseFloat(item.textContent.replace('$', ''));
    });
    // Update total price in the UI after item removal
    document.querySelector('.total span').textContent = `$${updatedTotal.toFixed(2)}`;
  });

  // Log message to console
  console.log(`Added to cart: ${name} - $${price}`);
  // Here you can update the UI to reflect the added product, such as updating the shopping cart icon or displaying a notification
}
