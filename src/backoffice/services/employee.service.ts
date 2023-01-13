import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePasswordDto } from '../dtos/employee/update-password.dto';
import { UpdateEmployeeDto } from '../dtos/employee/update.employee.dto';
import { Employee } from '../models/employee.model';
import { requiredFildsAlreadyExist } from '../shared/requiredFiled';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly model: Model<Employee>,
  ) {}

  async createEmployee(data: Employee) {
    for (const field of requiredFildsAlreadyExist(data)) {
      const fieldAlreadyExist = await this.model.find(field);

      if (fieldAlreadyExist.length > 0) {
        throw new HttpException(
          'Funcionário já cadastrado',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const employee = new this.model(data);
    return await employee.save();
  }

  async findAllEmployees() {
    return await this.model.find({}, '-password').exec();
  }

  async updateEmployee(
    document: string,
    data: UpdateEmployeeDto,
  ): Promise<Employee> {
    return await this.model.findOneAndUpdate({ document }, data);
  }

  async updatePassword(document: string, data: UpdatePasswordDto) {
    return await this.model.findOneAndUpdate({ document }, data);
  }
}
