import HeroSection from "../components/HeroSection/HeroSection";
import ProductGrid from "../components/Product/ProductGrid";
import { fetchProducts, productsSelector } from "../slices/products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function Index() {
  const dispatch = useDispatch();
  const { products, loading, hasErrors } = useSelector(productsSelector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      {loading ? (
        <CircularProgress sx={{ display: "grid", placeContent: "center" }} />
      ) : hasErrors ? (
        <p style={{ textAlign: "center" }}>Unable to display products.</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </>
  );
}
