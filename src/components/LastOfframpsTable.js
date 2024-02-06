import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SERVER_URL } from "../utils/constants";

const LastOfframpsTable = ({ handlePickRow }) => {
  const [hideFinished, setHideFinished] = useState(false);
  const [showOnlyProblematic, setShowOnlyProblematic] = useState(false);
  const [allOfframps, setAllOfframps] = useState([
    {
      offrampId: "demo",
      servicingCompleted: false,
      recipient: {
        nickname: "birdeme",
      },
    },
  ]);
  const [filteredOfframps, setFilteredOfframps] = useState(allOfframps);

  useEffect(() => {
    fetchLast100Offramps();
  }, []);

  const handleRowClick = (val) => {
    handlePickRow(val);
  };
  const handleChangeHideFinished = () => {
    setHideFinished(!hideFinished);
  };
  const handleChangeHideProblematic = () => {
    setShowOnlyProblematic(!showOnlyProblematic);
  };

  useEffect(() => {
    const newFilteredOfframps = allOfframps.filter((offramp) => {
      if (hideFinished === true) {
        return !offramp.servicingCompleted;
      } else {
        return true;
      }
    });
    setFilteredOfframps(newFilteredOfframps);
  }, [allOfframps, hideFinished]);

  useEffect(() => {
    const newFilteredOfframps = allOfframps.filter((offramp) => {
      if (showOnlyProblematic === true) {
        return offramp.hasProblem;
      } else {
        return true;
      }
    });
    setFilteredOfframps(newFilteredOfframps);
  }, [allOfframps, showOnlyProblematic]);

  const fetchLast100Offramps = async () => {
    const url = `${SERVER_URL}/operations/fetchLast100`;
    return axios
      .get(url)
      .then((res) => {
        console.log("all the data!", res.data);
        setAllOfframps(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>offrampId</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">recipient nickname</TableCell>
              <TableCell align="right">recipient amount</TableCell>
              <TableCell align="right">recipient currency</TableCell>
              <TableCell align="right">recipient bank</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOfframps.map((row) => (
              <TableRow
                onClick={() => handleRowClick(row._id)}
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell align="right">
                  {row.servicingCompleted === true
                    ? "complete!"
                    : "not complete"}
                </TableCell>
                <TableCell align="right">{row.recipient.nickname}</TableCell>
                <TableCell align="right">{row.recipientAmount}</TableCell>
                <TableCell align="right">{row.recipient.currency}</TableCell>
                <TableCell align="right">{row.recipient.bankName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleChangeHideFinished}>
        {hideFinished === true ? "show all" : "show only unfinished"}
      </Button>
      <Button onClick={handleChangeHideProblematic}>
        {showOnlyProblematic === true ? "show all" : "show only problematic"}
      </Button>
    </>
  );
};

export default LastOfframpsTable;
