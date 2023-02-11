const express = require("express");
const router = express.Router();
const { auth, validation } = require("../../middlewares/index");
const { contacts: ctrl } = require("../../controllers/index");
const { joiSchema } = require("../../models/contactModel");

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", auth, ctrl.getById);

router.post("/", auth, validation(joiSchema), ctrl.addCont);

router.put("/:contactId", auth, validation(joiSchema), ctrl.putCont);

router.patch("/:contactId/favorite", auth, ctrl.patchCont);

router.delete("/:contactId", auth, ctrl.delCont);

module.exports = router;
