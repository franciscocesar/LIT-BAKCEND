import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  roles: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        index: {
          unique: true,
        },
      },
    },
  ],
});
