import { Component, OnInit } from '@angular/core';
import { ToastController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserInvoicesPage } from 'src/app/pages/user-invoices/user-invoices.page';
import { AddProductPage } from 'src/app/pages/add-product/add-product.page';
import * as firebase from 'firebase';
import { PopoverComponent } from '../popover/popover.component';
import { FaqsPage } from 'src/app/pages/faqs/faqs.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(public toastController: ToastController,
    public popoverController: PopoverController,
    public modalController: ModalController,
    private router: Router,) { }
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
