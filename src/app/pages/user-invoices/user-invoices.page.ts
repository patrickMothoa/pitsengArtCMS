import { Component, OnInit } from '@angular/core';
  import { from } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ProductDetailService } from 'src/app/product-detail.service';
import { ProductService } from 'src/app/services/product.service';

import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import{ OrderDetailsPage } from '../../pages/order-details/order-details.page'
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SowDataPage } from 'src/app/sow-data/sow-data.page';



  

@Component({
  selector: 'app-user-invoices',
  templateUrl: './user-invoices.page.html',
  styleUrls: ['./user-invoices.page.scss'],
})
export class UserInvoicesPage implements OnInit {
  dbOrder = firebase.firestore().collection('Order');
  db = firebase.firestore();
  public isSearchbarOpened = false;
  users = []
  Allorders = [];
  public item =[];
  conArray = []
  Orders =[]
  public display;
  public postSort='recent';
  public userID;
  public userTransact: any;
  myArr = []
  myArray = []
  ordersPlaced = [];
  loader: boolean = false;
  constructor(public DataService : DataService, public modalController: ModalController, public   formBuilder: FormBuilder,private router: Router,public route : ActivatedRoute,public loadingCtrl: LoadingController, public productservices : ProductService, public alertCtrl: AlertController, public toastController: ToastController) {

  
    this.db.collection("Users")

  }

  ngOnInit() {

console.log("dsdds");
this.GetOrders();
    this.viewDetails();
  let obj = {name : '', uid : ''} ;
  this.db.collection("UserProfile").onSnapshot(data => {
    data.forEach(item => {
     
      obj.name = item.data().email;
      obj.uid = item.data().uid
      this.users.push(obj);
      obj = {name : '', uid : ''} ;
      console.log("users ",  this.users);
    })
  })
}
dismiss(){
  this.modalController.dismiss({
    'dismissed':true
  });
}


  viewDetails(){
    this.loader = true;
    this.db.collection("Order").onSnapshot(data => {
      this.ordersPlaced = [];
        data.forEach(item => {       
         this.ordersPlaced.push({ref:item.id,info:item.data()})
         this.loader = false;
        }) 
     
        // this.router.navigateByUrl('/order-details'); 


      })
  }
  

  userProfiles() {
    this.ordersPlaced.forEach((i)=>{
  
    })
  }
// async details() {
//   const modal = await this.modalController.create({
//     component:OrderDetailsPage,
//     cssClass: 'my-add-to-cart',
    
  
//   });
//   return await modal.present();
// }
  async viewDetail(value) {
    // console.log(value.ref);
    const modal = await this.modalController.create({
      component:OrderDetailsPage,
      cssClass: 'track-order',
      componentProps: { totalPrice: value.info.totalPrice,
      ref: value.ref,
      name: value.info.product[0].prod.name,
      price: value.info.product[0].prod.price,
      quantity: value.info.product[0].prod.quantity,
      image: value.info.product[0].prod.image,
      arr:value.info.product}
    
    });
    return await modal.present();
  }
  
  openPro(){
    this.router.navigateByUrl('/pro');
  }
  openInvoice(){
    this.router.navigateByUrl('/user-invoices');
  }
  openProfile(){
    this.router.navigateByUrl('/profile');
  }
  logOut(){
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      this.router.navigateByUrl('/login');
    }).catch((error)=> {
      // An error happened.
    });
  }
  GetOrders(){
    this.dbOrder.where('userID','==',firebase.auth().currentUser.uid).onSnapshot((data)=>{
            console.log("olx", data);
            this.Allorders = [];
              data.forEach((item)=>{
                this.Allorders.push({ref:item.id,info:item.data(), total:item.data()})
              })
              console.log("ccc", this.Allorders);
  
        }) 
    }
  async createTrackOder(item) {
    console.log('My item ',item)
    /* const modal = await this.modalController.create({
      component:OrderDetailsPage,
      cssClass: 'track-order',
      componentProps: { ref: item.ref,
        totalPrice: item.info.totalPrice,
        name: item.info.product[0].prod.product_name,
        price: item.info.product[0].prod.price,
        quantity: item.info.product[0].prod.quantity,
        image: item.info.product[0].prod.image,
      arr:item.info.product },
    },);
    return await modal.present(); */
  }

}
