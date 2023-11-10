const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/tinystk",
  catchAsyncErrors(async (req, res, next) => {
    async function initializePayment() {
      const url = "https://tinypesa.com/api/v1/express/initialize";
      const apiKey = "BVf5CweiOBs";

      const formData = new URLSearchParams();
      formData.append("amount", "1");
      formData.append("msisdn", "0712012113");

      const options = {
        method: "POST",
        body: formData,
        headers: {
          Apikey: apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log("TinyPesa response:", data.success);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }

    initializePayment();
  })
);

module.exports = router;
