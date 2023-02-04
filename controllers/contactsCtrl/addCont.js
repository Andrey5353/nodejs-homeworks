const { Contact, joiSchema } = require("../../models/contactModel");

const addCont = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "Missing required name field";
      throw error;
    }

    const result = await Contact.create(req.body);
    res.status(200).json({
      status: "seccess",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addCont;
