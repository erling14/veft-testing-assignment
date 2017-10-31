import express from 'express';
import {Schema} from 'mongoose';

export const employeeSchema = Schema({
  name: String,
  jobTitles: {type: [String]},
});

export default db => {
  const app = express();
  app.get('/', (req, res) => {
    const Employee = db.model('Employee', employeeSchema);
    Employee.find({}).exec((err, data) => res.json({data}));
  });
  return app;
}