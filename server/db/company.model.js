const mongoose = require("mongoose");
const { Schema } = mongoose;

const companySchema = new Schema({
    name: String,
    city: String,
    country: String,
})


module.exports = mongoose.model("Company", companySchema);
