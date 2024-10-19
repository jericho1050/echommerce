import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, authSelector } from "../../slices/auth";
import {
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Divider,
  Link,
} from "@mui/material";
import { GoogleIcon, FacebookIcon } from "../CustomIcons";
import { styled } from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import propTypes from "prop-types";
import { useSubmit } from "react-router-dom";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignUpCard({ role }) {
  const dispatch = useDispatch();
  const { status, error } = useSelector(authSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const submit = useSubmit();

  const validateInputs = () => {
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!firstName || firstName.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage("First name is required.");
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }

    if (!lastName || lastName.length < 1) {
      setLastNameError(true);
      setLastNameErrorMessage("Last name is required.");
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const action = await dispatch(
      register({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        role,
      })
    );

    if (register.fulfilled.match(action)) {
      submit(
        { role: role },
        { method: "post", action: "/signup",}
      );
    }
  };

  return (
    <>
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up as <strong>{role}</strong>
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box component={"div"} display={"flex"} columnGap={2}>
            <FormControl>
              <FormLabel htmlFor="first-name">First name</FormLabel>
              <TextField
                autoComplete="first-name"
                name="first_name"
                required
                id="first-name"
                placeholder="e.g., Jon"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={firstNameError}
                helperText={firstNameErrorMessage}
                color={firstNameError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="last-name">Last name</FormLabel>
              <TextField
                autoComplete="last-name"
                name="last_name"
                required
                id="last-name"
                placeholder="e.g., now"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={lastNameError}
                helperText={lastNameErrorMessage}
                color={lastNameError ? "error" : "primary"}
              />
            </FormControl>
          </Box>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText={emailErrorMessage}
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
          />
          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
          {status === "loading" && <Typography>Loading...</Typography>}
          {status === "failed" && (
            <Typography color="error">{error}</Typography>
          )}
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
              <Link href="/signin" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </span>
          </Typography>
        </Box>
        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Google")}
            startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign up with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Sign up with Facebook
          </Button>
        </Box>
      </Card>
    </>
  );
}

SignUpCard.propTypes = {
  role: propTypes.string,
};
