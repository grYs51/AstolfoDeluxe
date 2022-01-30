import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import react, { useState } from "react";

type Props = {
  open: boolean | undefined;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
  title: string;
};
export const TransitionAlert: React.FC<Props> = ({ title, open, setOpen }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {title}
        </Alert>
      </Collapse>
    </Box>
  );
};
