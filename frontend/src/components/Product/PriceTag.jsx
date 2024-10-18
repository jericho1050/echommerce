import React from 'react';
import styled from 'styled-components';

const PriceTag = ({ price, tag }) => {
  return (
    <PriceContainer>
      <Tag>{tag}</Tag>
      <PriceWrapper>
        <Price>
          <CurrencySymbol>$</CurrencySymbol>
          <PriceValue>{price}</PriceValue>
        </Price>
      </PriceWrapper>
    </PriceContainer>
  );
};

const PriceContainer = styled.div`
  display: flex;
  margin-top: 18px;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Tag = styled.div`
  align-self: stretch;
  border-radius: 9px;
  background-color: #cff7d3;
  gap: 9px;
  font-size: 18px;
  color: #02542d;
  font-weight: 400;
  padding: 9px;
  @media (max-width: 991px) {
    white-space: normal;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: flex-end;
  color: #1e1e1e;
  font-weight: 700;
  justify-content: center;
  @media (max-width: 991px) {
    white-space: normal;
  }
`;

const Price = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  @media (max-width: 991px) {
    white-space: normal;
  }
`;

const CurrencySymbol = styled.span`
  font-size: 27px;
  letter-spacing: -0.54px;
`;

const PriceValue = styled.span`
  font-size: 54px;
  letter-spacing: -1.07px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

export default PriceTag;