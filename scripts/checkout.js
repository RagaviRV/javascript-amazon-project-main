import {cart,removefromcart,updatedeliveryoption} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatcurrency } from './utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoptions} from '../data/deliveryoptions.js';
hello();
const today=dayjs();
const deliverydate=today.add(7,'days');

console.log(deliverydate.format('dddd,MMMM D'));
let cartsummaryhtml='';

cart.forEach((cartitem)=>{
   const productid=cartitem.productid;
   let matchingproduct;
   products.forEach((product)=>{
    if(product.id===productid){
       matchingproduct=product;
    }
});

const deliveryoptionid=cartitem.deliveryoptionid;

let deliveryoption;
deliveryoptions.forEach((option)=>{
  if(option.id===deliveryoptionid){
    deliveryoption=option;
  }
});
deliveryoptions.forEach((deliveryoption)=>{
const today=dayjs();
const deliverydate=today.add(deliveryoption.deliverydays,'days');
const dateString=deliverydate.format('dddd,MMMM D');


cartsummaryhtml+=
` <div class="cart-item-container js-cart-item-container-${matchingproduct.id}">
<div class="delivery-date">
  Delivery date: ${dateString}
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
      <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingproduct.id}>
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
   
    ${deliveryoptionshtml(matchingproduct,cartitem)}
  </div>
</div>
</div>`;
});
});

function deliveryoptionshtml(matchingproduct,cartitem){
  let html='';
  deliveryoptions.forEach((deliveryoption)=>{
    const today=dayjs();
    const deliverydate=today.add(deliveryoption.deliverydays,'days');
   // console.log(deliverydate);
    const dateString=deliverydate.format('dddd,MMMM D');

    
    const priceString=deliveryoption.priceCents===0 ?'FREE' : `$${formatcurrency(deliveryoption.priceCents)} -`;
   const isChecked=deliveryoption.id===cartitem.deliveryoptionsid;

    html+=
` <div class="delivery-option js-delivery-option"data-product-id="${matchingproduct.id}" data-delivery-option-id="${deliveryoption.id}">
<input type="radio" ${isChecked?'checked':''}
  class="delivery-option-input"
  name="delivery-option-${matchingproduct.id}">
<div>
  <div class="delivery-option-date">
    ${dateString}
  </div>
  <div class="delivery-option-price">
    ${priceString} Shipping
  </div>
</div>
</div>`;
  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML=cartsummaryhtml;


document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId=link.dataset.productId;
    removefromcart(productId);

    const container=document.querySelector(`.js-cart-item-container-${productId}`);
 
  container.remove();
});
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
 element.addEventListener('click',()=>{
  const {productId,deliveryoptionsid}=element.dataset;
updatedeliveryoption(productId,deliveryoptionsid);
 })
})