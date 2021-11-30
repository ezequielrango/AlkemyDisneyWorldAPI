const express = require("express");
const router = express.Router();

const validations = require("../validations/relateValidator");

const controller = require("../controllers/relationController");

router
    .post("/",validations,controller.add)
    .delete("/",validations,controller.delete)

module.exports = router;