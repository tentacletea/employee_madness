const express = require("express");
const EmployeeModel = require("../db/employee.model");

const employeeRouter = express.Router();

employeeRouter.get("/", async (req, res) => {
    let findQuery = {};
    let sortQuery = {};

    if (req.query.search) {
        findQuery = {
            $or: [
                { level: { $regex: req.query.search, $options: "i" } },
                { position: { $regex: req.query.search, $options: "i" } },
            ]
        }
    }

    if (!req.query.sort) {
        sortQuery = {
            created: "desc"
        }
    } else {
        const key = req.query.sort.toLowerCase();
        sortQuery[key] = 1;
    }

    const employees = await EmployeeModel.find(findQuery).sort(sortQuery);

    return res.json(employees);
});

employeeRouter.use("/:id", async (req, res, next) => {
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

employeeRouter.get("/:id", (req, res, next) => {
    if (req.employee) {
        return res.json(req.employee);
    }
    next();
});

employeeRouter.patch("/:id", async (req, res, next) => {
    const employee = req.body;
    try {
        const updated = await req.employee.set(employee).save();
        return res.json(updated);
    } catch (err) {
        return next(err);
    }
});

employeeRouter.delete("/:id", async (req, res, next) => {
    try {
        const deleted = await req.employee.delete();
        return res.json(deleted);
    } catch (err) {
        return next(err);
    }
});

employeeRouter.post("/", async (req, res, next) => {
    const employee = req.body;

    try {
        const saved = await EmployeeModel.create(employee);
        return res.json(saved);
    } catch (err) {
        return next(err);
    }
});

module.exports = employeeRouter;