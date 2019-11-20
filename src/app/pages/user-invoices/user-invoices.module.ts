import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserInvoicesPageRoutingModule } from './user-invoices-routing.module';

import { UserInvoicesPage } from './user-invoices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserInvoicesPageRoutingModule
  ],
  declarations: [UserInvoicesPage]
})
export class UserInvoicesPageModule {}
