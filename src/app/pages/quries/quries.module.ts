import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuriesPageRoutingModule } from './quries-routing.module';

import { QuriesPage } from './quries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuriesPageRoutingModule
  ],
  declarations: [QuriesPage]
})
export class QuriesPageModule {}
