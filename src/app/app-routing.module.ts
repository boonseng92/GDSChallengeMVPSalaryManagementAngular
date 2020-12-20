import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFilesComponent } from './uploadfile/uploadfile.component';
import {SearchComponent} from './search/search.component';

const routes: Routes = [
  {path: '' , redirectTo: 'uploadFile' , pathMatch: 'full'},
  {path: 'uploadFile' , component: UploadFilesComponent},
  {path: 'viewEmployee' , component: SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
