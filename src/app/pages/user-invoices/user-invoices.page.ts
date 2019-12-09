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

    // this.db.collection('Msindisi').doc().set({
    //   name : "Msinisi",
    //   id : 5346,
    //   email : "m@gmail.com"
    // }).then(() => {
    //   console.log("data saved");
    // })

    this.db.collection("Users").doc("gtd9dtzULGTVmbrbOpNUIDGJIFr2").collection("Cart").doc().set({
      name : "Msinisi",
      id : 5346,
      email : "m@gmail.com"
    }).then(() => {
      console.log("data saved");
      
    })
    
  }


  Pull(){

    // this.db.collection("Msindisi").onSnapshot(e => {
    //     e.forEach(r => {
    //       console.log("ssss ", r.data());
          
    //     })
    // })

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



    // this.db.collection('Users').doc(firebase.auth().currentUser.uid).collection('Orders').onSnapshot((res)=> {
    //   console.log('one',res );
    //   this.myArr = [];
    //   res.forEach((doc)=>{
    //     this.myArr.push(doc.data());
    //   })
    //   console.log('xxxx ',this.myArr );
    // })
 
    // setTimeout(() => {
    //   this.myArr.forEach((item)=>{
    //     this.myArray.push(item.name.obj)
    //   })
    //   console.log('My array ', this.myArray );
    // }, 1500);

// this.db.collection("Ordings").onSnapshot(data => {
// console.log("xxx",data );

//   data.forEach(item => {
//     console.log("data ",item.data());
//   })
  
// })

  //   let  obj = {
  //     details : {orderNumber : 0, total : 0},
  //     obj : {
  //       categories : "", price : "", productNumber : "", quantity : 0,name : "", image : ""
  //     }
  // }

  
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

  // setTimeout(() => {
  //   this.conArray.forEach((item)=>{
  //     this.Orders.push(item)
  //   })
  // }, 1500);
  }

  // async viewModal(){
  //   const modal = await this.modalController.create({
  //     component: OrderDetailsPage
  //   });
  //   return  modal.present();

  // }

  viewDetails(){
    this.router.navigateByUrl('/order-details');
    // this.viewModal()
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
