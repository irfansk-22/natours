//This file is the entry point of our app where we will put all the things that are 
//related to our server, db connectivity or env and not things about the express.

const app = require('./app');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});