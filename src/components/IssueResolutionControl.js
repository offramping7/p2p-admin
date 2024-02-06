// import "./OperatorSwitcher.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SERVER_URL } from "../utils/constants";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

function IssueResolutionControl({ offrampId }) {
  const [issueInfo, setIssueInfo] = useState({
    offrampId: "",
    problemDescription: "",
    hasProblem: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssueInfo().then((data) => {
      setIssueInfo(data);
    });
  }, []);

  const fetchIssueInfo = () => {
    const url = `${SERVER_URL}/operations/fetchOfframpExpandedInfo/${offrampId}`;
    return axios.get(url).then((res) => {
      return res.data;
    });
  };

  const submitToServer = () => {
    const url = `${SERVER_URL}/operations/solveProblem/${offrampId}`;
    if (!offrampId) {
      alert("Error: remittanceId must be defined in the url");
      return;
    }
    setLoading(true);
    axios
      .post(url)
      .then((res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        alert("there has been an error, please try again");
      });
  };
  if (loading == false) {
    return (
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Column</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key={"issueDescription"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {"issueDescription"}
                </TableCell>
                <TableCell align="right">
                  {issueInfo.problemDescription}
                </TableCell>
              </TableRow>

              <TableRow
                key={"hasProblem"}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {"issue still active:"}
                </TableCell>
                <TableCell align="right">
                  {issueInfo.hasProblem == true ? "Yes" : "No"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" onClick={submitToServer}>
          Issue Solved!
        </Button>
      </div>
    );
  } else {
    return <div>Be patient, the machines are thinking</div>;
  }
}

export default IssueResolutionControl;
