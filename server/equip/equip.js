/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const equipments = require("./equipments.json");
const amounts = require("./amounts.json");
const EquipmentModel = require("../db/equipment.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEquipments = async () => {
  await EquipmentModel.deleteMany({});

  const equipmentsMap = equipments.map((equipment) => ({
    name: equipment.name,
    type: equipment.type,
    amount: pick(amounts),
  }));

  await EquipmentModel.create(...equipmentsMap);
  console.log("Characters created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipments();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
