import React from "react";
import styled from "styled-components";
import { Card, CardContent, Typography } from "@mui/material";

function ProductCard({ image, name, price, id }) {
  return (
    <StyledCard>
      <ProductImage src={image || default_image} alt={name} loading="lazy" />
      <CardContent>
        <Typography variant="body1">{name}</Typography>
        <Typography variant="h6">{price}</Typography>
      </CardContent>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  border-radius: 8px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1em;
  border: 1px solid rgba(217, 217, 217, 1);
  &:hover {
  cursor: pointer;
  transform: translateY(-4px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px; /* Set a fixed height for the images */
  object-fit: cover;
  object-position: center;
`;

export default ProductCard;

const default_image = "https://cdn.builder.io/api/v1/image/assets/TEMP/df65a7cd4cb1691509852acba505c17ce542230f7a22147ea1cec72d29c94c43?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7"