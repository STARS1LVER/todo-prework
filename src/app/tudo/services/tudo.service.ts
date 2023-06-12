import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'environments/environments';
import { Observable, catchError, of, map } from 'rxjs';
import { Register } from '../interface/register.interface';


@Injectable({providedIn: 'root'})

export class TodoService {

  // Llamamos la url atraves del enviroments
  private baseUrl: string = environments.baseUrl

  //! Inyectamos el http client para poder hacer las peticiones
  constructor(private http: HttpClient) { }

  // Por medio de este metodo podemos acceder a lo que tiene el json server

  /**
   * Este metodo nos permite acceder a lo que tenga el json
   * server
   * @param no Recibe
   * @returns Observable<Register[]> Retorna observable que es un array de registros
   */
  public getRegister():Observable<Register[]> {
    return this.http.get<Register[]>(`${this.baseUrl}`)
  }



  /**
   * Este metodo usamos el llamado de la peticio post
   * para agregar tareas a la base de datos
   * @param registro: Type Register
   * @returns Retorna un observable de tipo Register
   */

  public addwork(registro: Register): Observable<Register>{
      return this.http.post<Register>(`${this.baseUrl}`,registro);
  }



  /**
   * Este metodo realiza la peticion get para obtener el id
   * de una tarea y asi obtener ese objeto de ese id
   * @param id: Type string en este caso solo le pasamos la url y el id que necesitamos buscar
   * @returns Retorna un observable de tipo Register
   */
  public getWorkById(id: string): Observable<Register | undefined>{
    return this.http.get<Register>(`${this.baseUrl}${id}`)
      .pipe(
        // ! El of nos permite establecerle el valor al error!
        catchError( error => of(undefined ))

      )

  }



  /**
   * Este metodo realiza la peticion pacth el cual nos sirve para editar
   * la tarea o cierto elemento de la tarea este recibe el id y el objeto que
   * actualiza o edita
   * @param registro: Type Register p
   * @returns Retorna un observable de tipo Register
   */
  public updateWork(registro: Register):  Observable<Register> {
      if(!registro) throw new Error('Registro is required')

      return this.http.patch<Register>(`${this.baseUrl}${registro.id}`, registro)
  }




  /**
   * Este metodo realiza la peticion delete en cl cual nos permite eliminar
   * una tarea por medio del id
   * @param id : Type number
   * @returns Retorna un observable de tipo Register
   */
  public deleteById (id : number ): Observable<boolean> {

    return this.http.delete(`${this.baseUrl}${id}`)
    .pipe(
      // Usamos el operador map para trasnformar la respuesta a true
      map( resp => true),
      // De lo contrario con el metodo of le establecemos false
      catchError( error => of(false))
    )

  }


}
