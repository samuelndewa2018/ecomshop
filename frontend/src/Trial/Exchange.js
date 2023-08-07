import React, { useState } from "react";

const API_ACCESS_KEY = "4d2ffbc6de6f4095a29af6b747214ffc"; // Replace with your actual Open Exchange Rates API Access Key

const Exchange = () => {
  const [usdAmount, setUsdAmount] = useState("");
  const [kesAmount, setKesAmount] = useState(null);

  const convertUSDToKES = async (amountUSD) => {
    try {
      const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${API_ACCESS_KEY}`
      );
      const data = await response.json();
      console.log("Exchange rate data:", data);
      const exchangeRate = data.rates.KES;
      console.log("Exchange rate KES:", exchangeRate);
      const amountKES = amountUSD * exchangeRate;
      return amountKES;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return null;
    }
  };

  const handleConversion = async () => {
    const amountUSD = parseFloat(usdAmount);
    if (isNaN(amountUSD)) {
      alert("Please enter a valid numeric value for USD.");
      return;
    }

    const amountKES = await convertUSDToKES(amountUSD);
    console.log("Amount KES:", amountKES);
    if (amountKES !== null) {
      setKesAmount(amountKES.toFixed(2));
    } else {
      setKesAmount("N/A");
    }
  };

  return (
    <div>
      <label htmlFor="usd-amount">Enter amount in USD:</label>
      <input
        type="number"
        id="usd-amount"
        step="0.01"
        value={usdAmount}
        onChange={(e) => setUsdAmount(e.target.value)}
        required
      />
      <button onClick={handleConversion}>Convert to KES</button>
      <p>Equivalent amount in KES: {kesAmount}</p>
    </div>
  );
};

export default Exchange;
