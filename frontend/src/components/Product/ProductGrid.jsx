import React from "react";
import styled from "styled-components";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "./ProductCard";

// const productData = [
//   {
//     id: 1,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/4a2a257073c2d9c1d313149c6eea8a145c71ee499921518d99d4e52f7b907280?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     text: "Text",
//     price: "$0",
//   },
//   {
//     id: 2,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/6b3dabd113b746e760cebd8a6cd3380b76b612b89c059a89873feabc0a14b03e?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     text: "Text",
//     price: "$0",
//   },
//   {
//     id: 3,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/df65a7cd4cb1691509852acba505c17ce542230f7a22147ea1cec72d29c94c43?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     text: "Text",
//     price: "$0",
//   },
//   {
//     id: 4,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/ecf70e2c72b0590aa1d4fd27e990006d96ca9e2444550096e24d1c5ae1af370b?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     text: "Text",
//     price: "$0",
//   },
//   {
//     id: 5,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/dae56cb82265490f83c51456568619c4474cee4fc5d24d17438a164aa27c1a9f?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     text: "Text",
//     price: "$0",
//   },
//   {
//     id: 6,
//     image:
//       "https://cdn.builder.io/api/v1/image/assets/TEMP/5ea175ba0149f81f0fb551987f4e84c7460236ef03a769b3d8de556fd98a32b6?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7",
//     text: "Text",
//     price: "$0",
//   },
// ];

function ProductGrid({products}) {
  return (
      <StyledSection>
        <Typography variant="h1" component={"h1"} gutterBottom>JUST FOR YOU</Typography>
        <FilterBar>
          <SearchFilter>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search"
              slotProps={{ input: [{ endAdornment: <SearchIcon /> }] }}
            />
          </SearchFilter>
          <TagToggleGroup>
            <Button
              variant="contained"
              color="primary"
              startIcon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/09dadaedf34ac57f895e082d71fbf292cdd164c3765592ff38fccd679caeb5b2?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7"
                  alt=""
                />
              }
            >
              New
            </Button>
            <Button variant="outlined">Price ascending</Button>
            <Button variant="outlined">Price descending</Button>
            <Button variant="outlined">Rating</Button>
          </TagToggleGroup>
        </FilterBar>

        <Grid container spacing={1}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </StyledSection>

  );
}

const StyledSection = styled.section`
  border-radius: 8px;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  flex-basis: 34px;
  font: 17px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
  padding: 0 2.9em;
`;

const FilterBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 40px 59px;
  font-weight: 400;
  line-height: 1;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 52px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-bottom: 40px;
  }
`;

const SearchFilter = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  align-items: center;
  gap: 26px;
  color: rgba(179, 179, 179, 1);
  white-space: nowrap;
  justify-content: flex-start;
  width: 356px;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: initial;
  }
`;

const TagToggleGroup = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  align-items: flex-start;
  gap: 9px;
  color: rgba(117, 117, 117, 1);
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: auto 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default ProductGrid;
