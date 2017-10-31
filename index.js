import app from './app';
import express from 'express';
import {Schema} from 'mongoose';

export const employeeSchema = Schema({
  name: String,
  jobTitles: {type: [String]},
});

mongoose.Promse = global.promise;
const mongoConnection = mongoose
  .connect(mongoUri, {
    useMongoClient: true
});

const carRentalProducer = createProducer('carRentals');

// export default db => {
//   const app = express();
//   app.get('/', (req, res) => {
//     const Employee = db.model('Employee', employeeSchema);
//     Employee.find({}).exec((err, data) => res.json({data}));
//   });
//   return app;
// }

Promise.all([mongoConnection, carRentalProducer]).then(([db, carRentalMq]) => {
  const server = app(db, carRentalMq);
  server.list(3000, () => console.log('listening on port 3000'));
});