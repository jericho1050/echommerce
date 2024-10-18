import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, IconButton, TextField } from "@mui/material";
import ProductImage from "./ProductImage";
import PriceTag from "./PriceTag";
import AccordionSection from "./AccordionSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, productSelector } from "../../slices/product";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product, loading, hasErrors } = useSelector(productSelector);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return loading ? (
    <p>Loading product...</p>
  ) : hasErrors ? (
    <p>Cannot display product...</p>
  ) : (
    <PageContainer>
      <ProductSection>
        <ProductImage
          src={
            product.image ||
            "https://cdn.builder.io/api/v1/image/assets/TEMP/a9c735e4009d1289f3f12b9765e1e94752407306dc865ae6bb57324069a12341?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7"
          }
          alt={product.name || "Product"}
        />
        <ProductDetails>
          <ProductHeader>
            <ProductTitle>{product.name || "Text Heading"}</ProductTitle>
            <PriceTag
              price={product.price || 50}
              tag={product.category || "10% OFF if you buy 50 or more"}
            />
          </ProductHeader>
          <ProductDescription>
            {product.description || "Text"}
          </ProductDescription>
          <ProductOptions>
            <TextField
              label="Quantity"
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              slotProps={{ htmlInput: [{ min: 1 }] }}
              variant="outlined"
            />
          </ProductOptions>
          <AddToCartButton variant="contained" color="primary">
            Purchase
          </AddToCartButton>
          <AccordionSection
            title={product.accordionTitle || "Title"}
            content={
              product.accordionContent ||
              "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
            }
          />
        </ProductDetails>
        <FavoriteButton aria-label="Add to favorites">
          <img
            src={
              product.favoriteImageUrl ||
              "https://cdn.builder.io/api/v1/image/assets/TEMP/0adcf3e79f4aad7b2b2a91eba5405c892784bc3b14daa45d304fa35fea8321b0?placeholderIfAbsent=true&apiKey=f172625736fa41d8974274ecdf85e2d7"
            }
            alt="Favorite"
          />
        </FavoriteButton>
      </ProductSection>
    </PageContainer>
  );
};

const PageContainer = styled.main`
  background-color: #fff;
  display: flex;
  min-width: 272px;
  flex-direction: column;
  justify-content: center;
  padding: 72px;
  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

const ProductSection = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 40px 72px;
  justify-content: flex-start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ProductDetails = styled.article`
  z-index: 0;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  font-family: Inter, sans-serif;
  justify-content: center;
  flex: 1;
  flex-basis: 18px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ProductHeader = styled.header`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ProductTitle = styled.h1`
  width: 100%;
  font-size: 27px;
  color: #1e1e1e;
  font-weight: 600;
  letter-spacing: -0.54px;
  line-height: 1.2;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ProductDescription = styled.p`
  flex: 1;
  margin-top: 18px;
  width: 100%;
  font-size: 18px;
  color: #757575;
  font-weight: 400;
  line-height: 1.4;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ProductOptions = styled.div`
  display: flex;
  margin-top: 27px;
  width: 100%;
  align-items: center;
  gap: 27px;
  font-size: 18px;
  color: #1e1e1e;
  font-weight: 400;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AddToCartButton = styled(Button)`
  && {
    align-self: stretch;
    border-radius: 9px;
    background-color: #3f71af;
    margin-top: 27px;
    width: 100%;
    gap: 9px;
    overflow: hidden;
    font-size: 18px;
    color: #f5f5f5;
    font-weight: 400;
    line-height: 1;
    padding: 14px;
    border: 1px solid #2c2c2c;
    @media (max-width: 991px) {
      max-width: 100%;
    }
  }
`;

const FavoriteButton = styled(IconButton)`
  && {
    border-radius: 36px;
    background-color: #3f71af;
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: center;
    width: 40px;
    height: 40px;
    left: 12px;
    top: 12px;
    padding: 0 9px;
    border: 1px solid #2c2c2c;
  }
`;

export default ProductPage;
