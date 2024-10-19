import styled from "styled-components";
import {
  TextField,
  Button,
  Typography,

} from "@mui/material";
import Grid from "@mui/material/Grid2";

import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "./ProductCard";



function ProductGrid({ products }) {
  return (
    <StyledSection>
      <Typography variant="h1" component={"h1"} pl={4} gutterBottom>
        JUST FOR YOU
      </Typography>
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

      <Grid container rowSpacing={8} columnSpacing={6} px={4}>
        {products.map((product) => (
          <Grid key={product.id} size={4}>
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
  max-width: 100%;
  font: 17px Inter, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
  }
  padding: 0 3em;
`;

const FilterBar = styled.div`
  padding: 0 2em;
  display: flex;
  align-items: center;
  gap: 1em 2.5em;
  font-weight: 400;
  line-height: 1;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2.5em;
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
