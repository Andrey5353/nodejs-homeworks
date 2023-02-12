const getCurrent = async (req, res, next) => {
  const { name, email } = req.user;
  res.status(200).json({
    status: "seccess",
    code: 200,
    data: {
      user: {
        name,
        email,
      },
    },
  });
};

module.exports = getCurrent;
