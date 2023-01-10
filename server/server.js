require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EquipmentModel = require("./db/equipment.model")

const employeeRouter = require("./routes/employees.router");


const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/employees", employeeRouter)


app.get("/api/equipments/", async (req, res) => {
  const characters = await EquipmentModel.find().sort({
    created: "desc"
  })
  return res.json(characters)
})

app.get("/api/robert", async (req, res) => {
  const allRoberts = await EmployeeModel.find({ name: /Robert/i })
  res.send(allRoberts);
})


app.get("/api/filter/", async (req, res) => {
  const filter = await EmployeeModel.find({
    $or: [
      { level: { $regex: req.query.search, $options: "i" } },
      { position: { $regex: req.query.search, $options: "i" } }
    ]
  })
  res.json(filter);
})

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
