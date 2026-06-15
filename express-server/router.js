const { Router } = require("express");
const { middleware1, middleware2, nextObjController } = require("./nextObj");

const nextObjRouter = Router();

nextObjRouter.get(
  "/nextObj",
  middleware2,
  middleware2,
  middleware1,
  nextObjController,
);

module.exports = { nextObjRouter };
