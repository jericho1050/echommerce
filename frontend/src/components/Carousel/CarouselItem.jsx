import React from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const CarouselItem = React.forwardRef(({ imageUrl, title, isActive }, ref) => {
  return (
    <ItemWrapper ref={ref} isActive={isActive}>
      <ItemImage src={imageUrl} alt={title} loading="lazy" />
      <ItemContent>
        <StyledTypography variant="h4" fontWeight={800} textAlign="center">
          {title}
        </StyledTypography>
      </ItemContent>
    </ItemWrapper>
  );
});

CarouselItem.displayName = "CarouselItem";

const ItemWrapper = styled(Box)`
  display: flex;
  flex-direction: column;

  position: relative;
  min-width: 240px;
  overflow: hidden;
  color: var(--M3-white, #fff);
  letter-spacing: 0.29px;
  flex: 2;
  flex-basis: 0%;
  font: 500 31px/1.5 var(--Title-Medium-Font, Roboto);
`;

const ItemImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0.5em;
`;

const ItemContent = styled(Box)`
  position: relative;
  min-height: 413px;
  padding: 4.5em;

`;

const StyledTypography = styled(Typography)`
  position: absolute;
  top: 1em;
  left: 1em;
  color: white;
  font-size: 2rem; /* Make the text larger */
`;

export default CarouselItem;
