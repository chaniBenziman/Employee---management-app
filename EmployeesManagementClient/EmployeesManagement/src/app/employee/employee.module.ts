import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllEmployeesComponent } from './all-employees/all-employees.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../service/employee.service';
import { MatIconModule } from '@angular/material/icon';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [AllEmployeesComponent,AddEmployeeComponent,EditEmployeeComponent],
  imports: [
    CommonModule, MatTableModule,HttpClientModule,MatIconModule, MatFormFieldModule,
    MatRadioModule,MatDatepickerModule,MatNativeDateModule,  FormsModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule
  ],
  providers: [EmployeeService,HttpClientModule],
})
export class EmployeeModule { }
