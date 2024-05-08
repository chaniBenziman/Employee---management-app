import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { EmployeeService } from '../../service/employee.service';
import Swal from 'sweetalert2';
import { AddPositionComponent } from '../../position/add-position/add-position.component';
import { MatDialog } from '@angular/material/dialog';
import EventEmitter from 'events';
import { Employee } from '../../models/employee.model';
import { Position } from '../../models/position.model';
import { catchError, identity, of } from 'rxjs';
import { PositionEmployee } from '../../models/positionEmployee.model';
import { PositionServiceService } from '../../service/position-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public employeeForm: FormGroup;
  positions: Position[] = [];
  genders = [
    { value: 0, viewValue: 'Male' },
    { value: 1, viewValue: 'Female' }
  ];
  employee: Employee;
  constructor(
    private formBuilder: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private _positionEmployeeService: PositionServiceService
  ) { }

  ngOnInit(): void {
    
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      identity: new FormControl('', Validators.required),
      birthDate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      positions: new FormArray([]),
      entryDate: new FormControl('', Validators.required),
    });
  }
  addPosition() {
    this.router.navigate(["/addPosition"]);
  }
  save() {
    // בדיקת תקינות הטופס
    if (this.employeeForm.invalid) {
      return;
    }
    // שמירת העובד באמצעות ה-Service
    this._employeeService.addEmployee(this.employeeForm.getRawValue()).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Employee added successfully',
      });
      this.router.navigate(["/employees"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/"]);
  }
  openAddPositionDialog(): void {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '500px',
      data: { employee: this.employeeForm.value as Employee } 
    });
  
    dialogRef.afterClosed().pipe(
      catchError(error => {
        console.error('Error occurred while closing the dialog', error);
        return of(null);
      })
    ).subscribe(result => {
      if ((result)) {
        this._positionEmployeeService.addPositionForEmployee(
          this.employeeForm.get('identity').value,
          result

        ).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Position added successfully',
          });
          this.router.navigate(["/employees"]);
        });
        this.employeeForm.setControl('positions', this.formBuilder.array(result.map(item => this.formBuilder.group(item))));
      }
    });
  }
  
  isFormValid() {
    return !this.employeeForm.valid;
  }
}



