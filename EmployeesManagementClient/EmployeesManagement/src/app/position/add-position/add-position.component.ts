import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { PositionFormComponent } from '../position-form/position-form.component';
import { HttpClientModule } from '@angular/common/http';
import { PositionEmployee } from '../../models/positionEmployee.model';
import { PositionServiceService } from '../../service/position-service.service';

@Component({
  // providers:[HttpHandler],
    selector: 'app-add-position',
    standalone: true,
    templateUrl: './add-position.component.html',
    styleUrl: './add-position.component.css',
    imports: [PositionFormComponent, HttpClientModule ]
})
export class AddPositionComponent implements OnInit{
  public employee:Employee; 
  public employeePosition: PositionEmployee = {
  positionId:0,
  positionName:null,
  isManagement:false,
  entryDate:null
  };
  
  constructor(
    public dialogRef: MatDialogRef<AddPositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee }
) {
    this.employee = this.data.employee;
}
    ngOnInit(): void {
    
     
    }
    addPosition(employeePosition:PositionEmployee) {
      this.employee.positions.push(employeePosition);
      console.log("in add : " , employeePosition)
       this.dialogRef.close(this.employee.positions);
   
     }
     onCancel(): void {
       this.dialogRef.close(this.employee.positions); 
     }
   
   }
   
