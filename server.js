//This file is the entry point of our app where we will put all the things that are
//related to our server, db connectivity or env and not things about the express.

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(app.get('env'));
/**
 * environment variables are global variables that are used to
 * define the enviornment in which a node app is running.
 * This one is set by express but nodejs itself actaully sets
 * a lot of environment variables. example below
 */

// console.log(process.env);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
