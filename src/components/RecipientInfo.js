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
import {
    Link
  } from "react-router-dom"



function RecipientInfo({ address }) {
  const [recipientData, setRecipientData] = useState({
    nickname: "",
    bankName: "",
    phoneNumber: "",
    email: "",
    bankSpecificFieldsMap: {cardNumber:"",yooMoneyWalletNumber:""},
  });
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    fetchRecipientData();
  }, []);

  const fetchRecipientData = async () => {
   
    const url = `${SERVER_URL}/recipients/address/${address}`;
    return axios.get(url).then((res)=>{
      const data = res.data
      setRecipientData(data)
      setLoading(false)
    })
  };
  if (loading === true) {
    return (<>Loading, please wait</>)
  }

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
            <TableCell align="right">{recipientData?.bankName}</TableCell>
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
              {"Card Number"}
            </TableCell>
            <TableCell align="right">
              {recipientData?.bankSpecificFieldsMap.cardNumber || "empty"}
            </TableCell>
          </TableRow>
          <TableRow
            key={"yooMoneyWalletNumber"}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {"Yoomoney wallet number"}
            </TableCell>
            <TableCell align="right">
            {recipientData?.bankSpecificFieldsMap.yooMoneyWalletNumber || "empty"}
            </TableCell>
          </TableRow>
         
        </TableBody>
      </Table>
    </TableContainer>
    <div className="mt-5 w-50 mx-auto">
    {
        !!recipientData?.bankSpecificFieldsMap?.cardNumber && (
                <Link  to={{ pathname: "https://bincheck.io/details/"+recipientData?.bankSpecificFieldsMap?.cardNumber.slice(0,8) }} target="_blank" >
                        Lookup Bin
                    </Link>
        )
    }
    </div>

    <div className="mt-5 w-50 mx-auto">
    {
        !!recipientData?.bankSpecificFieldsMap?.cardNumber && (
                <a  href={"https://bincheck.io/details/"+recipientData?.bankSpecificFieldsMap?.cardNumber.slice(0,8) } >
                        Lookup Bin
                    </a>
        )
    }
    </div>
   
    

<div className="mt-5 w-50 mx-auto">
{!!recipientData?.phoneNumber && (<Link to={{ pathname: "https://wa.me/"+recipientData.phoneNumber  }} target="_blank">
        Message on whatsapp
    </Link>)}
</div>
    
    </>
  );
}

export default RecipientInfo;
