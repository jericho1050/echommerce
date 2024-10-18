import React from 'react';
import styled from 'styled-components';

const ProductImage = ({ src, alt }) => {
  return <StyledImage loading="lazy" src={src} alt={alt} />;
};

const StyledImage = styled.img`
  aspect-ratio: 1.11;
  object-fit: contain;
  object-position: center;
  width: 100%;
  align-self: stretch;
  z-index: 0;
  min-width: 240px;
  flex: 1;
  flex-basis: 18px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default ProductImage;