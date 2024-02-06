// import "./OperatorSwitcher.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../utils/constants";

function AddPhoto({ offrampId }) {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState();

  const onLinkChange = (e) => {
    setLink(e.target.value);
    e.preventDefault();
  };

  const onSubmit = () => {
    if (!link) return;
    setLoading(true);
    const url = SERVER_URL + "/operations/submitProof/" + offrampId;
    const payload = { paymentProofUrl: link };
    return axios
      .post(url, payload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  if (loading == false) {
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Input
          type="text"
          id="order-number"
          label="url"
          onChange={onLinkChange}
        />
        <Button variant="contained" onClick={onSubmit}>
          attach photo
        </Button>
      </div>
    );
  } else {
    return <div>Be patient, the machines are thinking</div>;
  }
}

export default AddPhoto;
