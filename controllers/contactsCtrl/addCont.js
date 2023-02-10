const { Contact, joiSchema } = require("../../models/contactModel");

const addCont = async (req, res, next) => {
  try {
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
