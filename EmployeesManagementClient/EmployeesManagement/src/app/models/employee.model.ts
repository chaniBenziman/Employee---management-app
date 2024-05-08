import { PositionEmployee } from "./positionEmployee.model";
export class Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  identity: string;
  birthDate: Date;
  gender: number;
  entryDate: Date;
  statusActive: boolean;
  positions!:PositionEmployee[];

  constructor() {
    this.statusActive = true;
  }
}