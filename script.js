// Sample product data
let products = [];

// Function to display products in the cart
function displayProducts() {
  const cartItems = document.getElementById('cartItems');

  // Clear the cart items before displaying
  cartItems.innerHTML = '';

  products.forEach(product => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `<p>${product.name} - $${product.price}</p>
                      <button onclick="removeItem('${product.name}')">Remove</button>`;
    cartItems.appendChild(slide);
  });
}

// Function to add an item to the cart
function addItem(name, price) {
  products.push({ name, price });

  // Save the updated products to local storage
  saveProductsToLocalStorage();

  // Display the updated products in the cart
  displayProducts();

  // Recalculate the total amount
  calculateTotal();
}

// Function to remove an item from the cart
function removeItem(productName) {
  const productIndex = products.findIndex(product => product.name === productName);

  if (productIndex !== -1) {
    // Remove the item from the products array
    products.splice(productIndex, 1);

    // Save the updated products to local storage
    saveProductsToLocalStorage();

    // Display the updated products in the cart
    displayProducts();

    // Recalculate the total amount
    calculateTotal();
  }
}

// Function to calculate total amount
function calculateTotal() {
  const totalAmount = document.getElementById('totalAmount');
  const amountValue = document.getElementById('amountValue');

  const total = products.reduce((acc, product) => acc + product.price, 0);
  amountValue.textContent = `$${total}`;

  // Save the total amount to local storage
  saveTotalAmountToLocalStorage();
}

// Function to apply a gift coupon (subtract 10%)
function applyCoupon() {
  const discountApplied = document.getElementById('discountApplied');
  const amountValue = document.getElementById('amountValue');

  const total = products.reduce((acc, product) => acc + product.price, 0);
  const discountedTotal = total * 0.9; // Apply 10% discount
  amountValue.textContent = `$${discountedTotal.toFixed(2)}`;

  discountApplied.textContent = 'Gift coupon applied (10% off)';

  // Save the discounted total amount to local storage
  saveTotalAmountToLocalStorage();
}

// Function to save products to local storage
function saveProductsToLocalStorage() {
  localStorage.setItem('cartProducts', JSON.stringify(products));
}

// Function to retrieve products from local storage
function getProductsFromLocalStorage() {
  const storedProducts = localStorage.getItem('cartProducts');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
    displayProducts();
    calculateTotal();
  }
}

// Function to save total amount to local storage
function saveTotalAmountToLocalStorage() {
  const amountValue = document.getElementById('amountValue');
  localStorage.setItem('totalAmount', amountValue.textContent);
}

// Function to retrieve total amount from local storage
function getTotalAmountFromLocalStorage() {
  const storedTotalAmount = localStorage.getItem('totalAmount');
  if (storedTotalAmount) {
    document.getElementById('amountValue').textContent = storedTotalAmount;
  }
}

// Retrieve stored products and total amount on page load
getProductsFromLocalStorage();
getTotalAmountFromLocalStorage();

// ...

// Example of adding an item to the cart from the gift page
// Call this function when the customer clicks on a gift item
function addToCartFromGiftPage() {
  // Add the item to the cart
  addItem('Diwali Offer', 20);
}
