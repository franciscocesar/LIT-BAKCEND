import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from 'src/backoffice/dtos/employee/update.employee.dto';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';

@Injectable()
export class UpdateEmployeeContract implements Contract {
  errors: any[];

  validate(model: UpdateEmployeeDto): boolean {
    const flunt = new Flunt();

    flunt.isRequired(model.name, 'Obrigatório fornecer o nome do funcionário');
    flunt.isRequired(
      model.document,
      'Obrigatório fornecer o CPF do funcionário',
    );
    flunt.isRequired(
      model.registrationNumber,
      'Obrigatório fornecer o número da matrícula',
    );
    flunt.isRequired(model.role, 'Obrigatório fornecer o cargo do funcionário');
    flunt.isRequired(
      model.email,
      'Obrigatório fornecer o e-mail do funcionário',
    );

    flunt.isEmail(model.email, 'E-mail inválido');
    flunt.isCPF(model.document, 'CPF Inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
