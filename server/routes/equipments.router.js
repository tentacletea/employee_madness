const express = require("express");
const EquipmentModel = require("../db/equipment.model");
const equipmentRouter = express.Router();

equipmentRouter.get("/", async (req, res) => {
    const characters = await EquipmentModel.find().sort({
      created: "desc"
    })
    return res.json(characters)
  })

module.exports = equipmentRouter;

