import { Component, Input, OnInit } from '@angular/core';
import { Register } from '../../interface/register.interface';

@Component({
  selector: 'tudo-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  implements OnInit{


  @Input()
  public registros!: Register

  ngOnInit(): void {
    if( !this.registros ) throw new Error('Registros property is required')
  }

}
