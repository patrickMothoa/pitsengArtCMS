import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  private data = [
    {
      category: 'Pots & Bouls',
      expanded: true,
      products: [
        { id: 0, name: 'tripot', price: '250' },
        { id: 1, name: 'Bouls', price: '450' },
        { id: 2, name: 'clayPot', price: '650' },
        { id: 3, name: 'calabash', price: '750' }
      ]
    },
    {
      category: 'Paintings',
      products: [
        { id: 4, name: 'Huts', price: '800' },
        { id: 5, name: 'portrait', price: '1500' }
      ]
    },
    {
      category: 'Beats',
      products: [
        { id: 6, name: 'shels', price: '80' },
        { id: 7, name: 'Basic', price: '50' },
        { id: 8, name: 'pels', price: '90' }
      ]
    }
  ];

  private cart = [];

  constructor() { }

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  addProduct(product) {
    this.cart.push(product);
  }
}
