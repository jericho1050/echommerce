import React from "react";
import { Box, Button, Typography, Container, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import CategoryPanel from "./CategoryPanel";

import TrendingCarousel from "../Carousel/TrendingCarousel";
const StyledHeroSection = styled(Box)(({ theme }) => ({
  borderRadius: "0px 0px 0px 0px",
}));

const StyledGrid = styled(Grid2)(({ theme }) => ({
  gap: "1em",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: "0px",
  },
}));

// const StyledCarousel = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "flex-start",
//   color: theme.palette.common.white,
//   letterSpacing: "0.29px",
//   justifyContent: "flex-start",
//   font: "500 31px/1.5 Roboto, sans-serif",
//   [theme.breakpoints.down("md")]: {
//     marginTop: "32px",
//   },
// }));

// const StyledCarouselContent = styled(Box)(({ theme }) => ({
//   display: "flex",
//   minWidth: "240px",
//   minHeight: "5em",
//   width: "10em",
//   gap: "16px",
//   overflow: "hidden",
//   justifyContent: "flex-start",
//   flexWrap: "wrap",
//   padding: "16px 32px",
//   [theme.breakpoints.down("md")]: {
//     padding: "0 20px",
//   },
// }));

// const carouselItems = [
//   {
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/5a959eb972a3d93204e187c410a33728c6bc945266ba8fccbca69d806651bf3b?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     content: "Trending",
//   },
//   {
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/f56c721f5668e86fe6a42f7bc8d5923f82725acb8723c80d10b4c728247d9d14?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     content: "Sporting Goods",
//   },
//   {
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/cc113c130b9c0d367d6b46a83c9be1ff1da3e30e3df4e027ff7cef4c78cc75b7?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     content: "Beverages",
//   },
// ];

function HeroSection() {
  return (
    <StyledHeroSection component="section">
      <Container maxWidth="xl">
        <StyledGrid container>
          <Grid2 item xs={12} md={6}>
          </Grid2>
          <Grid2 item>
            <TrendingCarousel />
          </Grid2>
        </StyledGrid>
            <Box sx={{ display: "flex" }}>
              <CategoryPanel
                image="https://imgur.com/nta9pez.jpg"
                buttonText="APPARELS"
                backgroundColor="#FFFFFF"
                color="#3F71AF"
              />
              <CategoryPanel
                image="https://imgur.com/Vf6dwM2.jpg"
                buttonText="EQUIPMENTS"
                backgroundColor="#FFFFFF"
                color="#3F71AF"
              />
            </Box>
      </Container>
    </StyledHeroSection>
  );
}

export default HeroSection;
