const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

btnCart.addEventListener('click', () => {
  cart.classList.add('active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', () => {
  loadContent();
});

let itemList = [];

function loadContent() {
  const removeButtons = document.querySelectorAll('.cart-remove');
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  const quantityInputs = document.querySelectorAll('.cart-quantity');
  quantityInputs.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  const addCartButtons = document.querySelectorAll('.add-cart');
  addCartButtons.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });

  updateTotal();
}

function removeItem() {
  if (confirm('Are you sure you want to remove this item?')) {
    const title = this.parentElement.querySelector('.cart-food-title').innerText;
    itemList = itemList.filter(item => item.title !== title);
    this.parentElement.remove();
    loadContent();
  }
}

function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  updateTotal();
}

function addCart() {
  const food = this.closest('.food-box');
  const title = food.querySelector('.food-title').innerText;
  const price = parseFloat(food.querySelector('.food-price').innerText.replace('Rs. ', ''));
  const imgSrc = food.querySelector('.food-image').src;

  const existingItem = itemList.find(item => item.title === title);
  if (existingItem) {
    alert("Product is already in the cart!");
    return;
  }

  const newItem = { title, price, imgSrc };
  itemList.push(newItem);

  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-box');
  cartItem.innerHTML = `
    <img src="${imgSrc}" class="cart-img" alt="${title}">
    <div class="detail-box">
      <div class="cart-food-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">Rs. ${price}</div>
        <div class="cart-amt">Rs. ${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <ion-icon name="trash" class="cart-remove
::contentReference[oaicite:0]{index=0}
 
