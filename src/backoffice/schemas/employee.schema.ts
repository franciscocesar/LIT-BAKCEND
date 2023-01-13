import * as mongoose from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  email: {
    type: String,
    required: true,
    default: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  document: {
    type: String,
    required: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  hiringDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  registrationNumber: {
    type: Number,
    required: true,
    index: {
      unique: true,
    },
  },
  role: {
    type: String,
    required: true,
  },
});
