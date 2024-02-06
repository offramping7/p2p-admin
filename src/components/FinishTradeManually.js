// import "./OperatorSwitcher.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../utils/constants";

function FinishTradeManually({ offrampId, nickname }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [valueCryptoUsed, setValueCryptoUsed] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const handleSetOrderNumber = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleSetValueCryptoUsed = (e) => {
    setValueCryptoUsed(e.target.value);
  };
  const submitToServer = () => {
    const url = `${SERVER_URL}/operations/markServicingCompleted/${offrampId}`;
    const payload = { orderNumber, nickname, valueCryptoUsed };
    if (!offrampId || !orderNumber || !nickname || !valueCryptoUsed) {
      alert("Error: offrampId must be defined in the url");
      return;
    }
    setLoading(true);
    axios
      .post(url, payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (loading == false) {
    ////type="number"
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <TextField
          id="order-number"
          label="order number"
          variant="outlined"
          value={orderNumber}
          onChange={handleSetOrderNumber}
        />
        <TextField
          id="value-crypto"
          label="USDT:"
          variant="outlined"
          type="number"
          value={valueCryptoUsed}
          onChange={handleSetValueCryptoUsed}
        />
        <Button variant="contained" onClick={submitToServer}>
          Submit
        </Button>
      </div>
    );
  } else {
    return <div>Be patient, the machines are thinking</div>;
  }
}

export default FinishTradeManually;
