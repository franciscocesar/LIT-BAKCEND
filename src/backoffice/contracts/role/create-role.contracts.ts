import { Injectable } from '@nestjs/common';
import { Flunt } from 'src/utils/flunt';
import { Role } from '../../models/role.model';
import { Contract } from '../contract';

@Injectable()
export class CreateRoleContract implements Contract {
  errors: any[];

  validate(model: Role): boolean {
    const flunt = new Flunt();

    flunt.isRequired(model.name, 'Obrigatório fornecer o nome do cargo');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
