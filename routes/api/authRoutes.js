const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers/index");

router.post("/signup", ctrl.signup);

module.exports = router;
