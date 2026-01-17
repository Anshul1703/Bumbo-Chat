import React from 'react';
// import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import "../../../CSS/TermCondition.css";

const TermsPopup = ({ open, onAgree, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Terms & Conditions</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: "#555" }}>
          By continuing, you agree to the Terms & Conditions of Bumbo Chat.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="error">Cancel</Button>
        <Button onClick={onAgree} sx={{ color: "#C165FF" }}>I Agree</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsPopup;