const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //This only works on SAVE or CREATE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
});

//creating a instance method(correctPassword) which will be
//available to all documents of this user collection.

/**
 * The goal of this function(correctPassword) is to basically return
 * true or false.
 *
 * If the user entered password(i.e. candidatePassword) is
 * equal to the userPassword(this.password) which is saved
 * in db the function will return true otherwise false.
 *
 */
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

/**
 * In the above code we can elemintate the need of second parameter(userPassword)
 * as we have access to this.password even after setting it to
 * false in the model because we are specifically selecting it again in the login
 * function of authController so that's why we have got the access to the
 * this.password property.

 * userSchema.methods.correctPassword = async function (candidatePassword) {
 *   return await bcrypt.compare(candidatePassword, this.password);
 * };
 * 
 */

const User = mongoose.model('User', userSchema);

module.exports = User;
