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
import { SowDataPage } from 'src/app/sow-data/sow-data.page';



  

@Component({
  selector: 'app-user-invoices',
  templateUrl: './user-invoices.page.html',
  styleUrls: ['./user-invoices.page.scss'],
})
export class UserInvoicesPage implements OnInit {

  db = firebase.firestore();

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
  constructor(public DataService : DataService, public modalController: ModalController, public   formBuilder: FormBuilder,private router: Router,public route : ActivatedRoute,public loadingCtrl: LoadingController, public productservices : ProductService, public alertCtrl: AlertController, public toastController: ToastController) {

  
    this.db.collection("Users")

  }


  save(){

    this.db.collection("Users").doc("gtd9dtzULGTVmbrbOpNUIDGJIFr2").collection("Cart").doc().set({
      name : "Msinisi",
      id : 5346,
      email : "m@gmail.com"
    }).then(() => {
      console.log("data saved");
      
    })
    
  }


  Pull(){

     this.db.collection("Users").doc("gtd9dtzULGTVmbrbOpNUIDGJIFr2").collection("Orders").onSnapshot(w => {
       w.forEach(d => {
         console.log("sssssss ", d.data());
         
       })
     })
  }

  ngOnInit() {
console.log("xxxx");

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


  async viewModal(){
    const modal = await this.modalController.create({
      component: OrderDetailsPage
    });
    return  modal.present();
  }
  

 async  viewDetails(uid){
    this.db.collection("Users").doc(uid).collection("Orders").onSnapshot(data => {
      this.DataService.myArray = []
        data.forEach(item => {
          console.log("Your data is here ", item.data());
          
          this.DataService.myArray.push(item.data())
        })
      })
      this.DataService.myArray.forEach(i => {
        console.log("data from the service ", i);
      })

    let modal = await this.modalController.create({
      component : SowDataPage
    })
    return await modal.present();
  }

  openPro(){
    this.router.navigateByUrl('/pro');
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
