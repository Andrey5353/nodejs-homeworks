const express = require("express");
const router = express.Router();
const { validation } = require("../../middlewares/index");
const { contacts: ctrl } = require("../../controllers/index");
const { joiSchema } = require("../../models/contactModel");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validation(joiSchema), ctrl.addCont);

router.put("/:contactId", validation(joiSchema), ctrl.putCont);

router.patch("/:contactId/favorite", ctrl.patchCont);

router.delete("/:contactId", ctrl.delCont);

module.exports = router;
