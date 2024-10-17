/* eslint-disable no-unused-vars */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
  EchosMarketIcon,
} from "../CustomIcons";
// import TemplateFrame from './TemplateFrame';
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

export default function SignUp({ role }) {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCaustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const submit = useSubmit();
  // This code only runs on the client side, to determine the system color preference
  // React.useEffect(() => {
  //   // Check if there is a preferred mode in localStorage
  //   const savedMode = localStorage.getItem('themeMode');
  //   if (savedMode) {
  //     setMode(savedMode);
  //   } else {
  //     // If no preference is found, it uses system preference
  //     const systemPrefersDark = window.matchMedia(
  //       '(prefers-color-scheme: dark)'
  //     ).matches;
  //     setMode(systemPrefersDark ? 'dark' : 'light');
  //   }
  // }, []);

  // const toggleColorMode = () => {
  //   const newMode = mode === 'dark' ? 'light' : 'dark';
  //   setMode(newMode);
  //   localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  // };

  // const toggleCustomTheme = () => {
  //   setShowCustomTheme((prev) => !prev);
  // };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!firstName.value || firstName.value.length < 1) {
      setFirstNameError(true);
      setFirstNameErrorMessage("First mame is required.");
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }
    if (!lastName.value || lastName.value.length < 1) {
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
    if (firstNameError || emailError || passwordError) {
      return;
    }
    const formData = new FormData(event.currentTarget);
    formData.append("role", role);
    const data = Object.fromEntries(formData.entries());
    const { email, first_name, last_name, password } = data;

    try {
      const response = await fetch(
        import.meta.env.VITE_REST_API_URL + "/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name,
            last_name,
            password,
            role,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 500) {
          setEmailErrorMessage(
            "This email address has already been registered before."
          );
          setEmailError(true);
        } else {
          throw new Error("Registration failed");
        }
        return;
      }

      // If registration is successful, submit the form data
      submit(data, {
        method: "post",
      });
    } catch (error) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      console.error("Registration error:", error);
    }
  };

  return (
    <>
      {" "}
      <CssBaseline enableColorScheme />
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
              error={emailError}
              helperText={emailErrorMessage}
              color={passwordError ? "error" : "primary"}
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
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive updates via email."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign up
          </Button>
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

SignUp.propTypes = {
  role: propTypes.string,
};
