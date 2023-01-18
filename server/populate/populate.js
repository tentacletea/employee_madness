/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const companyList = require("./company.json")
const EmployeeModel = require("../db/employee.model");
const CompanyModel = require("../db/company.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});


  const employees = names.map((name) => {
    return {
      name,
      level: pick(levels),
      position: pick(positions),
      present: false,
      company: pick(companyList).name
    }
  })
  
  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populatecompanies = async () => {
  await CompanyModel.deleteMany({});

  const companies = companyList.map((company) => {
    return {
      name: company.name,
      city: company.city,
      country: company.country
    }
  })

  await CompanyModel.create(...companies);
  console.log("Companies created");
}

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();
  await populatecompanies();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
