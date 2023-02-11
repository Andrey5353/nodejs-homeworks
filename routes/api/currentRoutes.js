const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/index");
const { current: ctrl } = require("../../controllers/index");

router.get("/current", auth, ctrl.getCurrent);

module.exports = router;
