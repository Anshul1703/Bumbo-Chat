import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import TermsPopup from "./consent/TermCondition";
import "../../CSS/Findchat.css";
import Chip from "@mui/material/Chip";



const CustomRadio = styled((props) => <Radio {...props} />)(({ theme }) => ({
  '&.Mui-checked': {
    color: "#00FFF7",
  },
  '&.Mui-checked .MuiSvgIcon-root': {
    fill: "#C165FF",
    borderColor: "#00FFF7",
  },
}));

const StyledFormControlLabel = styled(({ checked, ...props }) => (
  <FormControlLabel {...props} />
))(({ checked }) => ({
  ".MuiFormControlLabel-label": {
    color: checked ? "#00FFF7" : "#fff", // Cyan label if selected
    fontWeight: checked ? "600" : "400",
    transition: "color 0.3s ease",
    textAlign: "center",
    width: "100%",
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup?.value === props.value;

  }

  return <StyledFormControlLabel
    checked={checked}{...props} />;
}

MyFormControlLabel.protoTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  control: PropTypes.element,

}

export function FindChat() {

  const [matchType, setMatchType] = useState("random");
  const [interests, setInterests] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const handleChange = (event) => {
    setMatchType(event.target.value);
  };


  const handleStartChange = () => {
if(matchType === 'interest' && interests.length === 0 ){
  alert("Please add at least one interest before starting the chat.")
}else {
      setPopupOpen(true);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (!interests.includes(inputValue.trim())) {
        setInterests((prev) => [...prev, inputValue.trim()]);
      }
      setInputValue('');
    }
  };
  
  const handleAgree = () => {
    setPopupOpen(false);
    alert("Chat started! ");
  };

  const handleCancel = () => {
    setPopupOpen(false);
  };
  

    const handleDelete = (interestToDelete) => {
    setInterests((prev) => prev.filter((item) => item !== interestToDelete));
  };

  return (
    <>
      <div className="findChat-box">
        <div className="findChat-header">
          <h2>Bumbo Chat</h2>
          <br />
          <h4>Match type:</h4>
        </div>
        <div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
           <RadioGroup name="use-radio-group" value={matchType}     onChange={(e) => setMatchType(e.target.value)} >
  <MyFormControlLabel className="label" value="interest" label="Interest Based" control={<CustomRadio />} />
  <MyFormControlLabel className="label" value="random" label="Random" control={<CustomRadio />} />
</RadioGroup>

<div className="tags-input-container">
{matchType === "interest" && (
  <>
  <TextField
  value={inputValue}
   onChange={(e) => setInputValue(e.target.value)}
 variant="standard"
 onKeyDown={handleKeyPress}
    placeholder="Type an interest and press Enter"
    InputProps={{
      style: {
        color: "#fff",
        borderColor: "#C165FF",
        background: "transparent",
      },
    }}
    sx={{
      width: "100%",
      maxWidth: "400px",
      overflow: "hidden",
      textUnderlineOffset: "hidden",
      input: { color: "#fff", textAlign: "center" },
      
    }}
    required
  />
  <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              mt: 2,
              gap: 1,
            }}
          >
 {interests.map((interest, index) => (
              <Chip
                key={index}
                label={interest}
                onDelete={() => handleDelete(interest)}
                sx={{
                  background: '#C165FF',
                  color: '#fff',
                  fontWeight: 'bold',
                }}
              />
            ))}
          </Box> 
  
        </>
)}
</div>
<Button className="start-Button"
  onClick={handleStartChange}
sx={{
  border: "1px solid #C165FF",
  color: "#C165FF"}}
 variant="outlined">start chatting</Button>
          </Box>
        </div>
</div>

       <TermsPopup open={popupOpen} onAgree={handleAgree} onCancel={handleCancel} />

    </>
  )

}

export default FindChat