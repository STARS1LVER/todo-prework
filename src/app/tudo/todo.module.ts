import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { EditPageComponent } from './pages/edit-page/edit-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TareasPageComponent } from './pages/tareas-page/tareas-page.component';
import { TodoRoutingModule } from './todo-routing.module';
import { CardComponent } from './components/card/card.component';
import { FormComponent } from './components/form/form.component';
import { ConfirmComponent } from './components/confirm-dialog/confirm-dialog.component';





@NgModule({
  declarations: [
    EditPageComponent,
    LayoutPageComponent,
    RegisterPageComponent,
    TareasPageComponent,
    CardComponent,
    FormComponent,
    ConfirmComponent




  ],
  imports: [
    CommonModule,
    MaterialModule,
    TodoRoutingModule,

  ],

})
export class TodoModule { }
