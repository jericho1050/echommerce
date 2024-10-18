import { Box } from "@mui/material";
import Navbar from "../components/Navbar/NavBar";
import HeroSection from "../components/HeroSection/HeroSection";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Box component={"main"}>
      <Navbar />
      <Box component={"section"}>
        <Outlet />
      </Box>
    </Box>
  );
}
