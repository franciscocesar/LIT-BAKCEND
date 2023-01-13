import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { EmployeeController } from './controllers/employees.controller';
import { RoleController } from './controllers/role.controller';
import { EmployeeSchema } from './schemas/employee.schema';
import { RoleSchema } from './schemas/role.schema';
import { EmployeeService } from './services/employee.service';
import { RoleService } from './services/role.service';

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
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [EmployeeController, RoleController],
  providers: [EmployeeService, RoleService],
})
export class BackofficeModule {}
