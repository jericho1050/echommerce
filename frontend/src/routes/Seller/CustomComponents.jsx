import { Button, Input, Box, TextField, FormLabel, Typography } from '@mui/material';
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)`
    padding: 2.5em 3em; 
    background-color: #f3f3f3;
    border-radius: 0.5em;
    max-width: 500px;
    height: auto;
    margin: 4em auto;
`; 

const StyledFormLabel = styled(FormLabel)`
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 0.5em;
    display: block;
    color: black;
`   


const StyledTextField = styled(Input)`
    background-color: #e0e0e0; /* Light gray background color */
    padding: 0.5em;
    border-radius: 0.25em;
    width: 100%;
    margin-bottom: 1em;
    color: black
`;

const StyledButton = styled(Button)`
    margin-top: 1em;
    background-color: #3F71AF;
    color: white;
    padding: 0.8em 1.6em;
    font-size: 1em;
    font-weight: 600;
    
`;


export { StyledBox, StyledFormLabel, StyledTextField, StyledButton };