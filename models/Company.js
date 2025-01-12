const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  name: { type: String, required: true },
  nit: String,
  phone: String,
  address: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
