const btnCart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnClose = document.querySelector("#cart-close");

// Cart Button Activate 

btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-activate');
});

// Cart Button close

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-activate');
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood(){
    loadContent();
}


// mAin Function 

function loadContent(){
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click', removeItem);
    });

    // cart quantity 
    let qntyElement = document.querySelectorAll('.cart-quantity');
    qntyElement.forEach((input)=>{
        input.addEventListener('change', changeQty);
    });

    // add to cart 

    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn) =>{
        btn.addEventListener('click', addCart);
    });

    // uodate total
    updateTotal();
}

/* Cart items remove */
function removeItem() {
    if (confirm('ARE YOU SURE TO REMOVE')) {
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList = itemList.filter(el => el.title !== title);
        this.parentElement.remove();
        loadContent();
    }
}

/* Cart quantity */
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    updateTotal();
}

let itemList = [];

//adding to cart 

function addCart(){
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML.replace('Price: ', '').trim();
    let imgSrc = food.querySelector('.food-image').src;

    let newProduct = { title, price, imgSrc};

    //check if product is already in cart 
    if(itemList.find(el=> el.title === newProduct.title)){
        alert("Product is Already in Cart!");
        return;
    }else{
        itemList.push(newProduct);
    }

    let newProductElement = createCartProducts(title,price,imgSrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;

    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();
}

// Creating Cart..

function createCartProducts(title, price, imgSrc) {
    return `
        <div class="cart-box">
            <img src="${imgSrc}" class="cart-img">
            <div class="detail-box">
                <div class="cart-food-title"><b>${title}</b></div> 
                <div class="price-box">
                    <div class="cart-price">${price}</div>
                    <div class="cart-amt">Rs.${price}</div>
                </div>
                <input type="number" value="1" class="cart-quantity">   
            </div>   
            <ion-icon name="trash" class="cart-remove"></ion-icon>     
        </div>`;
}

// updating total

function updateTotal(){
    const cartItems = document.querySelectorAll(".cart-box");
    const totalValue = document.querySelector(".total-price");

    let total = 0;
    cartItems.forEach(product=>{
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.trim());

        let qty = product.querySelector('.cart-quantity').value;

        total += (price * qty);
        product.querySelector(".cart-amt").innerHTML = "Rs. "+ (price*qty);
    });
    totalValue.innerHTML = "Rs. "+ total;

    // add produuct count 

    const cartCount = document.querySelector(".cart-count");
    let count = itemList.length;
    cartCount.innerHTML = count;
}

function showAlert(){
    alert("Thanks for Shopping...");
}