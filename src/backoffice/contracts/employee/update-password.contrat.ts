import { Injectable } from '@nestjs/common';
import { UpdataPasswordDto } from 'src/backoffice/dtos/employee/update-password.dto';
import { Flunt } from 'src/utils/flunt';
import { Contract } from '../contract';

@Injectable()
export class UpdatePasswordContract implements Contract {
  errors: any[];

  validate(model: UpdataPasswordDto): boolean {
    const flunt = new Flunt();

    flunt.isPasswordValid(
      model.password,
      'A senha cadastrada pelo usuário deve ser composta de pelo menos 8 caracteres, ter uma letra maiúsculas e uma letra minúsculas além de conter pelo menos 1 caractere especial',
    );

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
