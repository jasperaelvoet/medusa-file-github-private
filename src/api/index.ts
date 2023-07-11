import express from "express";
const { Router } = express;

const path = require("path");

export default (rootDirectory, options) => {
  const router = Router();

  router.use(`/${options.path}`, express.static(options.path));

  return router;
};
