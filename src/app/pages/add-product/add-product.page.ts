
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  db = firebase.firestore();
  Product

  event = {
    Product:'',
    name:'',
    title: '',
    price:'',
    desc: ''
  };
 
  eventSource = [];
 

 


  constructor( public route : ActivatedRoute, public toastController: ToastController,private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string) {
   // this.newName = this.servicess.getName();
   }
 
   async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your Product added successfully..',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit()  {
 
 }


  resetEvent() {
    this.event = {
      Product:'',
      name:'',
      price:'',
      title: '',
      desc: ''
    };
  }

  addEvent() {
    this.db.collection("Products").doc(firebase.auth().currentUser.uid).set({
      Product:this.Product.event.Product,
      name : this.event.name,
      price : this.event.price,
      title: this.event.title,
      desc: this.event.desc,
    }) 
    this.eventSource.push(this.event);
    this.resetEvent();
  }

  getCategories(event){
    this.Product = event.detail.value;
    console.log(this.Product); 
  }

back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
}
 

}
