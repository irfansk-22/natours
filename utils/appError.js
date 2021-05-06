class AppError extends Error {
  constructor(message, statusCode) {
    //message is the only parameter that built in error handler accepts
    //it will also set message property
    super(message);

    this.statusCode = statusCode;
    /**
     * Here we are trying to check if the statusCode statrs with
     * 4 or 5 in order to determine the type of error, and accordingly
     * we will set the status.
     *
     * Basically we could have passed another property in the construtor
     * namely status but we are doing this way to save some effort in
     * passing status message in the error every time we create a new error
     * object ;)
     */
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    /**
     * setting a new isOperational property, this property will set
     * to each error object created using this class.
     *
     * this will help distinguish operational errors to other
     * unexpected errors caused because of bugs in the code or a
     * bug in any package that we require in our code.
     */
    this.isOperational = true;

    //This will basically show us where the error happened
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
