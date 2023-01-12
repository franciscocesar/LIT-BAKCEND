import { Role } from './role.model';

export class Employee {
  constructor(
    public name: string,
    public email: string,
    public document: string,
    public hiringDate: Date,
    public registrationNumber: number,
    public role: Role,
    public password: string,
    public active: boolean,
  ) {}
}
