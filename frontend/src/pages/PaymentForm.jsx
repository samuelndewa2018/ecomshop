import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { server } from "../server";

const PaymentForm = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [stkloading, setStkLoading] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [validating, setValidating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [requestID, setRequestID] = useState("");
  const [callbackData, setCallbackData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("this is the", requestID);
    if (requestID && callbackData) {
      if (callbackData.TinyPesaID !== requestID) {
        setErrorMessage(null);
      }
      if (
        callbackData.TinyPesaID === requestID &&
        callbackData.ResultCode === 0
      ) {
        navigate("/order/success");
      } else if (
        callbackData.TinyPesaID === requestID &&
        callbackData.ResultCode === 1032
      ) {
        setMessage(null);
        setErrorMessage(
          "You cancelled the transaction or took too long to pay"
        );
      } else if (
        callbackData.TinyPesaID === requestID &&
        callbackData.ResultCode === 2001
      ) {
        setMessage(null);
        setErrorMessage("You entered wrong PIN");
      }
    }
  }, [requestID, callbackData]);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  let timeoutId;

  const fetchCallbackData = () => {
    axios
      .get(`${server}/tiny/get-callback-status`)
      .then((response) => {
        const callbackData = response.data;
        console.log(callbackData);
        setCallbackData(callbackData);

        if (callbackData) {
        }

        timeoutId = setTimeout(fetchCallbackData, 2000);
      })
      .catch((error) => {
        console.error(error);

        timeoutId = setTimeout(fetchCallbackData, 2000);
      });
  };
  setTimeout(() => {
    clearTimeout(timeoutId);
  }, 30000);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      phone: phone,
      amount: amount,
    };
    setLoading(true);
    await axios
      .post(`${server}/tiny/tinystk`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((response) => {
        setErrorMessage(null);
        setMessage("Payment Initialized Successfully");
        setSuccess(true);
        setRequestID(response.data.request_id);
        toast.success("Put PIN on your Phone");
        fetchCallbackData();
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setErrorMessage("Payment failed!");
      });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1>Mpesa Payment Form</h1>
      {message && (
        <p style={{ color: message.includes("failed") ? "red" : "green" }}>
          {message}
        </p>
      )}
      {errorMessage && (
        <p style={{ color: errorMessage.includes("failed") ? "green" : "red" }}>
          {errorMessage}
        </p>
      )}
      <div style={styles.formGroup}>
        <label htmlFor="phone" style={styles.label}>
          Phone Number
        </label>
        <input
          type="number"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          style={styles.input}
          required
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="amount" style={styles.label}>
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          style={styles.input}
          required
        />
      </div>
      <button
        disabled={loading || success || error || amount > 250000}
        type="submit"
        className="group relative w-full flex justify-center mb-4 py-3 px-4 border border-transparent text-[16px] font-[600] rounded-[5px] text-white !bg-[#12b32a] hover:!bg-[#12b32a] disabled:!bg-[#a8deb0] disabled:cursor-not-allowed"
      >
        {loading ? (
          <p className="flex">Processing...</p>
        ) : (
          <p className="">
            {success
              ? "Put PIN on your Phone"
              : error
              ? errorMessage
              : amount > 250000
              ? "Amount exceeds Mpesa limit"
              : "Pay Now"}
          </p>
        )}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f0f0f0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added box shadow
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  input: {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    width: "100%",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default PaymentForm;
