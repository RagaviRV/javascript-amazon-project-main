import { addtocart,cart,loadFromStorage } from '../../data/cart.js';

describe('test suite : addtocart',()=>{
   it('adds an existing product to the cart',()=>{
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productid:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryoptionsid:'1'
      }]);
    });
    loadFromStorage();
    addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productid).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
   });

  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
   
    loadFromStorage();
    addtocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productid).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });
});