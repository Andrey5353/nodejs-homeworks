const { Contact } = require("../../models/contactModel");

const delCont = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: "seccess",
      code: 200,
      message: "contact deleted",
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = delCont;
