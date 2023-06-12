import { Component } from '@angular/core';
import { MatDatepicker, MatDatepickerPanel, MatDatepickerControl, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../../interface/estado.interface';
import { TodoService } from '../../services/tudo.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tudo-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {


  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private todoService: TodoService
  ){}




}
