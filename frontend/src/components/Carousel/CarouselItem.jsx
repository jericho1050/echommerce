import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@mui/material';

const CarouselItem = React.forwardRef(({ imageUrl, title, isActive }, ref) => {
  return (
    <ItemWrapper ref={ref} isActive={isActive}>
      <ItemImage src={imageUrl} alt={title} loading="lazy" />
      <ItemContent>
        <Typography variant="h6">{title}</Typography>
      </ItemContent>
    </ItemWrapper>
  );
});

const ItemWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  border-radius: 56px;
  position: relative;
  min-width: 240px;
  overflow: hidden;
  color: var(--M3-white, #fff);
  letter-spacing: 0.29px;
  flex: 1;
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
  max-height: 500px; /* Set a fixed height for the images */

`;

const ItemContent = styled(Box)`
  position: relative;
  min-height: 413px;
  padding: 5em;
`;

export default CarouselItem;