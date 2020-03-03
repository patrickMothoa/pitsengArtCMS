

import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';
import * as firebase from 'firebase';


import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-categorylist',
  templateUrl: './specials.page.html',
  styleUrls: ['./specials.page.scss'],
})
export class SpecialsPage {
  db = firebase.firestore();
 value
 Sales = [];
  Products = [];
  myProduct = false;
  loader: boolean = true;
  dbMessages = firebase.firestore().collection('Messages');
  dbWishlist = firebase.firestore().collection('Wishlist');
  message = {
    fullname: '',
    email: '',
    message:''
 }

  constructor(private router: Router,  
    public modalController: ModalController,
    private data: ProductService, 
    public loadingCtrl: LoadingController,
    private activatedRouter : ActivatedRoute,
    public toastCtrl: ToastController,
    public alertController: AlertController) {
      this.adminInfo();
      this.getSpecials();
     }
  
  
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {
    //  this.activatedRouter.queryParams.subscribe(params =>{
    //   console.log('value', this.router.getCurrentNavigation().extras.state.parms);
    //   this.value = this.router.getCurrentNavigation().extras.state.parms;
    // }) 
    this.getSpecials(); 
  }

  Info = []
adminInfo(){
  this.db.collection('admins').get().then(snapshot => {
  this.Info = [];
  if (snapshot.empty) {
         this.myProduct = false;
       } else {
         this.myProduct = true;
         snapshot.forEach(doc => {
           this.Info.push(doc.data());
           console.log("admin", this.Info);
         });
         
       }
   })
}

  
  getSpecials(){
    this.db.collection('Sales').onSnapshot(snapshot => {
             this.Products = [];
              snapshot.forEach(doc =>{
                this.Products.push({ obj :doc.data(),id : doc.id})
              });
    });
  }

  
  addToWishlist(prod, id) {

    console.log("Product Info ",prod);
    this.dbWishlist.doc(id).set({name: prod.name, desc: prod.desc, image: prod.image, price: prod.price, 
     id: id, uid : firebase.auth().currentUser.uid, timestamp: new Date().getTime(), categories: prod.categories}).then(()=>{
       this.toastController("Sale product deleted");
     })
 }
 async presentLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Loading...',
  });
  await loading.present();
  // const { role, data } = await loading.onDidDismiss();
  // console.log('Loading dismissed!');
}
async deleteItem(event){
  console.log("logging deletion ", event.id);
  
  
  const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are sure you want to delete from specials',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            firebase.firestore().collection("Sales").doc(event.id).delete()
          }
        }
      ]
    });

    await alert.present();

  // const alert = document.createElement('ion-alert');
  // alert.header = 'Confirm Deletion';
  // alert.message = 'Are you sure you want to remove this item from specials?';
  // alert.buttons = [
  //   {
  //     text: 'Cancel',
  //     role: 'cancel',
  //     cssClass: 'secondary',
  //     handler: (blah) => {
  //       console.log('User canceled');
  //     }
  //   }, {
  //     text: 'Remove',
  //     handler: () => {
  //       console.log('Confirm Okay')
  
  //       console.log(event.id);
  //       console.log(event);
  //       this.presentLoading()
  //        this.data.deleteSpecialsItem(event.id, event.id).then(result => {
  //         console.log(result);
  //         if(result === 'success'){
  //           if(this.loadingCtrl){
  //             this.loadingCtrl.dismiss()
  //           }
  //         }
  //         //location.reload()
  //       })
  //     }
  //   }
  // ];
  // document.body.appendChild(alert);
  // return alert.present();

  
}
 async allSpecials(event){
  this.data.Detail.image  = event.obj.image
  this.data.Detail.imageSide  = event.obj.imageSide
  this.data.Detail.imageBack  = event.obj.imageBack
  this.data.Detail.imageTop  = event.obj.imageTop
  this.data.Detail.category  = event.obj.categories
 
  this.data.Detail.name  = event.obj.name
  this.data.Detail.productCode = event.obj.productCode
  this.data.Detail.price  = event.obj.price
  this.data.Detail.desc   = event.obj.desc
  this.data.Detail.items  = event.obj.items
  this.data.Detail.size  = event.obj.sizes
  this.data.Detail.quantity  = event.obj.quantity

 
  this.router.navigateByUrl('details');
    
  }
  
  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  openHome(){
    this.router.navigateByUrl('/')
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us')
  }
  // openCart(){
  //   this.router.navigateByUrl('/add-to-cart')
  // }

  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
}
  addMessage() {
    if(firebase.auth().currentUser){
     let customerUid = firebase.auth().currentUser.uid;
     this.dbMessages.add({
       customerUid: customerUid,
       name : this.message.fullname,
       email : this.message.email,
       message : this.message.message
  
       
      }).then(() => {
        this.toastController('Message Sent!')
     }).catch(err => {
              console.error(err);
     });

     this.message = {
      fullname: '',
      email: '',
      message:''
   }

    }else{
      //this.createModalLogin();
    }
}

}