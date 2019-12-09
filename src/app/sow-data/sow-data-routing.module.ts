import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SowDataPage } from './sow-data.page';

const routes: Routes = [
  {
    path: '',
    component: SowDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SowDataPageRoutingModule {}
