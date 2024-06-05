import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatcurrency } from './utils/money.js';

let cartsummaryhtml='';

cart.forEach((cartitem)=>{
   const productid=cartitem.productid;
   let matchingproduct;
   products.forEach((product)=>{
    if(product.id===productid){
       matchingproduct=product;
    }
});

cartsummaryhtml+=
` <div class="cart-item-container">
<div class="delivery-date">
  Delivery date: Tuesday, June 21
</div>

<div class="cart-item-details-grid">
  <img class="product-image"
    src="${matchingproduct.image}">

  <div class="cart-item-details">
    <div class="product-name">
      ${matchingproduct.name}
    </div>
    <div class="product-price">
      $${formatcurrency(matchingproduct.priceCents)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label">${cartitem.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary">
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    <div class="delivery-option">
      <input type="radio" checked
        class="delivery-option-input"
        name="delivery-option-${matchingproduct.id}">
      <div>
        <div class="delivery-option-date">
          Tuesday, June 21
        </div>
        <div class="delivery-option-price">
          FREE Shipping
        </div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingproduct.id}">
      <div>
        <div class="delivery-option-date">
          Wednesday, June 15
        </div>
        <div class="delivery-option-price">
          $4.99 - Shipping
        </div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="delivery-option-${matchingproduct.id}">
      <div>
        <div class="delivery-option-date">
          Monday, June 13
        </div>
        <div class="delivery-option-price">
          $9.99 - Shipping
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;
});

document.querySelector('.js-order-summary').innerHTML=cartsummaryhtml;

console.log(cartsummaryhtml);