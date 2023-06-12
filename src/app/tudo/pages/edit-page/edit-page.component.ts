import { Component, OnInit } from '@angular/core';
import { Register } from '../../interface/register.interface';
import { TodoService } from '../../services/tudo.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent {



  constructor( private todoService: TodoService) {}



}
