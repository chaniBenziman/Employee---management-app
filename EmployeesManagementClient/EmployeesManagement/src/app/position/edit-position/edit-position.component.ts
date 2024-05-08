// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { PositionEmployee } from '../../models/positionEmployee.model';
// import { PositionServiceService } from '../../service/position-service.service';

// @Component({
//   selector: 'app-edit-position',
//   standalone: true,
//   imports: [ ReactiveFormsModule],
//   templateUrl: './edit-position.component.html',
//   styleUrls: ['./edit-position.component.css']
// })
// export class EditPositionComponent implements OnInit {
  
//   positionForm: FormGroup;
//   positionId: number;

//   constructor(
//     private formBuilder: FormBuilder,
//     private positionService: PositionServiceService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) { }

//   // ngOnInit(): void {
//   //   this.route.paramMap.subscribe(params => {
//   //     this.positionId = +params.get('id');
//   //     this.loadPosition();
//   //   });

//     this.positionForm = this.formBuilder.group({
//       positionName: ['', Validators.required],
//       entryDate: ['', Validators.required],
//       isManagement: [false]
//     });
//   }

//   // loadPosition(): void {
//   //   // this.positionService.getPositionPerEmployeeById(employeeId, this.positionId)
//   //     .subscribe(position => {
//   //       this.positionForm.patchValue(position);
//   //     }, error => {
//   //       console.error('Error loading position:', error);
//   //     });
//   // }
  
//   onSubmit(): void {
//     if (this.positionForm.invalid) {
//       return;
//     }
//     const employeeId = 1; // Replace with actual employee ID
//     const positionData = this.positionForm.value as PositionEmployee;
//     this.positionService.updatePosition(positionData, employeeId, this.positionId)
//       .subscribe(() => {
//         console.log('Position updated successfully.');
//         this.router.navigate(['/']);
//       }, error => {
//         console.error('Error updating position:', error);
//       });
//   }

//   onCancel(): void {
//     this.router.navigate(['/']);
//   }
// }
