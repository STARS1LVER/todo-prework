import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sideBarItems = [
    {label: 'Ver Tareas', icon: 'list_alt', url:'tareas'},
    {label: 'Registrar Tarea', icon: 'app_registration', url:'register'},
  ]


}
