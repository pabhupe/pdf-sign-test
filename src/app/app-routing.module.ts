import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document/document.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'document/:id', component: DocumentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
