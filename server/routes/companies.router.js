const express = require("express");
const companyRouter = express.Router();
const CompanyModel = require("../db/company.model");

companyRouter.get("/", async (req, res) => {
    const companies = await CompanyModel.find({});
    // res.send(companies)
    return res.json(companies)
})

module.exports = companyRouter