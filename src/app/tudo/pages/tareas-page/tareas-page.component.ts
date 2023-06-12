import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/tudo.service';
import { Register } from '../../interface/register.interface';

@Component({
  selector: 'app-tareas-page',
  templateUrl: './tareas-page.component.html',
  styleUrls: ['./tareas-page.component.css']
})
export class TareasPageComponent  implements OnInit{

  // Creamos esta propiedad para inicializarla en el onInit
  public registros: Register[] = [];

  //! Inyectamos el servicio para poder acceder a los metodos
  constructor(private todoService: TodoService){}


  // En el on init llamamos el metodo getRegister el cual nos suscribimos
  // Para poder acceder a los datos, si no nos suscribimos no seria posible
  ngOnInit(): void {
    this.todoService.getRegister()
    .subscribe( registro => this.registros = registro)
  }

}
