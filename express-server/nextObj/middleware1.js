const middleware1 = (req, res, next) => {
  console.log("--- MIDDLEWARE 1---");

  // manipulation
  req.mst = "MetaSquareTech";

  if (Number(req.query.step) === 1) {
    res.send("--- MIDDLEWARE 1---");
  } else {
    next();
  }
};

module.exports = { middleware1 };
