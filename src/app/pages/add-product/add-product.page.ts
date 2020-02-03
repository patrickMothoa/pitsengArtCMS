
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController, ModalController} from '@ionic/angular';
import { Inject, LOCALE_ID } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  db = firebase.firestore();
  storage = firebase.storage().ref();
  //categories
   currentNumber: number = 1;
  event = {
     id: '',
    image: '',
    categories:'',
    name:'',
    price:null,
    productCode:'',
    desc: null,
    items:'',
    quantity : 1,
    lastcreated: '',
    size:[]
  };
  sizes = null;
  productSize = {
    small: false,
    medium: false,
    large: false
  }
 
  public productForm: FormGroup;
  eventSource = [];
  reviews = [];
  actRoute: any;
 
  constructor(public   formBuilder: FormBuilder,
    private router: Router,public route : ActivatedRoute,public loadingCtrl: LoadingController, 
    public productservices : ProductService, public alertCtrl: AlertController, public toastController: ToastController,
     @Inject(LOCALE_ID) private locale: string,public modalController: ModalController,) { 
    this.productForm = formBuilder.group({ 
     image: [this.event.image, Validators.compose([Validators.required])],
      categories: [this.event.categories, Validators.compose([Validators.required])], 
      name: [this.event.name, Validators.compose([Validators.required])],
      price: [this.event.price, Validators.compose([Validators.required])], 
      productCode: [this.event.productCode, Validators.compose([Validators.required])], 
      desc: [this.event.desc, Validators.compose([Validators.required])], 
      items: [this.event.items, Validators.compose([Validators.required])], 
      quantity : [this.event.quantity, Validators.compose([Validators.pattern("[^0-9]")])], 
       
      size: [this.event.size, Validators.compose([Validators.requiredTrue])], 
    });
  }


  ngOnInit() {
    // const date = new Date();
   //  this.event.lastcreated = date.toDateString();

  }
  changeListener(event): void {
    const i = event.target.files[0];
    console.log(i);
    const upload = this.storage.child(i.name).put(i);
    upload.on('state_changed', snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('upload is: ', progress , '% done.');
    }, err => {
    }, () => {
      upload.snapshot.ref.getDownloadURL().then(dwnURL => {
        console.log('File avail at: ', dwnURL);
        this.event.image = dwnURL;
      });
    });
  }
  async addEvent(){
    if (!this.event.image){
      const alerter = await this.alertCtrl.create({
        message: 'Error saving product. No image selected or has not finnished uploading.'
      })
      alerter.present();
    } else {
      if ( !this.event.desc||!this.event.quantity ||!this.event.size || !this.event.name || !this.event.price|| !this.event.categories) {
        const alerter = await this.alertCtrl.create({
          message: 'Error saving product. Some fields not filled'
        })
        alerter.present();
      }else {
        let num = parseFloat(this.event.price.toString())
      this.event.price = num;
        if (this.event.price > 1000) {
          const alerter = await this.alertCtrl.create({
            message: 'The price cannot be more than R1000.00 pp/pn'
          })
          alerter.present();
        } else{
          // this.listproduct = [];
     /////// generating Random product Code
    this.event.productCode =  this.stringGen(6);
    console.log(" product code : ", this.event.productCode );
    
    const date = new Date();
    this.event.lastcreated = date.toDateString();
    const worker = await this.loadingCtrl.create({
      message: 'Working',
      spinner: 'bubbles'
    })
    worker.present();
    this.db.collection('Products').doc().set(this.event).then( async res => {
      /* this.retrieve(); */
      worker.dismiss();
      const alerter = await this.alertCtrl.create({
        message: 'Product added successful',
        buttons: [
          {
          text: 'OK'
          }
        ],
      })
      alerter.present();
      this.dismiss();
      alerter.present();
    //   clear()
    //  this.event = {
    //   image: '',
    //   categories:'',
    //   name:'',
    //   price:0,
    //   productCode:'',
    //   desc: '',
    //   items:'',
    //   quantity : 1,
    //   lastcreated: '',
    //   size:[]
  
    // };



    }).catch(async err => {
      const alerter = await this.alertCtrl.create({
        message: 'Error saving product.'
      })
      alerter.present();
    this.dismiss();
    })
        }
    //**************************** */
    
     }
    }
  }
  stringGen(len){
    var text = " ";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
  }
  selectedSize(size) {
    let val = size.toElement.value
    if (this.sizes == val) {
      this.sizes = null
    } else {
      this.sizes = size.toElement.value
    }
    console.log(this.sizes);

    switch (val) {
      case 'S':
        this.productSize = {
          small: true,
          medium: false,
          large: false
        }
        break;
      case 'M':
        this.productSize = {
          small: false,
          medium: true,
          large: false
        }
        break;
      case 'L':
        this.productSize = {
          small: false,
          medium: false,
          large: true
        }
        break;
    }

  }

  getCategories(event){
    this.event.categories = event.detail.value;
  }

  getOption(event){
    this.event.items = event.detail.value;
  }
  dismiss(){
    this.modalController.dismiss({
      'dismissed':true
    });
  }

back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
    }

    openProfile(){
      this.router.navigateByUrl('/profile');
    }
    openHome(){
      this.router.navigateByUrl('/home');
    }
  
    openUploads(){
      this.router.navigateByUrl('/add-product');
    }
  
    openInvoice(){
      this.router.navigateByUrl('/user-invoices');
    }
  
    logOut(){
      firebase.auth().signOut().then(()=> {
        // Sign-out successful.
        this.router.navigateByUrl('/login');
      }).catch((error)=> {
        // An error happened.
      });
    }

  // Quantinty code (Increment, decrement, quantinty)
  // increment() {
  //   this.event.quantity++;
  //  }
  // decrement() {
  //   if (this.event.quantity > 1) {
  //   this.event.quantity--;
  //   }
  //  }

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
}
