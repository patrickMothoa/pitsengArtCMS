
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController} from '@ionic/angular';
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

  event = {
    image: '',
    categories:'',
    name:'',
    price:null,
    productno:'',
    desc: null,
    items:'',
    quantity : 1,
    small:'',
    medium:'',
    large: ''
  };
 
  public productForm: FormGroup;
  eventSource = [];
  reviews = [];
  actRoute: any;
 
  constructor(public   formBuilder: FormBuilder,private router: Router,public route : ActivatedRoute,public loadingCtrl: LoadingController, public productservices : ProductService, public alertCtrl: AlertController, public toastController: ToastController, @Inject(LOCALE_ID) private locale: string) { 
    this.productForm = formBuilder.group({ 
     image: [this.event.image, Validators.compose([Validators.required])],
      categories: [this.event.categories, Validators.compose([Validators.required])], 
      name: [this.event.name, Validators.compose([Validators.required])],
      price: [this.event.price, Validators.compose([Validators.required])], 
      productno: [this.event.productno, Validators.compose([Validators.required])], 
      desc: [this.event.desc, Validators.compose([Validators.required])], 
      items: [this.event.items, Validators.compose([Validators.required])], 
      // quantity : [this.event.quantity, Validators.compose([Validators.required])], 
      // small: [this.event.small, Validators.compose([Validators.required])], 
      // medium: [this.event.medium, Validators.compose([Validators.required])], 
      // large: [this.event.large, Validators.compose([Validators.required])], 
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

  async addEvent() {
    
    if (!this.event.desc || !this.event.productno ||!this.event.categories ||!this.event.quantity ||!this.event.items || !this.event.name || !this.event.price) {
      const alert =  await this.alertCtrl.create({
        message: 'All Product fields must be filled',
        
      });
      alert.present();
      
  
    } else {
      this.productservices.addProduct(this.event);
    }
  }

  getCategories(event){
    this.event.categories = event.detail.value;
  }

  getOption(event){
    this.event.items = event.detail.value;
  }

  // validating checkboxs
  // document.getElementById('productForm').onsubmit =  (e) => {
  //   var checkbox = document.getElementsByName("del[]"),
  //       i,
  //       checked;
  //   for (i = 0; i < checkbox.length; i += 1) {
  //     checked = (checkbox[i].checked||checked===true)?true:false;
  //   }
  
  //   if (checked == false) {
  //     alert('Check Something!');
  //     e.preventDefault();
  //     return false;
  //   } else if(confirm('confirm submit?')) {
  //     alert('done!');
  //     return true;
  //   }
  // }

  // getQuantity(event){
  //   this.event.quantity = event.detail.value;
  // }

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
  increment() {
    this.event.quantity++;
   }
  decrement() {
    if (this.event.quantity > 1) {
    this.event.quantity--;
    }
   }

}
