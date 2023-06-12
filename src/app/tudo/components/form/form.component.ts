import { Component, OnInit, Input } from '@angular/core';
import { MatDatepicker, MatDatepickerPanel, MatDatepickerControl, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../../interface/estado.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from '../../services/tudo.service';
import { Register } from '../../interface/register.interface';
import { filter, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatOptionSelectionChange } from '@angular/material/core';
@Component({
  selector: 'tudo-form',
  templateUrl: 'form.component.html',
  styleUrls:['form.component.css']
})

export class FormComponent implements OnInit{


  /**
   * Esta propiedad  nos permite
   * conectar el formulario que hicimos en el
   * html por medio del formGroup
   * y asignandole en el html los mismos nombres
   * que tenemos aca
   */
  public registroForm = new FormGroup({
    id:          new FormControl<number>(0),
    asunto:      new FormControl<string>(''),
    autor:       new FormControl<string>(''),
    descripcion: new FormControl<string>(''),
    fechaInicio:       new FormControl<string>(''),
    fechaFinal:       new FormControl<string>(''),
    estado:      new FormControl<string>(''),
  })


  // Este estado nos permite crear el select group
  public estado: Estado[] = [
    {value: 'Creado', viewValue:'Creado'},
    {value: 'Finalizado', viewValue:'Finalizado'},
    {value: 'Cancelado', viewValue:'Cancelado'},
    {value: 'En Proceso', viewValue:'En Proceso'}
  ]


  /**
   *En este constructor hacemos varias inyecciones
   * @param activateRoute => Para poder acceder a los parametros de la ruta
   * @param router => para tener ciertos metodos para manipular la ruta
   * @param todoService => para acceder a los metodos donde creamos, actualizamos, eliminamos etc
   */
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ){}


  /**
   * En este ngOnInit
   * como es lo primero que se ejecuta cuando se activa el componenente
   * lo que hacemos es llamar a los parametros de activatedRoute
   * para acceder a los parametros y si en los parametros de la ruta dice
   * edit y tiene el id por medio del registroForm.reset(registro)
   * le establecemos los valores a ese formulario del id que hayamos
   * recolectado de la url
   * @returns
   */
  ngOnInit(): void {
      // ! Si la url no incluye edit no hagas nada
      if( !this.router.url.includes('edit')) return;

      // ! Accedemos a los parametros de la ruta
      this.activateRoute.params
        // ! Con el pipe llamamos el operado swicth map
        .pipe(
          // ! este operador nos transforma el flujo de datos
          // ! que estamos emitiendo, en este caso como el activatedRoute es un observable nos permite usar ese operador
          // ! y acceder al id que tenga la ruta y asi llamamos al metodo del servicio todoService que nos permite
          // ! Obtener el objeto o la tarea por el id
          switchMap( ({id}) => this.todoService.getWorkById(id))
        )
          // ! Nos suscribimos para obtener ese objeto
          // ! y si no existe nos lleve a la ruta especificada
        .subscribe( registro => {
          if(!registro) return this.router.navigateByUrl('')

          // ! Este metodo .reset(registro) si no se le envia nada establecera el formulario por defecto
          // ! y si le enviamos un objetos automaticamente establecera cada uno de los campos cuyos nombres
          // ! coincidan con los formularios
          this.registroForm.reset(registro)
          return

        })
  }

  /**
   * Este metodo lo hicimos para obtener los valores
   * del formulario html
   * @returns void
   */
  get obtenerRegistro(): Register{
    // se le pone as Register para establecer que tendra ese mismo typo de datos o interface
    const register  = this.registroForm.value as Register
    return register
  }


  /**
   * Este metodo nos sirve para regresar a la pagina ver tareas
   * @returns void
   */
  public regresar ():void{
    this.router.navigateByUrl('tareas')
  }


  /**
   *  Este metodo se aplica cuando el formulario hace el metodo submit
   * @returns void
   */

  public onSubmit(): void {

    // ! si el formulario es invalido no haga nada
    if( this.registroForm.invalid ) return;

    if(this.obtenerRegistro.estado === 'Finalizado'){
      console.log(this.obtenerRegistro.estado)
      this.todoService.deleteById(this.obtenerRegistro.id)
      .subscribe( eliminado => {console.log(eliminado)})
    }

    
    // ! Si existe el id llama al metodo actualizar
    // ! y pasale como argumento el registro
    if( this.obtenerRegistro.id){
      // Se llama al metodo updateWork( donde recibe al registro )
      this.todoService.updateWork( this.obtenerRegistro )
        // nos suscribimos para que de el resultado
        .subscribe( registro => {
          this.showSnackBar(`${registro.autor} Actualizado!`)
        })
      return
    }



    // ! Y si no existe id, automaticamente se llama el metodo
    // ! para agregar tarea donde le pasamos el obtenerRegistro que
    // ! eso nos devuelve el registro
    this.todoService.addwork( this.obtenerRegistro)
    .subscribe(registro => {
      this.showSnackBar(`${registro.autor} Creado!`)

    })
  }


  /**
   * Este metodo nos permite eliminar una tarea por medio del id
   * no recibe nada pero llama un metodo del todoServicio
   * @returns void
   */
  public deleteWork(): void {
    // Llamamos el metodo deleteById( y le pasamos el id )
    // donde previamente en el servicio manejanos si funciona correctamente
    //  o hay algun error
    this.todoService.deleteById( this.obtenerRegistro.id )
    .subscribe( eliminado =>
      console.log(eliminado)
    )

  }

  /**
   * Este metodo no es solo para eliminar el registro
   * tambien abre la ventana de confirmacion
   */

  public onConfirmDelete () {
    // ! si el id del registro no existe indica el siguiente error
    if( !this.obtenerRegistro.id ) throw new Error(' registro.id is required ')

    // ! creamos una variable llamada dialogRef => y llamamos al metodo open
    // ! donde le pasamos el componente donde creamos el confirmComponent
    // ! y a la data le asignamos el valor del resgitroForm
    const dialogRef = this.dialog.open( ConfirmComponent , {
      data: this.registroForm.value
    })

    // esto es un observable que emite un valor cuando el dialogo se cierra. permite realizar
    // Acciones o realixar un flujo de trabajo despues de que el dialogo haya finalizado y se haya cerrado
    dialogRef.afterClosed()

      .pipe(
        // Filtra los valores emitidos por el observables para asegurarse de que sean de tipo booleano y solo se
        // consideran los que sean true => esto para verificar si el usuario ha confirmado la eliminacion
        filter((result: boolean) => result),
        // utilizamos el swicthmap para cambiar al flujo del servico y llamamos el metodo delete donde le pasamos el id
        // esto siempre y cuando el filter vaya true
        switchMap(() => this.todoService.deleteById( this.obtenerRegistro.id )),

        //Filtramos los valores emitidos por el observable resultante del paso anterior para asegurarse
        // de que sean de tipo booleano y solo se consideran aquellos que sean  true eto se utiliza para verificar si el
        // registro se ah eliminado correctamente
        filter( (wasDeleted: boolean) => wasDeleted)
      )

      // emitidos por el observable resultante del paso anterior y realiza la accion especificada
      // en este caso
      .subscribe( () => {
        this.router.navigate([''])
      })


  }




  public showSnackBar( message: string ):void {
    this.snackbar.open( message, 'done',{
      duration: 2500,
    })
  }


}
