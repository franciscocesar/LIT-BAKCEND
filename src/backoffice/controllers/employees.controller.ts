import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Md5 } from 'md5-typescript';
import { model } from 'mongoose';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateEmployeeContract } from '../contracts/employee/create-employee.contracts';
import { UpdateEmployeeContract } from '../contracts/employee/update-employee.contract';
import { UpdatePasswordContract } from '../contracts/employee/update-password.contrat';
import { UpdatePasswordDto } from '../dtos/employee/update-password.dto';
import { UpdateEmployeeDto } from '../dtos/employee/update.employee.dto';
import { ResultDto } from '../dtos/result.dto';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Controller('v1/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Get()
  async get() {
    const employee = await this.employeeService.findAllEmployees();
    return new ResultDto(null, true, employee, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateEmployeeContract()))
  async post(@Body() model: Employee) {
    try {
      const password = await Md5.init(
        `${model.password}${process.env.SALT_KEY}`,
      );
      const employee = await this.employeeService.createEmployee(
        new Employee(
          model.name,
          model.email,
          model.document,
          model.hiringDate,
          model.registrationNumber,
          model.role,
          password,
          model.active,
        ),
      );

      return new ResultDto(
        'Funcionário criado com sucesso!',
        true,
        employee,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new ResultDto('Erro ao realizar cadastro', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':document')
  @UseInterceptors(new ValidatorInterceptor(new UpdateEmployeeContract()))
  async update(@Param('document') document, @Body() model: UpdateEmployeeDto) {
    try {
      await this.employeeService.updateEmployee(document, model);
      return new ResultDto(null, true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto(
          'Erro ao atualizar cadastro, verifique se existe outro usuário com mesmos campos',
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put('update-password/:document')
  @UseInterceptors(new ValidatorInterceptor(new UpdatePasswordContract()))
  async updatePassowrd(
    @Param('document') document,
    @Body() model: UpdatePasswordDto,
  ) {
    try {
      const password = await Md5.init(
        `${model.password}${process.env.SALT_KEY}`,
      );

      console.log(password)
      await this.employeeService.updatePassword(document, { password });
      return new ResultDto('Senha alterada com sucesso', true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto('Erro ao atualizar cadastro a senha', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Put('enable-or-disabled/:document')
  async updateStatus(
    @Param('document') document
  ) {
    try {

      await this.employeeService.enableOrDisableEmployee(document);
      return new ResultDto('Status alterado com sucesso', true, model, null);
    } catch (error) {
      throw new HttpException(
        new ResultDto('Erro ao atualizar cadastro a senha', false, null, error),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
