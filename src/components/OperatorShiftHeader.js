import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { SERVER_URL, OPERATORS } from "../utils/constants";

function OperatorShiftHeader() {
  const [currentOperator, setCurrentOperator] = useState("none");
  const [selectedOperator, setSelectedOperator] = useState("none");

  useEffect(() => {
    fetchCurrentOperator();
  }, []);

  const handleChange = (e) => {
    setSelectedOperator(e.target.value);
  };
  const handleClickSubmitNewOperator = () => {
    submitToServer();
  };
  const submitToServer = async () => {
    if (selectedOperator == "none") {
      console.log("Operator is not selected");
      return;
    }
    const url = `${SERVER_URL}/operators/makeOnDuty/${selectedOperator}`;
    // alert(selectedOperator);
    // return;
    await axios.post(url).then((res) => {
      alert(
        "Новый дежурный: " +
          selectedOperator +
          "\n Обновите страницу, чтобы увидеть изменения."
      );
      setCurrentOperator(selectedOperator);
    });
  };

  const fetchCurrentOperator = async () => {
    const url = `${SERVER_URL}/operators/fetchOnDuty`;
    axios
      .get(url)
      .then((res) => {
        return res.data;
      })
      .then((nickname) => setCurrentOperator(nickname));
  };

  return (
    <center>
      <div style={{ marginTop: "20px", marginBottom: "10px" }}>
        <h2>Сейчас дежурит: {currentOperator}</h2>
      </div>
      <select
        style={{ width: "100px", height: "30px", marginBottom: "10px" }}
        onChange={handleChange}
        value={selectedOperator}
      >
        <option disabled value={"none"}>
          {" "}
          -- select an new oncall --{" "}
        </option>
        {OPERATORS.map((nickname) => {
          return <option value={nickname}>{nickname}</option>;
        })}
      </select>
      <div>
        <Button
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "green",
            color: "white",
          }}
          onClick={handleClickSubmitNewOperator}
        >
          {" "}
          SUBMIT{" "}
        </Button>
      </div>
    </center>
  );
}

export default OperatorShiftHeader;
