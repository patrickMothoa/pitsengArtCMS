import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserInvoicesPage } from 'src/app/pages/user-invoices/user-invoices.page';
import { AddProductPage } from 'src/app/pages/add-product/add-product.page';
import * as firebase from 'firebase';
import { PopoverComponent } from '../popover/popover.component';
import { FaqsPage } from 'src/app/pages/faqs/faqs.page';
import { ProductService } from 'src/app/services/product.service';
import { DetailsPage } from 'src/app/pages/details/details.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  db = firebase.firestore();
  specials =[];
  supplier
  autocompleteItemz: any;
  autocompletez:any;
  Products = [];
  key = "";
  isShow = false;
  myDest: any;
  constructor(public toastController: ToastController,
    public popoverController: PopoverController,
    public modalController: ModalController,
    private data: ProductService, 
    private router: Router,) { 
      this.autocompleteItemz = [];
    this.autocompletez = { input: '' };
    }
    public showSearchBar = false;
    public isSearchbarOpened = false;

    myProduct = false;
  ngOnInit() {
    firebase.firestore().collection("Sales").orderBy("percentage", "desc").limit(1).onSnapshot(snapshot => {
      this.specials = []
      snapshot.forEach(data => {
        this.specials.push(data.data())
        console.log("Percentage ", data.data());
        
      })
    })
  }
  openAboutUS(){
    this.router.navigateByUrl('/aobut-us')
  }
  clickedSearchIcon(event: Event) {
    this.showSearchBar = !this.showSearchBar;
  }
  openProfile(){
    this.router.navigateByUrl('/profile');
  }
  dismiss(){
    this.popoverController.dismiss({
      'dismissed':true
    });
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
    
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
  async createViewProduct(event, key) {
    
    this.key = key
    // console.log("dddd ", event);
    this.data.Detail.category = event.categories
    this.data.Detail.desc = event.desc
    this.data.Detail.image = event.image
    this.data.Detail.items = event.items
    this.data.Detail.name = event.name
    this.data.Detail.price = event.price
    this.data.Detail.size = event.sizes
    this.data.Detail.productCode = event.productCode
    this.data.Detail.key = key

this.myDest = '';
this.router.navigateByUrl('/details');
console.log('click search')
    // const modal = await this.modalController.create({
    //   component:DetailsPage,
    //   cssClass: 'my-custom-modal-css'
    
    // });
    
    // return await modal.present();
  }
  removeSearchList(){

  }
  resetChanges(){

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
  menuToggle = 'menu';
  showOptions(){
    if(this.menuToggle === 'menu'){
    this.menuToggle = 'close';
    document.getElementById('opts').style.display = 'block';
    } else {
      this.menuToggle = 'menu';
        document.getElementById('opts').style.display = 'none';
    }
  }
  close = 'closeList'
 
  async createFaqs() {
    const modal = await this.modalController.create({
      component:FaqsPage,
      cssClass: 'my-add-to-cart',
    });
    return await modal.present();
  }









  openProS() {
    this.showOptions();
    this.router.navigateByUrl('/pro');
  }


  async openInvoiceS() {
    this.showOptions();
    const modal = await this.modalController.create({
      component:UserInvoicesPage,
      cssClass: 'my-add-to-cart'
    });
    return await modal.present();
  }
  queriesS(){
    this.showOptions();
    this.router.navigateByUrl('/quries')
  }
  openAboutUSS(){
    this.showOptions();
    this.router.navigateByUrl('/aobut-us')
  }
  async createFaqsS() {
    this.showOptions();
    const modal = await this.modalController.create({
      component:FaqsPage,
      cssClass: 'my-add-to-cart',
    });
    return await modal.present();
  }
  async addProductS() {
    this.showOptions();
    const modal = await this.modalController.create({
      component:AddProductPage,
      cssClass: 'add-product',
      
    
    });
    return await modal.present();
  }
  active: string = ''

  ShowActive(activeButton) {
    console.log('this is active')
    this.active = activeButton;

    if (activeButton === "home") {
  
      document.getElementById("home").style.textDecoration = "underline";
      // document.getElementById("home").style.textDecorationColor = "#B73225";
      document.getElementById("about").style.textDecoration = "transparent";
      document.getElementById("queries").style.textDecoration = "transparent";
      document.getElementById("faqs").style.textDecoration = "transparent";
      document.getElementById("addProduct").style.textDecoration = "transparent";
      
      // text-decoration: underline;
    }
    else if (activeButton === "about") {


      document.getElementById("home").style.textDecoration = "transparent";
      document.getElementById("about").style.textDecoration = "underline";
      // document.getElementById("about").style.textDecorationColor = "#B73225";
      document.getElementById("queries").style.textDecoration = "transparent";
      document.getElementById("faqs").style.textDecoration = "transparent";
      document.getElementById("addProduct").style.textDecoration = "transparent";
  
 
     }else if (activeButton === "queries"){
      document.getElementById("home").style.textDecoration = "transparent";
      document.getElementById("about").style.textDecoration = "transparent";
      document.getElementById("queries").style.textDecoration = "underline";
      // document.getElementById("queries").style.textDecorationColor = "#B73225";
      document.getElementById("faqs").style.textDecoration = "transparent";
      document.getElementById("addProduct").style.textDecoration = "transparent";

     }else if (activeButton === "faqs"){
      document.getElementById("home").style.textDecoration = "transparent";
      document.getElementById("about").style.textDecoration = "transparent";
      document.getElementById("queries").style.textDecoration = "transparent";
      document.getElementById("faqs").style.textDecoration = "underline";
      // document.getElementById("faqs").style.textDecorationColor = "#B73225";
      document.getElementById("addProduct").style.textDecoration = "transparent";

     }else if (activeButton === "addProduct"){
      document.getElementById("home").style.textDecoration = "transparent";
      document.getElementById("about").style.textDecoration = "transparent";
      document.getElementById("queries").style.textDecoration = "transparent";
      document.getElementById("faqs").style.textDecoration = "transparent";
      document.getElementById("addProduct").style.textDecoration = "underline";
      // document.getElementById("addProduct").style.textDecorationColor = "#B73225";

     }
    
  }

  Allspecials(){
    this.router.navigateByUrl('/specials');
    // let navigationExtras: NavigationExtras = {
    //   state: {
    //     parms: i
    //   }
    // }
    // this.router.navigate(['categorylist'],navigationExtras)   
  }
  
  
  // Allspecials
}
