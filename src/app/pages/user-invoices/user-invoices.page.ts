import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ProductDetailService } from 'src/app/product-detail.service';
import { ProductService } from 'src/app/services/product.service';

import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { OrderDetailsPage } from '../../pages/order-details/order-details.page'
import * as firebase from 'firebase';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { SowDataPage } from 'src/app/sow-data/sow-data.page';





@Component({
  selector: 'app-user-invoices',
  templateUrl: './user-invoices.page.html',
  styleUrls: ['./user-invoices.page.scss'],
})
export class UserInvoicesPage implements OnInit {
  dbOrder = firebase.firestore().collection('Order');
  dbHistory = firebase.firestore().collection('orderHistory');
  dbUser = firebase.firestore().collection("UserProfile");
  public isSearchbarOpened = false;
  users = []
  Allorders = [];
  public item = [];
  conArray = []
  Orders = []
  autocompleteItemz: any;
  autocompletez: any;
  public display;
  public postSort = 'recent';
  public userID; z
  public userTransact: any;
  myArr = []
  myArray = []
  ordersPlaced = [];
  loader: boolean = false;
  active: any;
  myProduct = false;
  orderHistory = [];
  myProfile = [];
  name: string;
  constructor(public DataService: DataService, public modalController: ModalController, public formBuilder: FormBuilder, private router: Router, public route: ActivatedRoute, public loadingCtrl: LoadingController, public productservices: ProductService, public alertCtrl: AlertController, public toastController: ToastController) {
    this.autocompleteItemz = [];
    this.autocompletez = { input: '' };
  //  this.smsSent = false
    firebase.auth().languageCode = 'en';
  }

  ngOnInit() {

    // console.log("dsdds");
    this.GetOrders();
    this.viewDetails();
    this.getOrderHistory()
    let obj = { name: '', uid: '' };
    this.dbUser.onSnapshot(data => {
      data.forEach(item => {
        this.myProfile.push({data:item.data().name, id : item.id});
        obj.name = item.data().email;
        obj.uid = item.data().uid
        this.users.push(obj);
        obj = { name: '', uid: '' };
        // console.log("users ",  this.users);
      })
    })
    
  }
  SearchInvoice(ev: CustomEvent){
    if(this.name === '') {
      this.autocompleteItemz = [];
      return;
    }
   this.autocompleteItemz = this.ordersPlaced;
   console.log("ooo", this.autocompleteItemz );
    this.GetOrders();
    const val = ev.detail.value; 
    if (val.trim() !== '') {
      this.autocompleteItemz = this.autocompleteItemz.filter(item => {
        return item.info.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }
  getOrderHistory() {
    this.dbHistory.onSnapshot((res) => {
      this.orderHistory = [];
      res.forEach((doc) => {
        this.dbUser.doc(doc.data().userID).onSnapshot((item)=>{
          this.orderHistory.push({info:doc.data(), user: item.data().name, ref: doc.id});
        })
      })
    })
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  showList(i) {
    this.active = i;
    // console.log('year');
    // this.selectedValueIndex = p
  }

  viewDetails() {
    this.loader = true;
    this.dbOrder.onSnapshot(data => {
      this.ordersPlaced = [];
      // console.log(data);
      data.forEach(item => {
        this.ordersPlaced.push({ ref: item.id, info: item.data() })
        //  console.log(item.data().orderNumber);
        this.loader = false;
        //console.log("my data",this.ordersPlaced);
      })
      // this.router.navigateByUrl('/order-details'); 


    })


  }


  userProfiles() {
    this.ordersPlaced.forEach((i) => {

    })
  }
  // async details() {
  //   const modal = await this.modalController.create({
  //     component:OrderDetailsPage,
  //     cssClass: 'my-add-to-cart',


  //   });
  //   return await modal.present();
  // }
  async viewDetail(value, page) {
    //  console.log("My data ",value, "My id");
    const modal = await this.modalController.create({
      component: OrderDetailsPage,
      cssClass: 'track-order',
      componentProps: {
        pageName: page,
        totalPrice: value.info.totalPrice,
        ref: value.ref,
        name: value.info.product[0].name,
        price: value.info.product[0].price,
        quantity: value.info.product[0].quantity,
        image: value.info.product[0].image,
        arr: value.info.product
      }

    });
    return await modal.present();
  }

  openPro() {
    this.router.navigateByUrl('/pro');
  }
  openInvoice() {
    this.router.navigateByUrl('/user-invoices');
  }
  openProfile() {
    this.router.navigateByUrl('/profile');
  }
  logOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.router.navigateByUrl('/login');
    }).catch((error) => {
      // An error happened.
    });
  }
  GetOrders() {

    this.dbOrder.onSnapshot((data) => {
      // console.log("olx", data);
      if (this.Allorders = []) {
        this.myProduct = true
        data.forEach((item) => {
          this.Allorders.push({ ref: item.id, info: item.data(), total: item.data() })
        })
        // console.log("ccc", this.Allorders);
        // 
      } else {
        this.myProduct = false
      }

    })
  }
  createTrackOder(item) {
    console.log('My item ', item)
    /* const modal = await this.modalController.create({
      component:OrderDetailsPage,
      cssClass: 'track-order',
      componentProps: { ref: item.ref,
        totalPrice: item.info.totalPrice,
        name: item.info.product[0].prod.product_name,
        price: item.info.product[0].prod.price,
        quantity: item.info.product[0].prod.quantity,
        image: item.info.product[0].prod.image,
      arr:item.info.product },
    },);
    return await modal.present(); */
  }

}
