import { Role } from 'src/backoffice/models/role.model';

export class UpdateEmployeeDto {
  constructor(
    public name: string,
    public email: string,
    public document: string,
    public registrationNumber: number,
    public role: Role,
  ) {}
}
