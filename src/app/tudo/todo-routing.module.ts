import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TareasPageComponent } from './pages/tareas-page/tareas-page.component';
import { EditPageComponent } from './pages/edit-page/edit-page.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {path: 'register', component: RegisterPageComponent},
      {path: 'tareas', component: TareasPageComponent},
      {path: 'edit/:id', component: EditPageComponent},
      {path: ':id', component: EditPageComponent},
      {path: '**', redirectTo: 'tareas'}
    ]
  }


]


@NgModule({
  imports:[RouterModule.forChild( routes )],
  exports:[RouterModule]

})
export class TodoRoutingModule { }
