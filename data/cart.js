export const cart=[];  

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
    quantity:1
  });
}
}