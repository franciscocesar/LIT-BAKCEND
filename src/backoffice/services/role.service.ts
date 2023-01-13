import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../models/role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private readonly model: Model<Role>) {}
  async create(data: Role): Promise<Role> {
    const roleAlreadyExist = await this.model.find({ name: data.name });

    if (roleAlreadyExist.length > 0) {
      throw new HttpException('Cargo já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const role = new this.model(data);

    return await role.save();
  }

  async findAll(): Promise<Role[]> {
    return await this.model.find({}, 'name').exec();
  }
}
