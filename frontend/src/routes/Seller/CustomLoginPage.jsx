import { useState } from 'react';
import { useLogin, useNotify, Notification } from 'react-admin';
import {  Typography } from '@mui/material';
import { StyledBox, StyledFormLabel, StyledTextField, StyledButton } from './CustomComponents';


const CustomLoginPage = ({ theme }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = e => {
        e.preventDefault();
        login({ email, password }).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <>
        <Typography marginTop={'2em'} fontWeight="550"variant='h2' textAlign={'center'}>Seller Dashboard</Typography>
        <StyledBox component={"form"} onSubmit={handleSubmit}>
            <Typography marginBottom={'1em'} color="black" fontWeight={"600"} variant='h4'>Sign In</Typography>
            <StyledFormLabel htmlFor="email">Email</StyledFormLabel>
            <StyledTextField
                name="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <StyledFormLabel htmlFor="password">Password</StyledFormLabel>
            <StyledTextField
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <StyledButton type="submit">Login</StyledButton>
            <Notification />
        </StyledBox>
        </>
    );
};

export default CustomLoginPage;