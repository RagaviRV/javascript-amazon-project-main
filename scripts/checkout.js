import { renderordersummary } from "./checkout/ordersummary.js";
import {renderpaymentsummary} from './checkout/paymentsummary.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";


async function loadPage(){
 // console.log('load page');
  await loadProductsFetch();
  const value=await new Promise((resolve)=>{
  loadCart(()=>{
    resolve('value3');
  });
});
renderordersummary();
renderpaymentsummary();
//  return 'value2';
}
loadPage();


/*
Promise.all([
  loadProductsFetch(),
   new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })

]).then((values)=>{
  console.log(values);
  renderordersummary();
  renderpaymentsummary();
});


/*
new Promise((resolve)=>{
 loadProducts(()=>{
  resolve('value1');
 });

}).then((value)=>{
  console.log(value);
  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
  renderordersummary();
  renderpaymentsummary();
});
*/
/*

loadProducts(()=>{
  loadCart(()=>{
    renderordersummary();
    renderpaymentsummary();
  });
});
*/
