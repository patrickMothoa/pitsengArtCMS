import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpacialsPageRoutingModule } from './spacials-routing.module';

import { SpacialsPage } from './spacials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpacialsPageRoutingModule
  ],
  declarations: [SpacialsPage]
})
export class SpacialsPageModule {}
