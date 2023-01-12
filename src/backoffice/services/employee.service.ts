import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../models/employee.model';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel('Employee') private readonly model: Model<Employee>,
  ) {}
  async create(data: Employee) {
    const employee = new this.model(data);
    return await employee.save();
  }
}
