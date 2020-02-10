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
  supplier
  autocompleteItemz: any;
  autocompletez:any;
  Products = [];
  key = ""
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
  ngOnInit() {}
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


  
    const modal = await this.modalController.create({
      component:DetailsPage,
      cssClass: 'my-custom-modal-css'
    
    });
    return await modal.present();
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
  async createFaqs() {
    const modal = await this.modalController.create({
      component:FaqsPage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }


  Allspecials
}
