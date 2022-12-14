require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model")

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});


app.get("/api/equipments/", async (req, res) => {
  const characters = await EquipmentModel.find().sort({
    created: "desc"
  })
  return res.json(characters)
})

// app.post("/api/characters/", async (req, res, next) => {
//   const character = req.body;

//   try {
//     const saved = await EquipmentModel.create(character);
//     return res.json(saved);
//   } catch (err) {
//     return next(err);
//   }
// });


app.get("/api/robert", async (req, res) => {
  const allRoberts = await EmployeeModel.find({ name: /Robert/i })
  res.send(allRoberts);
})

app.get("/api/employees/", async (req, res) => {
  let findQuery;
  let sortQuery;

  if (req.query.search) {
    findQuery = {
      $or: [
        { level: { $regex: req.query.search, $options: "i" } },
        { position: { $regex: req.query.search, $options: "i" } },
      ]
    }
  } else {
    findQuery = {}
  }

  if (!req.query.sort) {
    sortQuery = {
      created: "desc"
    }
  } else {
    const key = req.query.sort.toLowerCase();
    sortQuery = {};
    sortQuery[key] = 1;

  }
  const employees = await EmployeeModel.find(findQuery).sort(sortQuery);

  return res.json(employees);
});

app.get("/api/filter/", async (req, res) => {
  // const levelFilter = await EmployeeModel.find( { level: {$regex : req.query.search , $options: "i"} } )
  // const positionFilter = await EmployeeModel.find( { position: {$regex : req.query.search , $options: "i"} } )
  // levelFilter.length > positionFilter.length 
  // ? res.json(levelFilter)
  // : res.json(positionFilter) 


  const filter = await EmployeeModel.find({
    $or: [
      { level: { $regex: req.query.search, $options: "i" } },
      { position: { $regex: req.query.search, $options: "i" } }
    ]
  })
  res.json(filter);
})

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

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
