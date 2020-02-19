import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpacialsPage } from './spacials.page';

const routes: Routes = [
  {
    path: '',
    component: SpacialsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpacialsPageRoutingModule {}
