import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'todo',
    loadChildren: () => import('./tudo/todo.module').then(modulo => modulo.TodoModule)
  },

  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
