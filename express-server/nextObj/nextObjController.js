const nextObjController = (req, res, next) => {
  console.log("--- nextObjController---");
  if (Number(req.query.step) === 3) {
    res.send("--- nextObjController---");
  } else {
    res.send("------ERROR-------");
  }
};

module.exports = { nextObjController };
