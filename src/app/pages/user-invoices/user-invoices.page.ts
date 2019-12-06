import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
@Component({
  selector: 'app-user-invoices',
  templateUrl: './user-invoices.page.html',
  styleUrls: ['./user-invoices.page.scss'],
})
export class UserInvoicesPage implements OnInit {

  db = firebase.firestore();
  public item =[];
  conArray = []
  Orders =[]
  public display;
  public postSort='recent';
  public userID;
  public userTransact: any;
  constructor(public alertCtrl: AlertController) { }

  ngOnInit() {

this.db.collection("Users").doc("dyBHPtUnGFcZZzI1DrYD1jGJIG73").collection("Orders").onSnapshot(data => {

  data.forEach(item => {
    console.log("data ",item.data());
  })
  
})

    let  obj = {
      details : {orderNumber : 0, total : 0},
      obj : {
        categories : "", price : "", productNumber : "", quantity : 0,name : "", image : ""
      }
  }

  
//     this.db.collection("Users").doc("dyBHPtUnGFcZZz1DrYD1jGJIG73").collection("Orders").onSnapshot(res => {
//     this.conArray = [];
//     res.forEach(doc=>{
//       console.log("data ",doc.data());
//       obj.details.orderNumber = doc.data().details.orderNumber;
//       obj.details.total = doc.data().details.total;
//       obj.obj.categories = doc.data().obj.categories;
//       obj.obj.price = doc.data().obj.price;
//       obj.obj.productNumber = doc.data().obj.productNumber;
//       obj.obj.quantity = doc.data().obj.quantity;
//       obj.obj.name = doc.data().obj.name;
//       obj.obj.image = doc.data().obj.image;

//       this.conArray.push(obj);
     
//        console.log('My array ', this.conArray);
//     })  
// })

  setTimeout(() => {
    this.conArray.forEach((item)=>{
      this.Orders.push(item)
    })
  }, 1500);


  }
}
