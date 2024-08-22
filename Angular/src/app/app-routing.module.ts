import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdminpageComponent } from './adminpage/adminpage.component';

const routes: Routes = [
  {
    path: "home",
    title: "home",
    component: HomeComponent,
  },
  
  {
    path: "addproduct",
    title: "addproduct",
    component: AddproductComponent,
  },
  {
    path: "adminpage",
    title: "adminpage",
    component: AdminpageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
