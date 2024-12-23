import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Image,
  Text,
  Title,
  Button,
  Grid,
  Box,
  Divider,
} from "@mantine/core";
import axios from "axios";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/product/${id}`
        );
        setProduct(response.data.response);
      } catch (err) {
        setError("Veri çekme hatası: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        { productId: product._id, quantity: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Ürün sepete eklenemedi:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container pl={150} className="product-container" size={"100%"}>
      <Grid span={12} gutter={30} m={50} p={20}>
        <Grid.Col span={2}>
          <Box className="thumbnail-image">
            <Image
              src={
                product.image
                  ? `http://localhost:3000${product.image}`
                  : "https://via.placeholder.com/150"
              }
              alt="Thumbnail"
            />
          </Box>
        </Grid.Col>

        <Grid.Col span={5}>
          <Image
            src={
              product.image
                ? `http://localhost:3000${product.image}`
                : "https://via.placeholder.com/600x600"
            }
            alt="Main Product"
            className="main-image"
          />
        </Grid.Col>

        <Grid.Col span={5} className="product-info-section" p={10} pl={20}>
          <Title pb={10} className="product-title">
            {product?.productName || "Product Name"}
          </Title>
          <Text pb={10} className="product-price">
            {product?.price || "0"} TL
          </Text>
          <Text pb={150} className="product-description">
            {product?.description || "No description available."}
          </Text>
          <Button className="add-to-cart-button" onClick={addToCart}>
            ADD TO CART
          </Button>
          <Divider my={10} />
          <Text className="product-policy">
            100% Original product. <br />
            Cash on delivery is available on this product. <br />
            Easy return and exchange policy within 7 days.
          </Text>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default DetailPage;
