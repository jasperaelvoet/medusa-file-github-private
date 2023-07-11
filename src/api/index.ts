import express from "express";
const { Router } = express;

const path = require("path");

export default () => {
  const router = Router();

  router.use("/images", express.static("images"));

  return router;
};
