import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuriesPage } from './quries.page';

const routes: Routes = [
  {
    path: '',
    component: QuriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuriesPageRoutingModule {}
