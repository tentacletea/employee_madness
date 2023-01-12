// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: Number,
  position: String,
  created: {
    type: Date,
    default: Date.now,
  },
  present: Boolean,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
