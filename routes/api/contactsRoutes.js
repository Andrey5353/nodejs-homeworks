const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers/index");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addCont);

router.put("/:contactId", ctrl.putCont);

router.patch("/:contactId/favorite", ctrl.patchCont);

router.delete("/:contactId", ctrl.delCont);

module.exports = router;
