import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { OPERATORS } from "../utils/constants";

const PickOperator = ({ handleClickNickname }) => {
  return (
    <Stack spacing={2} direction="column">
      {OPERATORS.map((nickname) => (
        <Button
          variant="contained"
          onClick={function handleClick() {
            handleClickNickname(nickname);
          }}
        >
          {nickname}
        </Button>
      ))}
    </Stack>
  );
};

export default PickOperator;
