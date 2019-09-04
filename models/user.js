const mongoose = require('mongoose');

//in order to make sure username is unique
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  passwordHash: String,
  weightMeasurements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Weight'
    }
  ]
});
userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
