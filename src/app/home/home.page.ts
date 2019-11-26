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

  myProduct = false;

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  constructor(private dataService: DataService, public data : ProductDetailService,  private router: Router, public productService: ProductService) {
    this.searchControl = new FormControl();
  }

  ngOnInit() {
    this.getProducts();
    this.setFilteredItems("");

    this.searchControl.valueChanges
    .pipe(debounceTime(700))
    .subscribe(search => {
      this.setFilteredItems(search);
    });
  }
  setFilteredItems(searchTerm) {
    this.items = this.dataService.filterItems(searchTerm);
  }

  ViewDetails(view) {
    console.log("dddddddddddddd", view);
    this.data.data = view;
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

  
  // onSearchInput(){
    
  //   if(this.searchTerm.length>0){
  //     // this.event = this.productService.filterItems(this.searchTerm);
  //      this.searching = true;
       
  //   }else{
  //     this.searching = false;
  //   }
  // }
  ionViewDidLoad() {

    // this.setFilteredItems();

    // this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

    //     this.searching = false;
    //     this.setFilteredItems();

    // });


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

}
