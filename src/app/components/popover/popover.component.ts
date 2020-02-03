import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { ProfilePage } from 'src/app/pages/profile/profile.page';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  constructor(   public modalController: ModalController,  
    public popoverController: PopoverController,) { }

  ngOnInit() {}
  async createProfile() {
    const modal = await this.modalController.create({
      component:ProfilePage,
      cssClass: 'my-add-to-cart',
      
    
    });
    return await modal.present();
  }
  DismissClick(){
    this.popoverController.dismiss({
      'dismissed':true
    });
  }
}
