import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from 'src/app/services/product.service';
import { AlertController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  dbsale = firebase.firestore().collection('Sale');
  db = firebase.firestore();
  autoId: any;
  updateBtn = false;
  listproduct = [];
  MyObj = [];


  event = {
    image: '',
    categories:'',
    name:'',
    price:null,
    productCode:"",
    desc: '',
    items:'',
    quantity : 1,
    lastcreated: '',
    size:[]
    
  }

  public items: any;
  cart = [];
  Products = [];
  myProduct = false;

  obj = {
    image : "",
    price : "",
    name : "",
    desc : "",
    size : "",
    items : "",
    category : "",
    productCode:""
  }
  
  key = ""
  value : any 
  discountedPrice : number = 0; 

  constructor(
    public loadingCtrl: LoadingController,
    public productService: ProductService, 
    public data : ProductService,
    public alertCtrl: AlertController,
    private router: Router,
    public toastCtrl: ToastController,
    public modalController: ModalController) { }

  ngOnInit() {


   
    this.obj.image =  this.data.Detail.image
    this.obj.price =  this.data.Detail.price
    this.obj.name =  this.data.Detail.name
    this.obj.desc =  this.data.Detail.desc
    this.obj.size =  this.data.Detail.size
    this.obj.items =  this.data.Detail.items
    this.obj.category= this.data.Detail .category

    this.key = this.data.Detail.key
    this.obj.productCode = this.data.Detail.productCode
  
    this.value = parseFloat(this.obj.price)
  this.discountedPrice = (  this.value )-((this.editPercentage/100)*( this.value))
    // this.getProducts();
  }

  delete(){
    firebase.firestore().collection("Products").doc(this.key).delete()
  }

  save(){


    firebase.firestore().collection("Products").doc(this.key).update({
      categories : this.obj.category,
      desc : this.obj.desc,
      id : this.key,
      image : this.obj.image,
      items : this.obj.items,
      name : this.obj.name,
      price : this.obj.price,
      quantity : 7,
      sizes : this.obj.size
    })
    this.dismiss();
  }


  

  ionViewWillEnter(){
    
  }
   ionViewDidLoad() {
  
  }
  
      

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
    }

  
 

  editPercentage : number = 0
  editStartDate
  editEndDate 

  update(){
    this.discountedPrice = (  this.value )-((this.editPercentage/100)*( this.value))
  }

  promoteItem(){
   
 



console.log("Data in the Details ", (  this.value )-((this.editPercentage/100)*( this.value)));
console.log("ddd ", this.value );
this.discountedPrice = (  this.value )-((this.editPercentage/100)*( this.value))

firebase.firestore().collection("Sales").doc().set({
 image  : this.obj.image,
 price  : this.obj.price,
 name : this.obj.name,
 desc : this.obj.desc,
 size : this.obj.size,
 items  : this.obj.items,
 productCode:this.obj.productCode,
 categories :  this.obj.category,
   startDate:this.editStartDate,
   endDate:this.editEndDate,
   percentage:this.editPercentage,
   totalPrice : (  this.value )-((this.editPercentage/100)*( this.value))

   
 
})
this.dismiss();

  }
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
  }
}
