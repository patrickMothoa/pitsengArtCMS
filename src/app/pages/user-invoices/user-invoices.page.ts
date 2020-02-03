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

  db = firebase.firestore();
  public isSearchbarOpened = false;
  users = []

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
    console.log(value);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: JSON.stringify(value)
      }
    };  
    // this.router.navigate(['order-details'], navigationExtras);
    const modal = await this.modalController.create({
      component:OrderDetailsPage,
      cssClass: 'track-order ',
      
    
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

}
