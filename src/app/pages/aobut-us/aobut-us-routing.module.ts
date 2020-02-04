import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AobutUsPage } from './aobut-us.page';

const routes: Routes = [
  {
    path: '',
    component: AobutUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AobutUsPageRoutingModule {}
