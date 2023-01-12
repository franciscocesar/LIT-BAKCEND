import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { EmployeeController } from './controllers/employees.controller';
import { EmployeeSchema } from './schemas/employee.schema';
import { RoleSchema } from './schemas/role.schema';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Employee',
        schema: EmployeeSchema,
      },
      {
        name: 'Role',
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class BackofficeModule {}
