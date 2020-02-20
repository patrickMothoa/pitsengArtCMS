import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController, ModalController, PopoverController} from '@ionic/angular';
import { Inject, LOCALE_ID } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetailsPage } from '../details/details.page';
import {NavigationExtras} from '@angular/router';
import { ProfilePage } from '../profile/profile.page';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { UserInvoicesPage } from '../user-invoices/user-invoices.page';
import { AddProductPage } from '../add-product/add-product.page';


@Component({
  selector: 'app-pro',
  templateUrl: './pro.page.html',
  styleUrls: ['./pro.page.scss'],
})
export class ProPage implements OnInit {
 

  decoLength = 0
  vaseLength = 0
  lampsLength = 0
  potteryLength = 0
  db = firebase.firestore();
  storage = firebase.storage().ref();
  listproduct = [];
  Products = [];
  proSales = [];
  event = {
    image: '',
    categories:'',
    name:'',
    price:0,
    productCode:'',
    desc: '',
    items:'',
    quantity : 1,
    lastcreated: '',
    size:[],
    //onspecial:0

  };
  cardEdited = null
  supplier
  myProduct = false;
  autocompleteItemz: any;
  promo:any;
  autocompletez:any;
 updateBtn = false;
 active: boolean;
 errtext = '';
 loader: boolean = true;
 listDiv: any = document.getElementsByClassName('categorySection');
   list: boolean = false;
  Homescreen = {
    deco: null,
    lamps: null,
    pottery: null,
    vase: null
  }
  SpecialScrin = []

 
  public productForm: FormGroup;
  eventSource = [];
  reviews = [];
  actRoute: any;
  size = ['S','M','L']
  autoId: any;
  constructor(public modalController: ModalController,
    public data : ProductService,
    public   formBuilder: FormBuilder,
    private router: Router,
    public route : ActivatedRoute,
    public loadingCtrl: LoadingController, 
    public productservices : ProductService, 
    public alertCtrl: AlertController,
     public toastController: ToastController,
     public popoverController: PopoverController,
     @Inject(LOCALE_ID) private locale: string) { 
    this.productForm = formBuilder.group({ 
     image: [this.event.image, Validators.compose([Validators.required])],
      categories: [this.event.categories, Validators.compose([Validators.required])], 
      name: [this.event.name, Validators.compose([Validators.required])],
      price: [this.event.price, Validators.compose([Validators.required])], 
       
      desc: [this.event.desc, Validators.compose([Validators.required])], 
      items: [this.event.items, Validators.compose([Validators.required])], 
      
    });

    this.autocompleteItemz = [];
    this.autocompletez = { input: '' };
    this.getPictures();
    this.getSpecials();
  }

ionViewDidLoad(){
  this.event.price =0;
  console.log(this.event.price);
 
}
 
ionViewWillEnter() {
  setTimeout(() => {
    this.loader = false;
  }, 2000);
}

    ngOnInit() {

      this.db.collection('Products').where('categories', '==', 'Vase').onSnapshot((data) => {
        this.vaseLength = data.size;
      })
      this.db.collection('Products').where('categories', '==', 'Lamps').onSnapshot((data) => {
        this.lampsLength = data.size;
      })
      this.db.collection('Products').where('categories', '==', 'Deco').onSnapshot((data) => {
        this.decoLength = data.size;
      })
      this.db.collection('Products').where('categories', '==', 'Pottery').onSnapshot((data) => {
        this.potteryLength = data.size;
      })


      
      this.retrieve();
      
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
      if ( !this.event.desc  ||!this.event.categories ||!this.event.quantity ||!this.event.items||!this.event.size || !this.event.name || !this.event.price) {
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
          this.listproduct = [];
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
      worker.dismiss();
      alerter.present();

     this.event = {
      image: '',
      categories:'',
      name:'',
      price:0,
      productCode:'',
      desc: '',
      items:'',
      quantity : 1,
      lastcreated: '',
      size:[]
  
    };



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
  } 
    clear(){
      this.event = {
        image: '',
        categories:'',
        name:'',
        price:0,
        productCode:"",
        desc: '',
        items:'',
        quantity : 1,
        lastcreated: '',
        size:[]
        
      };
    }
    /////// generating Random product Code
    stringGen(len){
      var text = " ";
      var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < len; i++ )
          text += charset.charAt(Math.floor(Math.random() * charset.length));
      return text;
    }
  
 
async update(id) {
  if (!this.event.image){
    const alerter = await this.alertCtrl.create({
      message: 'Error saving product. No image selected or has not finnished uploading.'
    })
    alerter.present();
  } else {
    if (!this.event.desc ||!this.event.categories ||!this.event.quantity ||!this.event.items||!this.event.size || !this.event.name || !this.event.price) {
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
      message: 'Product updated successful',
      buttons: [
        {
        text: 'OK'
        }
      ],
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
    price:null,
    productCode:"",
    desc: '',
    items:'',
    quantity : 1,
    lastcreated: '',
    size:[]
    
  };
}

  getCategories(event){
    this.event.categories = event.detail.value;
  }

  getOption(event){
    this.event.items = event.detail.value;
  }

  edit(val, id, card){
    this.cardEdited = card
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
  }

back() {
  var swiper = document.querySelector('.swiper-container')['swiper'];
  swiper.slidePrev();
    }

    openProfile(){
      this.router.navigateByUrl('/profile');
    }
    dismiss(){
      this.popoverController.dismiss({
        'dismissed':true
      });
    }
    openHome(){
      this.router.navigateByUrl('/pro');
    }
  
    async presentPopover(ev) {
      const popover = await this.popoverController.create({
        component:PopoverComponent,
        event: ev,
        // cssClass: 'pop-over-style',
        translucent: true,
      });
      this.dismiss
      return await popover.present();
      
    }

    async openInvoice() {
      const modal = await this.modalController.create({
        component:UserInvoicesPage,
        cssClass: 'my-add-to-cart',
        
      
      });
      return await modal.present();
    }

    
    async addProduct() {
      const modal = await this.modalController.create({
        component:AddProductPage,
        cssClass: 'add-product',
        
      
      });
      return await modal.present();
    }



    openPro(){
      this.router.navigateByUrl('/pro');
    }
    queries(){
      this.router.navigateByUrl('/quries')
    }
  
    logOut(){
      firebase.auth().signOut().then(()=> {
        // Sign-out successful.
        this.router.navigateByUrl('/login');
      }).catch((error)=> {
        // An error happened.
      });
    }

////// for searching

getProduct(){
  let obj = {id : '', obj : {}};
  this.db.collection('Products').get().then(snapshot => {
    this.Products = [];
    if (snapshot.empty) {
            this.myProduct = false;
          } else {
            this.myProduct = true;
            snapshot.forEach(doc => {
              obj.id = doc.id;
              obj.obj = doc.data();
              this.Products.push(obj);
              obj = {id : '', obj : {}};
              console.log("herererer", this.Products);
            });
            return this.Products;
          }
  });
}

SearchProducts(ev: CustomEvent){
  if(this.supplier === '') {
    this.autocompleteItemz = [];
    return;
  }
 this.autocompleteItemz = this.Products;
 console.log("ooo", this.autocompleteItemz );
  this.getProduct();

  const val = ev.detail.value; 
  if (val.trim() !== '') {
    this.autocompleteItemz = this.autocompleteItemz.filter(term => {
      return term.obj.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
    });
  }
}

promotion(ev: CustomEvent){
  if(this.supplier === '') {
    this.promo = [];
    return;
  }
 this.promo = this.Products;
 console.log("ooo", this.promo );
  this.getProduct();

  // const val = ev.detail.value; 
  // if (val.trim() !== '') {
  //   this.autocompleteItemz = this.autocompleteItemz.filter(term => {
  //     return term.obj.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
  //   });
  // }
}

productDetails(item){
  this.data.data = item;
  // this.router.navigateByUrl('/details');
  this.createModal();
}

async viewModal(){
  const modal = await this.modalController.create({
    component: DetailsPage
  });
  return  modal.present();
}


async createModal() {
  const modal = await this.modalController.create({
    component: DetailsPage,
    cssClass: 'my-custom-modal-css'
  });
  return await modal.present();
}


test(i) {}


categorylist(i){

 
if(i == "Deco"){
  
  firebase.firestore().collection("Products").onSnapshot(data => {
    
    this.data.Deco = []
    let obj = {data : {}, key : ""}
    this.decoLength = 0;
    data.forEach(item => {
      console.log("dddd ", item.data());
      
      if(item.data().categories == "Deco"){

      obj.data = item.data()
      obj.key = item.id
        this.data.Deco.push(obj)
        obj = {data : {}, key : ""}
        this.decoLength += 1
        
      }
    })

    this.router.navigateByUrl("categorylist")
  })

}else if(i == "Vase"){

  console.log('seko',i);
  firebase.firestore().collection("Products").onSnapshot(data => {
    this.data.Deco = []
    let obj = {data : {}, key : ""}
    this.vaseLength = 0;
    data.forEach(item => {
      
      if(item.data().categories == "Vase"){
      obj.data = item.data()
      obj.key = item.id
        this.data.Deco.push(obj)
        obj = {data : {}, key : ""}
        this.vaseLength += 1
        
      }
    })

    this.router.navigateByUrl("categorylist")
  })

}else if(i == "Lamps"){

  console.log('seko',i);
  firebase.firestore().collection("Products").onSnapshot(data => {
    this.data.Deco = []
    let obj = {data : {}, key : ""}
    this.lampsLength = 0;
    data.forEach(item => {
      
      if(item.data().categories == "Lamps"){
      obj.data = item.data()
      obj.key = item.id
        this.data.Deco.push(obj)
        obj = {data : {}, key : ""}
        this.lampsLength += 1
        
      }
    })

    this.router.navigateByUrl("categorylist")
  })


  
}else if(i == "Pottery"){
  console.log('seko',i);
  firebase.firestore().collection("Products").onSnapshot(data => {
    this.data.Deco = []
    let obj = {data : {}, key : ""}
    this.potteryLength = 0;
    data.forEach(item => {
      
      if(item.data().categories == "Pottery"){
      obj.data = item.data()
      obj.key = item.id
        this.data.Deco.push(obj)
        obj = {data : {}, key : ""}
        this.potteryLength += 1
        
      }
    })

    this.router.navigateByUrl("categorylist")
  })

}
 
 
}


getPictures(){
  let obj = {id : '', obj : {}};
  this.db.collection('Pictures').doc('images').get().then(snapshot => {
    this.Homescreen = {
      deco: null,
      lamps: null,
      pottery: null,
      vase: null
    }
    if (!snapshot.exists) {
            this.myProduct = false;
          } else {
            this.myProduct = true;
              obj.id = snapshot.id;
              obj.obj = snapshot.data();
              this.Homescreen = {
                deco: snapshot.data().deco,
                lamps: snapshot.data().lamps,
                pottery: snapshot.data().pottery,
                vase: snapshot.data().vase
              }
              obj = {id : '', obj : {}};
            console.log("xxc", this.Homescreen);
          }
     });
}
getSpecials(){
  let obj = {id : '', obj : {}};
this.db.collection('Sales').limit(5).get().then(snapshot => {
  this.proSales = [];
  if (snapshot.empty) {
          this.myProduct = false;
        } else {
          this.myProduct = true;
          snapshot.forEach(doc => {
            obj.id = doc.id;
            obj.obj = doc.data();
            this.proSales.push(obj);
            obj = {id : '', obj : {}};
            
          });
          this.SpecialScrin.push(this.proSales[0])
        }
   });
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

}
