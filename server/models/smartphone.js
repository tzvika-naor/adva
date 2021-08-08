const mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const smartPhoneSchema = new Schema({
    phoneModel: { type: String, required: true },
    brand: { type: String, required: true },
    display: { type: String, required: true },
    processor: { type: String, required: true },
    frontCamera: { type: String, required: true },
    rearCamera: { type: String, required: true },
    batteryCapacity: { type: String },
    image: { type: String, required: true },
    price: { type: Number  }
    
})
// Apply the uniqueValidator plugin to userSchema.
// smartPhoneSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Smartphone", smartPhoneSchema);
















