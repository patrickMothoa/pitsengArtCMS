import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController} from '@ionic/angular';
import { Inject, LOCALE_ID } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.page.html',
  styleUrls: ['./pro.page.scss'],
})
export class ProPage implements OnInit {
  db = firebase.firestore();
  storage = firebase.storage().ref();
  //categories
  listproduct = [];
  event = {
    image: '',
    categories:'',
    name:'',
    price:0,
    productno:'',
    desc: '',
    items:'',
    quantity : 1,
    lastcreated: '',
    size:[]
    // small:'',
    // medium:'',
    // large: ''
  };

 updateBtn = false;
 
  public productForm: FormGroup;
  eventSource = [];
  reviews = [];
  actRoute: any;
size = ['small', 'medium', 'large']
  autoId: any;
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
      this.retrieve();
      // this.getbookings();
      // this.getusers();
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
      if (!this.event.desc || !this.event.productno ||!this.event.categories ||!this.event.quantity ||!this.event.items||!this.event.size || !this.event.name || !this.event.price) {
        const alerter = await this.alertCtrl.create({
          message: 'Error saving product. Some fields not filled'
        })
        alerter.present();
      }else {
        if (this.event.price > 1000) {
          const alerter = await this.alertCtrl.create({
            message: 'The price cannot be more than R1000.00 pp/pn'
          })
          alerter.present();
        } else{
          this.listproduct = [];
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
        message: 'product saved'
      })
      alerter.present();
    }).catch(async err => {
      const alerter = await this.alertCtrl.create({
        message: 'Error saving product.'
      })
      alerter.present();
      worker.dismiss();
    })
        }
    //**************************** */
    
     }
    } 
    this.event = {
      image: '',
      categories:'',
      name:'',
      price:0,
      productno:'',
      desc: '',
      items:'',
      quantity : 1,
      lastcreated: '',
      size:[]
      // small:'',
      // medium:'',
      // large: ''
    };
  }

async update(id) {
  if (!this.event.image){
    const alerter = await this.alertCtrl.create({
      message: 'Error saving product. No image selected or has not finnished uploading.'
    })
    alerter.present();
  } else {
    if (!this.event.desc || !this.event.productno ||!this.event.categories ||!this.event.quantity ||!this.event.items||!this.event.size || !this.event.name || !this.event.price) {
      const alerter = await this.alertCtrl.create({
        message: 'Error saving product. Some fields not filled'
      })
      alerter.present();
    }else {
      if (this.event.price > 1000) {
        const alerter = await this.alertCtrl.create({
          message: 'The price cannot be more than R1000.00 pp/pn'
        })
        alerter.present();
      } else{
        this.listproduct = [];
  const date = new Date();
  this.event.lastcreated = date.toDateString();
  const worker = await this.loadingCtrl.create({
    message: 'Working',
    spinner: 'bubbles'
  })
  worker.present();
  this.db.collection('Products').doc(id).update(this.event).then( async res => {
    /* this.retrieve(); */
    worker.dismiss();
    const alerter = await this.alertCtrl.create({
      message: 'product saved'
    })
    alerter.present();
  }).catch(async err => {
    const alerter = await this.alertCtrl.create({
      message: 'Error saving product.'
    })
    alerter.present();
    worker.dismiss();
  })
      }
  //**************************** */
  
   }
  } 
  this.updateBtn = false;
  this.event = {
    image: '',
    categories:'',
    name:'',
    price:0,
    productno:'',
    desc: '',
    items:'',
    quantity : 1,
    lastcreated: '',
    size:[]
    // small:'',
    // medium:'',
    // large: ''
  };
}

  // async addEvent() {
    
  //   if (!this.event.desc || !this.event.productno ||!this.event.categories ||!this.event.quantity ||!this.event.items || !this.event.name || !this.event.price) {
  //     const alert =  await this.alertCtrl.create({
  //       message: 'All Product fields must be filled',
        
  //     });
  //     alert.present();
      
  
  //   } else {
  //     this.productservices.addProduct(this.event);
  //   }
  // }

  getCategories(event){
    this.event.categories = event.detail.value;
  }

  getOption(event){
    this.event.items = event.detail.value;
  }

  edit(val, id){
    this.event = val;
    this.autoId = id;
    console.log('Edit: ', this.event);
    this.updateBtn = true;
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
  async delete(value){
    console.log('item =>',value);
    
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Message <strong>Are you sure you want to delete? This action is ireversable.</strong>!!!',
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
              message: 'product deleted'
            })
            alerter.present();
            })
          }
        }
      ]
    });

    await alert.present(); 
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


}
