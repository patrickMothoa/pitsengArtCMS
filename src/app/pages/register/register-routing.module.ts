import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '', 
    component: RegisterPage
  }
];

@NgModule({
  imports: [ReactiveFormsModule,FormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
