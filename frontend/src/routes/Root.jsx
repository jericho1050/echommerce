import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar/NavBar";
import HeroSection from "../components/HeroSection/HeroSection";
import { Outlet } from "react-router-dom";
import CustomizedSnackbars from "../components/Snackbar/Snackbar";

export default function Root() {
  return (
    <Box component={"main"}>
      <Navbar />
      <CustomizedSnackbars />
      <Container component={"section"} maxWidth="xl">
        <Outlet />
      </Container>
    </Box>
  );
}
