import { Component, EventEmitter, Inject, Input, OnInit, Output, input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { PositionEmployee } from '../../models/positionEmployee.model';
import { Position } from '../../models/position.model';
import { PositionServiceService } from '../../service/position-service.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';



@Component({
  selector: 'app-position-form',
  standalone: true,
  imports: [
    MatDatepickerModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatNativeDateModule,
    MatSelectModule,
    CommonModule,
     MatTableModule,HttpClientModule,MatIconModule, MatFormFieldModule,
    MatRadioModule,

  ],
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css'],
  providers: [PositionServiceService, HttpClient, MatOption,
  ],
})
export class PositionFormComponent implements OnInit {
  positionForm: FormGroup;
  @Input() employee: Employee;
  @Input() employeePosition: PositionEmployee;
  @Output() submitEvent: EventEmitter<PositionEmployee> = new EventEmitter<PositionEmployee>();
  positions: Position[];

  constructor(
    private _positionService: PositionServiceService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
console.log("employeePosition",this.employeePosition) 
    this._positionService.getPositions().subscribe({
      next: (res: Position[]) => {
        this.positions = res;
      },
      error: (err) => {
        console.error(err);
      }
    });


    this.positionForm = this.formBuilder.group({
      Position: new FormControl('', Validators.required),
      positionName: new FormControl('', Validators.required),
      entryDate: new FormControl('', Validators.required),
      isManagement: new FormControl(false)
    });
  }


  isPositionDisabled(PositionName: String) {
    if (this.employee && this.employee.positions) {
      for (let i = 0; i < this.employee.positions.length; i++) {
        if (this.employee.positions[i] && this.employee.positions[i].positionName === PositionName && this.employee.positions[i].positionName !== this.employeePosition.positionName) {
          return true;
        }
      }
    }
    return false;

  }

  onSubmit() {
console.log("employeePosition",this.employeePosition.entryDate)
console.log("employeePosition",this.employeePosition.positionName)
console.log("employeePosition",this.employeePosition)
    for (let i = 0; i < this.positions.length; i++) {
      if (this.positions[i].positionName === this.positionForm.value.positionName) {
        this.employeePosition.positionId = this.positions[i].positionId;

      }
    }
    this.employeePosition.positionName = this.positionForm.value.positionName;
    this.employeePosition.entryDate = this.positionForm.value.entryDate;
    this.employeePosition.isManagement = this.positionForm.value.isManagement;


    this.submitEvent.emit(this.employeePosition as PositionEmployee);

  }


}