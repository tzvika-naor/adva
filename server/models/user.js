const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    isAdmin: { type: Boolean, default: false },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String }
})
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);



