import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from 'src/app/services/product.service';
import { AlertController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import * as moment from 'moment';
import { LoadingService } from 'src/app/services/loading.service';
import Swal from 'sweetalert2';


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
  today
  endDateLimit
  promoButtonEnabled : boolean

  event = {
    image: '',
    imageSide:'',
    imageBack:'',
    imageTop:'',
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
    imageSide:"",
    imageBack:"",
    imageTop:"",
    price : "",
    quantity: "",
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
  currentNumber: number = 1;

  constructor(
    public loadingCtrl: LoadingController,
    public productService: ProductService, 
    public data : ProductService,
    public alertCtrl: AlertController,
    private router: Router,
    public toastCtrl: ToastController,
    public alertController: AlertController,
    public modalController: ModalController,
    public loading: LoadingService) { 
      this.today = moment(new Date()).format('YYYY-MM-DD')
    }

  ngOnInit() {

    this.obj.image =  this.data.Detail.image
    this.obj.imageSide =  this.data.Detail.imageSide
    this.obj.imageBack =  this.data.Detail.imageBack
    this.obj.imageTop =  this.data.Detail.imageTop
    this.obj.quantity =this.data.Detail.quantity
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
    firebase.firestore().collection("Products").doc(this.key).delete();
    this.router.navigateByUrl('/categorylist');
    
  }

  save(){

    firebase.firestore().collection("Products").doc(this.key).update({
      categories : this.obj.category,
      imageSide:this.obj.imageSide,
      imageBack:this.obj.imageBack,
      imageTop:this.obj.imageTop,
      desc : this.obj.desc,
      id : this.key,
      image : this.obj.image,
      items : this.obj.items,
      name : this.obj.name,
      price : this.obj.price,
      quantity :this.obj.quantity,
      sizes : this.obj.size
    })
   this.success()
   console.log('save',this.key) // this.loading.dismiss();
  }
  increment(p) {
    this.currentNumber = this.currentNumber + 1;
    this.event.quantity = this.currentNumber
  }
  decrement(p) {
    if (this.currentNumber > 1) {
      this.currentNumber = this.currentNumber - 1;
      this.event.quantity = this.currentNumber;
    }
    return this.currentNumber;
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

  async promoteItem(){
   
let date = moment().format()
 let value1 : boolean = this.editStartDate >= date.slice(0, 10)
 let value2 : boolean = this.editEndDate >= date.slice(0, 10)
let finalValue : boolean = value1 && value2 ;

if(finalValue && this.editStartDate <= this.editEndDate){


  this.discountedPrice = (  this.value )-((this.editPercentage/100)*( this.value))

firebase.firestore().collection("Sales").doc().set({
 image  : this.obj.image,
 quantity: this.obj.quantity,
 imageSide  : this.obj.imageSide,
 imageBack  : this.obj.imageBack,
 imageTop  : this.obj.imageTop,
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
// this.router.navigateByUrl('/pro');
}else{

  const alert = await this.alertController.create({
    header: '',
    subHeader: '',
    message: 'Please enter the dates',
    buttons: ['OK']
  });


  await alert.present();


}
  }
  checkPromoValidity(){
    if(this.editStartDate === undefined || this.editStartDate === '' || this.editEndDate === undefined || this.editEndDate === '' || this.editPercentage === 0 || this.editPercentage === undefined || this.editPercentage === null){
      this.promoButtonEnabled = false
    }else if(this.editEndDate !== undefined && this.editEndDate !== '' && this.editStartDate !== undefined &&  this.editStartDate !== '' && this.editPercentage !== 0 && this.editPercentage !== undefined && this.editPercentage !== null){
      this.promoButtonEnabled = true
    }
  }

  runCheck(event){

    this.editEndDate = event.target.value
    console.log(this.editEndDate);
    this.checkPromoValidity()
  }

enableEndDateInput(event){
  console.log(event.target.value);
  this.editStartDate = event.target.value
    //if(this.editStartDate){
      this.endDateLimit = moment(this.editStartDate).add(1, 'days').format('YYYY-MM-DD')
      console.log(this.editStartDate);
      if(this.editStartDate >= this.editEndDate){
        this.editEndDate = ''
      }
    //}
    this.checkPromoValidity()
  }
  // enablestartDateInput(){
  //   if(this.editEndDate){
  //     this.endDateLimit = moment(this.editEndDate).add('days', 1).format('YYYY-MM-DD')
  //   }
  //   this.checkPromoValidity()
  // }


  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
  }
  success(){
    Swal.fire(
      'update!',
      'Your product has been updated .',
      'success'
    )
  }
}
