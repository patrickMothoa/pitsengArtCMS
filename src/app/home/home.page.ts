import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartserviceService } from '../services/cartservice.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  cart = [];
  items = [];

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(private router: Router, private cartService: CartserviceService, public navCtrl: NavController) {}

  ngOnInit() {
    this.items = this.cartService.getProducts();
    this.cart = this.cartService.getCart();
  }

  addToCart(product) {
    this.cartService.addProduct(product);
  }

  openCart() {
    this.router.navigate(['cart']);
  }

  openProfile(){
    this.router.navigateByUrl('/profile');
  }

  openUploads(){
    this.router.navigateByUrl('/add-product');
  }

  logOut(){
    firebase.auth().signOut().then(()=> {
      // Sign-out successful.
      this.router.navigateByUrl('/login');
    }).catch((error)=> {
      // An error happened.
    });
   
  }

  ///////////////////////
  searchQuery: string;
  searched:boolean = false;

  //Default page one
  pageNumber:number=1;
  //list of products
  Pots:any=[];
  // Show loading icon when api is being fetched
  apiLoader:boolean = false;
  customErrorMsg:boolean = false;
  listFetchStatus:boolean = false;

 
  search(event){
    if(this.searchQuery != ''){
      this.apiLoader = true;
      //console.log(this.searchQuery);
      // Resetting page
      this.pageNumber=1;
      this.Pots = [];
      this.listFetchStatus = false;

      this.searched = true;
      this.fetchAllArts();
    }
  }

  fetchAllArts(){
    // this.cartService.getProducts(this.searchQuery, this.pageNumber)
    //       .subscribe(fetchedpots => {
       
    //         if(fetchedpots.length==0){
    //           this.listFetchStatus = true;
    //         }else{
    //           for(let i=0;i<fetchedpots.length;i++){
    //             this.Pots.push(fetchedpots[i]);
    //           }
    //         }
    //         this.apiLoader = false;
    //         this.customErrorMsg = false;

    //       }, err => {
    //         this.apiLoader = false;
    //         this.customErrorMsg = true;
    //       });
  }

  itemClick(itemInfo){
  //  this.navCtrl.push(ItemViewPage,itemInfo);
  }

}
