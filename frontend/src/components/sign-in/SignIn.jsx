/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import getSignInSideTheme from '../theme/getSignInSideTheme';
import SignInCard from './SignInCard';
import Content from '../sign-up/Content';
import TemplateFrame from './TemplateFrame';
import { redirect } from 'react-router-dom';

export async function action({ request }) {
  const data = await request.json();

  if (data.role === 'seller') {
    return redirect('/seller');
  } else {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    return redirect('/');
  }
}

export default function SignIn() {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Stack
        sx={{
          justifyContent: 'center',
          gap: { xs: 6, sm: 12 },
          p: { xs: 2, sm: 4 },
          m: 'auto',
        }}
      >
        <SignInCard />
      </Stack>
    </>
  );
}

// The following code is used to implement the dark mode toggle feature in the SignInSide component.

// const [mode, setMode] = React.useState('light');
// const [showCustomTheme, setShowCustomTheme] = React.useState(true);
// const defaultTheme = createTheme({ palette: { mode } });
// const SignInSideTheme = createTheme(getSignInSideTheme(mode));
// // This code only runs on the client side, to determine the system color preference
// React.useEffect(() => {
//   // Check if there is a preferred mode in localStorage
//   const savedMode = localStorage.getItem('themeMode');
//   if (savedMode) {
//     setMode(savedMode);
//   } else {
//     // If no preference is found, it uses system preference
//     const systemPrefersDark = window.matchMedia(
//       '(prefers-color-scheme: dark)',
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
