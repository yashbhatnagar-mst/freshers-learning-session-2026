const middleware2 = (req, res, next) => {
  console.log("--- MIDDLEWARE 2---");
  if (Number(req.query.step) === 2) {
    res.send("--- MIDDLEWARE 2---");
  } else {
    next();
  }
};

module.exports = { middleware2 };
