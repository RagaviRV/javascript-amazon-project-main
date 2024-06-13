class Cart{
  cartItems;
  #localStorageKey;

constructor(localStorageKey){
  this.#localStorageKey=localStorageKey;
  this.$loadFromStorage();
}

  $loadFromStorage(){
    this.cartItems=JSON.parse(
     localStorage.getItem(this.#localStorageKey));
     if(!this.cartItems){
       this.cartItems= [{
       productid:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
       quantity:2,
       deliveryoptionsid:'1'
     },{
       productid:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
       quantity:1,
       deliveryoptionsid:'2'
     }];  
     }
  }

  savetostorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
   }

   addtocart(productid){
    let matchingItem;
    this.cartItems.forEach((cartitem)=>{
      const product_id=cartitem.productid ?? cartitem.productId;
      if(productid===product_id){
        matchingItem=cartitem;
      }
    });
    if(matchingItem){
      matchingItem.quantity+=1;
    }
    else{
    this.cartItems.push({
      productid:productid,
      quantity:1,
      deliveryoptionsid:'1'
    });
  }
  
  this.savetostorage();
  }

  removefromcart(productId){
 
    const newcart=[];
    this.cartItems.forEach((cartitem)=>{
     const product_id=cartitem.productid ?? cartitem.productId;
    if(product_id!=productId){
     newcart.push(cartitem);
    }
    });
   
    this.cartItems=newcart;
   this.savetostorage();
   }
   updatedeliveryoption(productid,deliveryoptionid){
    let matchingItem;
    this.cartItems.forEach((cartitem)=>{
      const product_id=cartitem.productid ?? cartitem.productId;
      if(productid===product_id){
        matchingItem=cartitem;
      }
    });
    matchingItem.deliveryoptionsid = deliveryoptionid;
    this.savetostorage();
  }
}



const cart=new Cart('cart-oop');
const businessCart=new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log('Instance:',businessCart instanceof Cart);