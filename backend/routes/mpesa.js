const express = require("express");
const router = express.Router();
const {
  // token,
  stkPush,
  stkpushquery,
  stkCallback,
  withdrawal,
} = require("../controller/mpesa");

const callback_route = process.env.CALLBACK_ROUTE;

// router.post("/stk", token, stkPush);
// router.post("/stkpushquery", token, stkpushquery);
// router.post("/callback", stkCallback);
// router.get("/withdral", withdrawal);

module.exports = router;
