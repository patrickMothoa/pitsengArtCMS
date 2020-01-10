import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from 'src/app/services/product.service';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
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
  constructor(
    public loadingCtrl: LoadingController,
    public productService: ProductService, 
    public data : ProductService,
    public alertCtrl: AlertController,
    private router: Router,
    public modalController: ModalController) { }

  ngOnInit() {
    this.getProducts();
  }


  Home() {
   this.router.navigateByUrl('/pro');
  }

  ionViewWillEnter(){
    this.Products.push(this.data.data)  
  }
   ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

        // retriving from firebase.firestore
    getProducts(){
    this.db.collection('Products').get().then(snapshot => {
      if (snapshot.empty) {
        this.myProduct = false;
      } else {
        this.myProduct = true;
        snapshot.forEach(doc => {
          this.event.image= doc.data().image;
          this.event.categories = doc.data().categories
          this.event.name=doc.data().name
          this.event.price=doc.data().price
          this.event.productCode=doc.data().productCode
          this.event.desc=doc.data().desc
          // this.event.small=doc.data().small
          // this.event.medium=doc.data().medium
          // this.event.large=doc.data().large
          
        })
      }
    })
  }
  

  // dismiss(p) {
  //   this.data.data = p;
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }

  async Deleteproduct(value){
    console.log('item =>',value);
    
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete? This action is ireversable.!',
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
          handler: async () => {
            const worker = await this.loadingCtrl.create({
              message: 'Working',
              spinner: 'bubbles'
            })
            worker.present();
            this.db.collection('Products').doc(value).delete().then(async res => {
             worker.dismiss()
              this.listproduct = [];
              this.retrieve();
           
              const alerter = await this.alertCtrl.create({
              message: 'Product deleted',
              buttons: [
                {
                text: 'OK'
                }  
              ], 
            })
           alerter.present();
            this.event = {
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
              
            };
            })
          }
        }
      ]
      
    });
   
    await alert.present(); 
    this.dismiss();
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
    }

  retrieve(){
    this.listproduct = [];
    this.db.collection('Products').onSnapshot(snapshot => {
      if (snapshot.empty) {
        console.log('No documents');
      } else {
        snapshot.forEach(doc => {
          
          this.listproduct.push({id : doc.id, data : doc.data()});
          console.log(this.listproduct);
          
        })
      }
    })
  }

  edit(val, id){
    this.event = val;
    this.autoId = id;
    console.log('Edit: ', this.event);
    this.updateBtn = true;
    this.router.navigateByUrl('/pro');
  }

}
