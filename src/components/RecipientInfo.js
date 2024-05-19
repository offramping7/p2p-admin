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
import { SERVER_URL } from "../utils/constants";
import { Link } from "react-router-dom";

function RecipientInfo({ address }) {
  const [recipientData, setRecipientData] = useState({
    nickname: "",
    bankName: "",
    phoneNumber: "",
    email: "",
    bankSpecificFieldValue: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipientData();
  }, []);

  const fetchRecipientData = async () => {
    const url = `${SERVER_URL}/recipients/address/${address}`;
    return axios.get(url).then((res) => {
      const {
        nickname,
        bankName,
        phoneNumber,
        email,
        bankSpecificFieldValue,
      } = res.data;
      setRecipientData({
        nickname,
        bankName,
        phoneNumber,
        email,
        bankSpecificFieldValue,
      });
      setLoading(false);
    });
  };
  if (loading === true) {
    return <>Loading, please wait</>;
  }

  const goToUrl = (url) => {
    window.location.href = url;
  };

  return (
    <>
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
              key={"nickname"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"Name"}
              </TableCell>
              <TableCell align="right">{recipientData?.nickname}</TableCell>
            </TableRow>

            <TableRow
              key={"bankName"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"bankName"}
              </TableCell>
              <TableCell align="right">{recipientData?.bankName} {detectIsPhone(recipientData?.phoneNumber) && "SBP"}</TableCell>
            </TableRow>
            <TableRow
              key={"phoneNumber"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"Phone: "}
              </TableCell>
              <TableCell align="right">{recipientData?.phoneNumber}</TableCell>
            </TableRow>

        

            <TableRow
              key={"email"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {"email"}
              </TableCell>
              <TableCell align="right">{recipientData?.email}</TableCell>
            </TableRow>

            <TableRow
              key={"cardNumber"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {detectIsPhone(recipientData?.bankSpecificFieldValue) ? "SBP Phone Number" : "Card Number"}
              </TableCell>
              <TableCell align="right">
                {recipientData?.bankSpecificFieldValue || "empty"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="mt-5 w-100 mx-auto btn btn-primary">
        {!!recipientData?.bankSpecificFieldValue && (
          <button
            onClick={()=>goToUrl(
              "https://bincheck.io/details/" +
                recipientData?.bankSpecificFieldValue
            )}
          >
            Lookup Bin
          </button>
        )}
      </div>

      <div className="mt-5 w-50 mx-auto">
        {!!recipientData?.phoneNumber && (
          <button
            onClick={()=>goToUrl( "https://wa.me/" + recipientData.phoneNumber)}
          >
            Message on whatsapp
          </button>
        )}
      </div>
    </>
  );
}

export default RecipientInfo;



const detectIsPhone = (number) => {
  const processed = number.replace(/\D/g,'');
  if (processed.length < 16) {
    return true
  }
  return false
}