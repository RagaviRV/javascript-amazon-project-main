export let cart=JSON.parse(
localStorage.getItem('cart'));
if(!cart){
  cart= [{
  productid:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2,
  deliveryoptionsid:'1'
},{
  productid:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1,
  deliveryoptionsid:'2'
} ];  
}
export function addtocart(productid){

  let matchingItem;
  cart.forEach((cartitem)=>{
    if(productid===cartitem.productid){
      matchingItem=cartitem;

    }
  });
  if(matchingItem){
    matchingItem.quantity+=1;
  }
  else{
  cart.push({
    productid:productid,
    quantity:1,
    deliveryoptionsid:'1'
  });
}

savetostorage();
}

 function savetostorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
 }
export function removefromcart(productId){
 const newcart=[];
 cart.forEach((cartitem)=>{
 if(cartitem.productid!=productId){
  newcart.push(cartitem);
 }
 });

 cart=newcart;
 savetostorage();
}