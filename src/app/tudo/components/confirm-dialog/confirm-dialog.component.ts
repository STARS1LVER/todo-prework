import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, } from '@angular/material/dialog';
import { Register } from '../../interface/register.interface';
@Component({
  selector: 'confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls:['confirm-dialog.component.css']
})

export class ConfirmComponent {

  /**
   * usamos el constructor para inyectar
   * el MatDialogRef => esto representa la referencia al dialogo en si mismo
   * que permiteinteractuar con el codigo como cerrarlo o modificarlo sus propiedades
   * e Injectamos MAT_DIALOG_DATA => esta inyeccion utiliza el decorador para obtener
   * los datos que se pasaron al dialogo al abrirlo es una constante predefinida en angular
   * @param dialogRef
   * @param data
   * Esta inyeccion permite acceder al dialogo mismo y a los datos pasados al dialogo desde el
   * componente ConfimComponent lo que facilita la interaccion y personalizacion del dialogo dentro del componente
   */
  constructor(
    private dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Register,
  ) { }


  /***
   * Este metodo nos permite cerrar la ventana le pasamos
   * al metodo close => false nos permite cerrar el dialogo y devolver un resultado en este caso el false
   */
  public onNoClick(): void {
    this.dialogRef.close(false)
  }

  /***
   * Este metodo nos permite abrir la ventana le pasamos
   * al metodo close => true nos permite abrir el dialogo y devolver un resultado en este caso el false
   */
  public onConfirm(): void {
    this.dialogRef.close(true)
  }


  /**
   * aca este metodo
   * creamos una variable de tipo Register
   * en donde le asignamos lo que tenga this.data
   * @returns registro
   */
  get register(): Register {
    const registro: Register = this.data
    return registro
  }
}
