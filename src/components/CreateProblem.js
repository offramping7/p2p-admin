// import "./OperatorSwitcher.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../utils/constants";

function CreateProblem({ offrampId }) {
  const [issueDescription, setIssueDescription] = useState("");
  // const [issueTitle, setIssueTitle] = useState("other");
  // const [issueTitleOptions, setIssueTitleOptions] = useState([
  //   "other",
  //   "more info required",
  // ]);
  const [loading, setLoading] = useState(false);

  const handleSetIssueDescription = (e) => {
    setIssueDescription(e.target.value);
  };

  // const handleIssueTitleChange = (e) => {
  //   setIssueTitle(e.target.value);
  // };

  const submitToServer = () => {
    console.log("server url");
    console.log(SERVER_URL);
    const url = `${SERVER_URL}/operations/createProblem/${offrampId}`;
    const payload = { problemDescription: issueDescription };

    setLoading(true);
    axios
      .post(url, payload)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        const msg = JSON.stringify(msg);
        alert(msg);
      });
  };
  if (loading == false) {
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        {/* <select
          style={{ width: "100px", height: "30px", marginBottom: "10px" }}
          onChange={handleIssueTitleChange}
          value={issueTitle}
        >
          {issueTitleOptions.map((issueTitleOption) => {
            return <option value={issueTitleOption}>{issueTitleOption}</option>;
          })}
        </select> */}
        <TextField
          id="issue-description"
          label="issue description"
          variant="outlined"
          value={issueDescription}
          onChange={handleSetIssueDescription}
        />
        <Button variant="contained" onClick={submitToServer}>
          Create Issue
        </Button>
      </div>
    );
  } else {
    return <div>Be patient, the machines are thinking</div>;
  }
}

export default CreateProblem;
