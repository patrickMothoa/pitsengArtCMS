
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController} from '@ionic/angular';
import { ViewChild, Inject, LOCALE_ID } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
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
    small:'',
    medium:'',
    large: ''
  };
 
  eventSource = [];
  reviews = [];
  actRoute: any;
 
  constructor(public route : ActivatedRoute,public loadingCtrl: LoadingController, public productservices : ProductService, public alertCtrl: AlertController, public toastController: ToastController, @Inject(LOCALE_ID) private locale: string) { }


  ngOnInit() {
    // const date = new Date();
   //  this.event.lastcreated = date.toDateString();
    //console.log(this.navParams);
    // this.event.image = this.navParams.data.image;
    // this.event.name = this.navParams.data.name;
    // this.event.price = this.navParams.data.price;
    // this.event.productno = this.navParams.data.productno;
    // this.event.desc = this.navParams.data.desc;

    /////
    // this.event.image = this.actRoute.snapshot.params['image'];
    // this.event.name = this.actRoute.snapshot.params['name'];
    // this.event.price = this.actRoute.snapshot.params['price'];
    // this.event.productno = this.actRoute.snapshot.params['productno'];
    // this.event.desc = this.actRoute.snapshot.params['desc'];

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

  //////replaces this... here
  async addEvent() {
    console.log("xxxxx");
    
    if (!this.event.desc || !this.event.productno ||!this.event.categories || !this.event.name || !this.event.price) {
      const alert =  await this.alertCtrl.create({
        message: 'All Product fields must be filled',
        
      });
      alert.present();
      
  
    } else {
      this.productservices.addProduct(this.event);
    }
  }

  // async createSong() { 
  //   const loading = await this.loadingCtrl.create(); 
   
  //   const albumName = this.createSongForm.value.albumName; 
  //   const artistName = this.createSongForm.value.artistName; 
  //   const songDescription = this.createSongForm.value.songDescription; 
  //   const songName = this.createSongForm.value.songName; 
   
  //   this.firestoreService 
  //     .createSong(albumName, artistName, songDescription, songName) 
  //     .then( 
  //       () => { 
  //         loading.dismiss().then(() => { 
  //           this.router.navigateByUrl(''); 
  //         }); 
  //       }, 
  //       error => { 
  //         console.error(error); 
  //       } 
  //     ); 
   
  //   return await loading.present(); 
  // }

  getCategories(event){
    console.log("oooo"); 
    this.event.categories = event.detail.value;
    console.log(this.event.categories, "cxcxcxxc"); 
  }

back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
    }
}
