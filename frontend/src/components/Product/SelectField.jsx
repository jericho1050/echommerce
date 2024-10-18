import React from 'react';
import styled from 'styled-components';
import { Select, MenuItem } from '@mui/material';

const SelectField = ({ label, value }) => {
  return (
    <SelectWrapper>
      <Label>{label}</Label>
      <StyledSelect value={value} displayEmpty>
        <MenuItem value="">{value}</MenuItem>
      </StyledSelect>
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  @media (max-width: 991px) {
    white-space: normal;
  }
`;

const Label = styled.label`
  line-height: 1.4;
  margin-bottom: 9px;
`;

const StyledSelect = styled(Select)`
  && {
    border-radius: 9px;
    background-color: #fff;
    min-width: 272px;
    min-height: 45px;
    width: 100%;
    line-height: 1;
    padding: 14px 14px 14px 18px;
    border: 1px solid #d9d9d9;
    @media (max-width: 991px) {
      white-space: normal;
    }
  }
`;

export default SelectField;