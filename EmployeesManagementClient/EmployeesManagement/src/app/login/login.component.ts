import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public LoginForm!: FormGroup
  public Employee!: Employee[];

  static flag :boolean |null=false;
  showRotatingIcon: boolean | undefined;
  hide: boolean | undefined;
  userExists: boolean | undefined;

constructor(private _employeerService:EmployeeService,private router:Router){}

ngOnInit(): void {
  this.LoginForm = new FormGroup({
    'name': new FormControl("",[Validators.required, Validators.minLength(3)]),
    'password': new FormControl( "",Validators.required),
  });
}
public getUsers() {
  this._employeerService.getEmployee().subscribe((data: Employee[]) => {
    this.Employee = data;
  });
}

togglePasswordVisibility() {
  this.hide = !this.hide;
}
}
