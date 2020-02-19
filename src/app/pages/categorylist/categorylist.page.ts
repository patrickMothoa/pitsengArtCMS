import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ModalController, ToastController, PopoverController } from '@ionic/angular';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.page.html',
  styleUrls: ['./categorylist.page.scss'],
})
export class CategorylistPage implements OnInit {
  active: boolean;
  db = firebase.firestore();
 value

 Deco = []

 Sales = [];
  Products = [];
  myProduct = false;
  loader: boolean = true;
  dbMessages = firebase.firestore().collection('Messages');
  message = {
    fullname: '',
    email: '',
    message:''
 }

 key = ""

  constructor(private router: Router,  public modalController: ModalController,
    private data: ProductService, private activatedRouter : ActivatedRoute,
    public popoverController: PopoverController,  public toastCtrl: ToastController) { }
  
  
  ionViewWillEnter() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
  }

  ngOnInit() {

   
    console.log("Decos Products in Categori page ",  this.data.Deco);
    this.Deco = this.data.Deco

    


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

  
  getProducts(){
    this.db.collection('Products').where('categories', '==', this.value).get().then((snapshot) =>{
      this.Products = []
      if(snapshot.size > 0){
        this.myProduct= true
        snapshot.forEach(doc =>{
          this.Products.push(doc.data())
          console.log(this.Products);
          
        })
      }else{
        this.myProduct =false
      }
    })
  }
  
  async createViewProduct(event, key) {
    
    this.key = key
    // console.log("dddd ", event);
    this.data.Detail.category = event.categories
    this.data.Detail.desc = event.desc
    this.data.Detail.quantity = event.quantity
    this.data.Detail.image = event.image
    this.data.Detail.imageSide = event.imageSide
    this.data.Detail.imageBack = event.imageBack
    this.data.Detail.imageTop = event.imageTop
    this.data.Detail.items = event.items
    this.data.Detail.name = event.name
    this.data.Detail.price = event.price
    this.data.Detail.size = event.sizes
    this.data.Detail.productCode = event.productCode
    this.data.Detail.key = key


    this.router.navigateByUrl('/details')
  //   const modal = await this.modalController.create({
  //     component:DetailsPage,
  //     cssClass: 'my-custom-modal-css'
    
  //   });
  //   return await modal.present();
  }
  
  openHome(){
    this.router.navigateByUrl('/')
  }
  openAboutUS(){
    this.router.navigateByUrl('/about-us')
  }
  
  showList(i) {
    this.active = i;
   
    
  }
  async toastController(message) {
    let toast = await this.toastCtrl.create({ message: message, duration: 2000 });
    return toast.present();
}
  
}
