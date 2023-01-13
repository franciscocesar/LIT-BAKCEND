import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateRoleContract } from '../contracts/role/create-role.contracts';
import { ResultDto } from '../dtos/result.dto';
import { Role } from '../models/role.model';
import { RoleService } from '../services/role.service';

@Controller('v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles() {
    const roles = await this.roleService.findAll();

    return new ResultDto(null, true, roles, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateRoleContract()))
  async createRole(@Body() model: Role) {
    try {
      const role = await this.roleService.create(new Role(model.name));

      return new ResultDto('Role criada com sucesso!', true, role, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto('Erro ao realizar cadastro', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
