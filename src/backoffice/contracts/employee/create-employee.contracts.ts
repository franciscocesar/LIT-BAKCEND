import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Employee } from '../../models/employee.model';
import { Contract } from '../contract';

@Injectable()
export class CreateEmployeeContract implements Contract {
  errors: any[];

  validate(model: Employee): boolean {
    const flunt = new Flunt();

    flunt.isRequired(model.name, 'Obrigatório fornecer o nome do funcionário');
    flunt.isRequired(
      model.document,
      'Obrigatório fornecer o CPF do funcionário',
    );
    flunt.isRequired(
      model.hiringDate,
      'Obrigatório fornecer a data de contratação do funcionário',
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
    flunt.isPasswordValid(
      model.password,
      'A senha cadastrada pelo usuário deve ser composta de pelo menos 8 caracteres, ter uma letra maiúsculas e uma letra minúsculas além de conter pelo menos 1 caractere especial',
    );

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
