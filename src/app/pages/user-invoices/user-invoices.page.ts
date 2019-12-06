import { Component, OnInit } from '@angular/core';
  import { from } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ProductDetailService } from 'src/app/product-detail.service';
import { ProductService } from 'src/app/services/product.service';

import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import{ OrderDetailsPage } from '../../pages/order-details/order-details.page'
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
  

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
 
  constructor(public modalController: ModalController, public   formBuilder: FormBuilder,private router: Router,public route : ActivatedRoute,public loadingCtrl: LoadingController, public productservices : ProductService, public alertCtrl: AlertController, public toastController: ToastController) {}

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
  async viewModal(){
    const modal = await this.modalController.create({
      component: OrderDetailsPage
    });
    return  modal.present();

  }

  viewDetails(){
    this.viewModal()
  }
  openPro(){
    this.router.navigateByUrl('/pro');
  }
  logOut(){
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      this.router.navigateByUrl('/login');
    }).catch((error)=> {
      // An error happened.
    });
  }

}
