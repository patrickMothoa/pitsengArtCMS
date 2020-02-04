import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AobutUsPageRoutingModule } from './aobut-us-routing.module';

import { AobutUsPage } from './aobut-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AobutUsPageRoutingModule
  ],
  declarations: [AobutUsPage]
})
export class AobutUsPageModule {}
