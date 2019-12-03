import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from '../services/product.service';
import { DataService } from "../services/data.service";
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
// import { NavController } from 'ionic-angular';
// import 'rxjs/add/operator/debounceTime';
import {ProductDetailService} from "../../app/product-detail.service"


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // public searchTerm: string = "";
  // public items: any;
    searchControl: FormControl;
  db = firebase.firestore();
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

  Products = [];

  thisSearches = []
  public searchTerm: string = '';
  public items: any;
  public searching: boolean = false;
  supplier

  myProduct = false;
  autocompleteItemz: any;
  autocompletez:any;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  public item: Array<{ title: string; icon: string }> = [];
  public allItems: Array<{ title: string; icon: string }> = [];


  constructor(private dataService: DataService, private router: Router, public productService: ProductService,public data: ProductService) {
    this.searchControl = new FormControl();

    this.autocompleteItemz = [];
    this.autocompletez = { input: '' };

  }

  ngOnInit() {
    this.getProducts();
  }


  ViewDetails(view) {
    console.log("dddddddddddddd", view);
   // this.data.data = view;
    this.router.navigateByUrl('/details')
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

  ionViewDidLoad() {

}

  select(item){
    this.searchTerm = item.title;
    this.searching = false;
    this.thisSearches.push({searchItem:item});
  }


      getProducts() {

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

  navDetails = []

  editProduct() {
    this.myProduct = false;
  }

  itemClick(itemInfo){
  //  this.navCtrl.push(ItemViewPage,itemInfo);
  }

  SearchProducts(ev: CustomEvent){
    if(this.supplier === '') {
      this.autocompleteItemz = [];
      return;
    }
   this.autocompleteItemz = this.Products;
   console.log("ooo", this.autocompleteItemz );
    this.getProducts();
  
    const val = ev.detail.value; 
    if (val.trim() !== '') {
      this.autocompleteItemz = this.autocompleteItemz.filter(term => {
        return term.obj.name.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
      });
    }
  }

  productDetails(item){
    this.data.data = item;
    this.router.navigateByUrl('/details')
  }

}
