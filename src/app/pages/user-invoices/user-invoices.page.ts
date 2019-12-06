import { Component, OnInit, } from '@angular/core';
  import { from } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ProductDetailService } from 'src/app/product-detail.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from 'express-serve-static-core';
import { ModalController } from '@ionic/angular';

  

@Component({
  selector: 'app-user-invoices',
  templateUrl: './user-invoices.page.html',
  styleUrls: ['./user-invoices.page.scss'],
})
export class UserInvoicesPage implements OnInit {

  constructor(public modalController: ModalController ) {}

  ngOnInit() {
  }

  // async viewModal(){
  //   const modal = await this.modalController.create({
  //     component: OrderListPage
  //   });
  //   return  modal.present();

  // }

}
