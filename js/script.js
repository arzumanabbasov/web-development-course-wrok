// Declare variables outside event handlers for global accessibility
const cart = document.querySelector('.shopping-cart');
const login = document.querySelector('.login-form');
const navbar = document.querySelector('.navbar');

// Function to toggle shopping cart
document.querySelector('#cart-btn').onclick = () => {
  cart.classList.toggle('active');
  login.classList.remove('active');
  navbar.classList.remove('active');
};

// Function to toggle login form
document.querySelector('#login-btn').onclick = () => {
  login.classList.toggle('active');
  cart.classList.remove('active');
  navbar.classList.remove('active');
};

// Function to toggle navbar
document.querySelector('#menu-btn').onclick = () => {
  navbar.classList.toggle('active');
  cart.classList.remove('active');
  login.classList.remove('active');
};

// Close components on scroll
window.onscroll = () => {
  cart.classList.remove('active');
  login.classList.remove('active');
  navbar.classList.remove('active');
};

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
  const cartItem = document.createElement('div');
  cartItem.classList.add('box');

  const productNumber = parseInt(name.split(' ')[1]);
  const imageSrc = `images/product-${productNumber}.jpg`;

  cartItem.innerHTML = `
    <i class="fas fa-times remove-item"></i>
    <img src="${imageSrc}" alt="${name}">
    <div class="content">
      <h3>${name}</h3>
      <span class="price">$${price.toFixed(2)}</span>
    </div>
  `;

  const totalSection = document.querySelector('.shopping-cart .total');
  cart.insertBefore(cartItem, totalSection);

  updateTotalAmount();

  cartItem.querySelector('.remove-item').addEventListener('click', () => {
    cartItem.remove();
    updateTotalAmount();
  });
}

// Select all heart icons and attach click event listener
document.querySelectorAll('.fa-heart').forEach(cartIcon => {
  cartIcon.addEventListener('click', event => {
    const product = event.target.closest('.content');
    const productName = product.querySelector('h3').textContent;
    const productPrice = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
    addToCart(productName, productPrice);
  });
});

// When user logs in, display a welcome message with the user's name
document.querySelector('#login-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  document.querySelector('#welcome-message').textContent = `Welcome, ${email}!`;
  document.querySelector('#login-form').reset();
  login.classList.remove('active');
  document.querySelector('#login-btn').style.display = 'none';
});

// Event listener for the shopping basket icon to redirect to payment page
document.querySelectorAll('.fa-shopping-cart').forEach(item => {
  item.addEventListener('click', event => {
    const contentElement = event.target.closest('.content');
    if (contentElement) {
      const priceElement = contentElement.querySelector('.price');
      if (priceElement) {
        const price = priceElement.textContent.trim().replace('$', '');
        window.location.href = `payment.html?price=${price}`;
      }
    }
  });
});

