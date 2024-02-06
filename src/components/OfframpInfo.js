import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../utils/constants";

function OfframpInfo({ offrampId, setCompleted }) {
  const [remitData, setRemitData] = useState({
    cryptoValue: 0.0,
    servicingCompleted: false,
    fundingCompleted: true,
    recipientAmount: 213,
    operator: null,
    recipient: {
      address: "ignore",
      nickname: "me",
      blockchain: "ignore",
      cryptocurrency: "ignore",
      bankName: "bank",
      cardNumber: "4444",
      phoneNumber: "+7985",
      currency: "RUB",
      email: "me@me.com",
    },
    hasProblem: false,
    problemDescription: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchOfframpData();
  }, []);

  const fetchOfframpData = async () => {
    if (!offrampId) {
      return;
    }
    const url = `${SERVER_URL}/operations/fetchOfframpExpandedInfo/${offrampId}`;
    try {
      const res = await axios.get(url);
      const { data } = res;
      console.log(data);
      setRemitData(data);
      setCompleted(data.completed);

      return;
    } catch (error) {
      console.log("err with fetch remit data:", error);
    }
  };

  const navigateToUser = () => {
    navigate(`/user/${remitData.username}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Column</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={"OfframpId"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"Offramp ID"}
            </TableCell>
            <TableCell align="right">{offrampId}</TableCell>
          </TableRow>
          <TableRow
            key={"status"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"Status"}
            </TableCell>
            <TableCell align="right">
              {remitData.servicingCompleted === true
                ? "finished"
                : "not finished"}
            </TableCell>
          </TableRow>
          <TableRow
            key={"cryptoReceived"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"Crypto Received"}
            </TableCell>
            <TableCell align="right">{remitData.cryptoValue}</TableCell>
          </TableRow>

          <TableRow
            key={" nickname"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {" nickname"}
            </TableCell>
            <TableCell align="right">{remitData.recipient.nickname}</TableCell>
          </TableRow>
          <TableRow
            key={"recipientBankName"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"recipientBankName"}
            </TableCell>
            <TableCell align="right">{remitData.recipient.bankName}</TableCell>
          </TableRow>
          <TableRow
            key={"recipientAmount"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"recipientAmount"}
            </TableCell>
            <TableCell align="right">{remitData.recipientAmount}</TableCell>
          </TableRow>
          <TableRow
            key={"recipientCurrency"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"recipientCurrency"}
            </TableCell>
            <TableCell align="right">{remitData.recipient.currency}</TableCell>
          </TableRow>
          <TableRow
            key={"recipienntPhoneNumber"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"recipienntPhoneNumber"}
            </TableCell>
            <TableCell align="right">
              {remitData.recipient.phoneNumber}
            </TableCell>
          </TableRow>
          <TableRow
            key={"recipientCardNumber"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"recipientCardNumber"}
            </TableCell>
            <TableCell align="right">
              {remitData.recipient.cardNumber}
            </TableCell>
          </TableRow>
          <TableRow
            key={"photoUrl"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"photoUrl"}
            </TableCell>
            <TableCell align="right">{remitData.paymentProofUrl}</TableCell>
          </TableRow>

          <TableRow
            onClick={() => navigateToUser()}
            key={"email"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"email"}
            </TableCell>
            <TableCell align="right">{remitData.recipient.email}</TableCell>
          </TableRow>

          <TableRow
            key={"hasProblem"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"hasProblem"}
            </TableCell>
            <TableCell align="right">
              {remitData.hasProblem == true ? "Yes" : "No"}
            </TableCell>
          </TableRow>

          <TableRow
            key={"problemDescription"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"problemDescription"}
            </TableCell>
            <TableCell align="right">{remitData.problemDescription}</TableCell>
          </TableRow>

          {/* {remitData.recipientOtherInfo &&
            Object.keys(remitData.recipientOtherInfo)
              .filter((x) => !excludeKeys.includes(x))
              .map((key) => {
                return (
                  <TableRow
                    key={`recipient_${key}`}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {`recipientInfo ${key}`}
                    </TableCell>
                    <TableCell align="right" sx={{ maxWidth: "100px" }}>
                      {JSON.stringify(remitData.recipientOtherInfo[key])}
                    </TableCell>
                  </TableRow>
                );
              })} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OfframpInfo;
