import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SowDataPageRoutingModule } from './sow-data-routing.module';

import { SowDataPage } from './sow-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SowDataPageRoutingModule
  ],
  declarations: [SowDataPage]
})
export class SowDataPageModule {}
