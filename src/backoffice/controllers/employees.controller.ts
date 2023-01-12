import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ValidatorInterceptor } from 'src/interceptors/validator.interceptor';
import { CreateEmployeeContract } from '../contracts/employee.contracts';
import { ResultDto } from '../dtos/result.dto';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Controller('v1/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  get() {
    return new ResultDto(null, true, {}, null);
  }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateEmployeeContract()))
  async post(@Body() model: Employee) {
    const employee = await this.employeeService.create(
      new Employee(
        model.name,
        model.email,
        model.document,
        model.hiringDate,
        model.registrationNumber,
        model.role,
        model.password,
        model.active,
      ),
    );

    return new ResultDto(
      'Funcionário criado com sucesso!',
      true,
      employee,
      null,
    );
  }

  @Put()
  put(@Body() body) {
    return new ResultDto('Funcionário alterado com sucesso!', true, body, null);
  }
}
