import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  db = firebase.firestore();
  public items: any = [];

  myArray = [];
  Orders = [];
  status : any;
  constructor() {

  }

  processOrder(key, status){
    console.log("my service==",status);
    console.log("my serv ",key);
    return this.db.collection('Order').doc(key).update({
      status: status,
      time: new Date().getTime()
    }).then( result => {
     // console.log('success', result);
      return 'success'
    })
  }

  readyOrder(key, status){
    return this.db.collection('Order').doc(key).update({
      status: status,
      time: new Date().getTime()
    }).then( result => {
      return 'success'
    })
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
