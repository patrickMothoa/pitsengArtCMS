import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserInvoicesPage } from './user-invoices.page';

const routes: Routes = [
  {
    path: '',
    component: UserInvoicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInvoicesPageRoutingModule {}
