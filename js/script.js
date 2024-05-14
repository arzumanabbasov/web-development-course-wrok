// Declare variables outside event handlers for global accessibility
const cart = document.querySelector('.shopping-cart');

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

function updateTotalAmount() {
  let total = 0;
  document.querySelectorAll('.shopping-cart .price').forEach(item => {
    let price = parseFloat(item.textContent.replace('$', ''));
    total += price;
  });
  document.querySelector('.total span').textContent = '$' + total.toFixed(2);
}

// Event listener for removing items
document.querySelectorAll('.remove-item').forEach(item => {
  item.addEventListener('click', event => {
    const box = event.target.closest('.box');
    box.remove();
    updateTotalAmount();
  });
});

// Function to add items to cart
function addToCart(name, price) {
  // Create a new cart item element
  const cartItem = document.createElement('div');
  cartItem.classList.add('box'); // Change class to 'box' to match the shopping cart item structure

  // Extract the product number from the name (assuming the name format is "Product X")
  const productNumber = parseInt(name.split(' ')[1]);

  // Construct the image source dynamically
  const imageSrc = `images/product-${productNumber}.jpg`;

  // Construct the cart item HTML content
  cartItem.innerHTML = `
    <i class="fas fa-times remove-item"></i>
    <img src="${imageSrc}" alt="${name}">
    <div class="content">
      <h3>${name}</h3>
      <span class="price">$${price.toFixed(2)}</span>
    </div>
  `;

  // Find the position of the "Total" section and insert the new cart item before it
  const totalSection = document.querySelector('.shopping-cart .total');
  cart.insertBefore(cartItem, totalSection);

  // Update total amount in the UI
  updateTotalAmount();

  // Add event listener to remove button
  cartItem.querySelector('.remove-item').addEventListener('click', () => {
    // Remove the cart item from the shopping cart
    cartItem.remove();
    // Recalculate total price after item removal
    updateTotalAmount();
  });
}

// Select all shopping cart icons in the product section and attach click event listener
document.querySelectorAll('.fa-shopping-cart').forEach(cartIcon => {
  cartIcon.addEventListener('click', event => {
    const product = event.target.closest('.box');
    const productName = product.querySelector('h3').textContent;
    const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
    addToCart(productName, productPrice);
  });
});
