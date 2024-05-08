import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import Swal from 'sweetalert2';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {
  
   editedEmployeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private _employeeService: EmployeeService 
  ) {
    this.editedEmployeeForm = this.formBuilder.group({
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      identity: [data.identity, Validators.required],
      birthDate: [data.birthDate, Validators.required],
      gender: [data.gender, Validators.required],
      entryDate: [data.entryDate, Validators.required],
      statusActive: [data.statusActive]
    });
  }

  onSave(): void {
    if (this.editedEmployeeForm.valid) {
      const editedEmployeeData = this.editedEmployeeForm.value as Employee;
      console.log('Saving edited employee:', editedEmployeeData);
      const employeeId = this.data.employeeId; 
      this._employeeService.updateEmployee(editedEmployeeData, employeeId).subscribe({
        next: (value: Employee) => {
          console.log('Employee updated successfully:', value);
        
          Swal.fire({
            icon: 'success',
            title: 'Employee edited successfully',
          });
          window.location.reload();
          this.dialogRef.close(); 
          
        },
        error: (error: any) => {
          console.error('Error updating employee:', error);
          // Handle error if necessary
        }
      });
    }
  
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving
  }
}
