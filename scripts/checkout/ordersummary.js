import {cart,removefromcart,updatedeliveryoption} from '../../data/cart.js';
import {products,getproduct} from '../../data/products.js';
import { formatcurrency } from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'; 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryoptions,getdeliveryoption} from '../../data/deliveryoptions.js';
import {renderpaymentsummary} from './paymentsummary.js';


export function renderordersummary(){
let cartsummaryhtml='';
cart.forEach((cartitem)=>{
   const productid=cartitem.productid ?? cartitem.productId;
   const  matchingproduct=getproduct(productid);
   const deliveryoptionId=cartitem.deliveryoptionsid??cartitem.deliveryOptionId;
   const deliveryoption=getdeliveryoption(deliveryoptionId);
   const today=dayjs();
   const deliverydate=today.add(deliveryoption.deliverydays,'days');
   const dateString=deliverydate.format('dddd,MMMM D');
 
 cartsummaryhtml+=
` <div class="cart-item-container
js-cart-item-container
js-cart-item-container-${matchingproduct.id}">
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
      ${matchingproduct.getPrice()}
    </div>
    <div class="product-quantity js-product-quantity-${matchingproduct.id}">
      <span>
        Quantity: <span class="quantity-label">${cartitem.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingproduct.id}" data-product-id=${matchingproduct.id}>
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


function deliveryoptionshtml(matchingproduct,cartitem){
  let html='';
  deliveryoptions.forEach((deliveryoption)=>{
    const today=dayjs();
    const deliverydate=today.add(deliveryoption.deliverydays,'days');
    const dateString=deliverydate.format('dddd,MMMM D');
    const priceString=deliveryoption.priceCents===0 ?'FREE' : `$${formatcurrency(deliveryoption.priceCents)} -`;
    const delivery_id=cartitem.deliveryoptionsid  ?? cartitem.deliveryOptionId;
   const isChecked=deliveryoption.id===delivery_id;
   console.log(isChecked,delivery_id);


    html+=
` <div class="delivery-option js-delivery-option" data-product-id="${matchingproduct.id}" data-delivery-option-id="${deliveryoption.id}">
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
  console.log('element     ',element);
 element.addEventListener('click',()=>{
  const {productId,deliveryOptionId}=element.dataset;
  console.log('productid',productId,'deliveryorderid',deliveryOptionId);
updatedeliveryoption(productId,deliveryOptionId);
renderordersummary();
renderpaymentsummary();
 });
});
}
