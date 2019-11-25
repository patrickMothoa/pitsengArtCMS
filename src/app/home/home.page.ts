import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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

  constructor(private router: Router, public productService: ProductService) {}

  ngOnInit() {
   // this.ViewDetails(this.navDetails)
    this.getProducts();

    // firebase.auth().onAuthStateChanged(category => {
    //   if (category) {
    //      this.event.categories = this.event.productno
    //   this.getProducts();
    //   } else {
    //        console.log("not here");  
    //   }
    // })
  }

//   ViewDetails(view) {
//     this.navDetails.push(this.ViewDetails,{
//       image: view.image,
//       categories:view.categories,
//       name:view.name,
//       price:view.price,
//       productno:view.productno,
//       desc: view.desc,
//       small:view.small,
//       medium:view.medium,
//       large:view.large
// });
//     this.router.navigateByUrl('/details')
//   }

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

 
  onSearchInput(){
    
    if(this.searchTerm.length>0){
     //  this.event = this.productService.filterItems(this.searchTerm);
       this.searching = true;
       
    }else{
      this.searching = false;
    }
  }

  select(item){
    this.searchTerm = item.title;
    this.searching = false;
    this.thisSearches.push({searchItem:item});
  }



    /// retrieving from database

  // getProducts(){
  //   this.db.collection('Products').get().then(snapshot => {
  //     if (snapshot.empty) {
  //       this.myProduct = false;
  //     } else {
  //       this.myProduct = true;
  //       snapshot.forEach(doc => {
  //         this.event.image= doc.data().image;
  //         this.event.categories = doc.data().categories
  //         this.event.name=doc.data().name
  //         this.event.price=doc.data().price
  //         this.event.productno=doc.data().productno
  //         this.event.desc=doc.data().desc
  //         this.event.small=doc.data().small
  //         this.event.medium=doc.data().medium
  //         this.event.large=doc.data().large
          
  //       })
  //     }
  //   })
  // }

      // retriving from firebase.firestore
      getProducts() {
        this.db.collection('Products').get().then(snapshot => {
          if (snapshot.empty) {
                  this.myProduct = false;
                } else {
                  this.myProduct = true;
                  snapshot.forEach(doc => {
                    this.Products.push(doc.data());
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
