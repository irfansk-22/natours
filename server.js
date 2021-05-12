//This file is the entry point of our app where we will put all the things that are
//related to our server, db connectivity or env and not things about the express.

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

//catch UNCAUGHT EXCEPTIONS
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!💥 Shutting down...');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // Options to deal with the deprecation warnings.
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successful');
  });

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(
    `App is running on port ${PORT} in ${process.env.NODE_ENV} environment`
      .bgBlue
  );
});

//Handle UNHANDLED REJECTION
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
