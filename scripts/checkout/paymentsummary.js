 import {cart} from '../../data/cart.js';
 import { getproduct } from '../../data/products.js';
 import { getdeliveryoption } from '../../data/deliveryoptions.js';
 import formatcurrency from '../utils/money.js';
 
 export function renderpaymentsummary(){
  let productpricecents=0;
  let shippingpricecents=0;
  cart.forEach((cartitem)=>{
 const product=getproduct(cartitem.productid);
 productpricecents+=product.priceCents*cartitem.quantity;
const deliveryoption=getdeliveryoption(cartitem.deliveryoptionid);

shippingpricecents+=deliveryoption.priceCents;
  });
  const totalbeforetaxcents=productpricecents+shippingpricecents;
  const taxcents=totalbeforetaxcents*0.1;
  const totalcents=totalbeforetaxcents+taxcents;
  const paymentsummaryhtml=
  `  
  <div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (3):</div>
  <div class="payment-summary-money">$${formatcurrency(productpricecents)} </div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${formatcurrency(shippingpricecents)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${formatcurrency(totalbeforetaxcents)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${formatcurrency(taxcents)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${formatcurrency(totalcents)}</div>
</div>

<button class="place-order-button button-primary">
  Place your order
</button>
  
  `;
  document.querySelector('.js-payment-summary').innerHTML=paymentsummaryhtml;
}