import {
  Button,
  Container,
  Grid,
  GridCol,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DropzoneButton from "./DropzoneButton";
import { useNavigate } from "react-router-dom";

const AddItemsPage = () => {
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    category: "",
    type: "",
    price: 0,
    stock: 0,
  });
  const [image, setImage] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([
    "Necklace",
    "Bracelet",
    "Ring",
    "Earring",
  ]);
  const [typeOptions, setTypeOptions] = useState(["Gold", "Silver", "Steel"]);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setProductData({ ...productData, [field]: value });
  };

  const handleFileDrop = (files) => {
    setImage(files[0]);
  };

  const handleSubmit = async () => {
    if (!productData.category) {
      alert("Lütfen bir kategori seçin.");
      return;
    }

    if (!productData.type) {
      alert("Lütfen bir ürün türü seçin.");
      return;
    }

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]); // category ID olarak backend'e gönderilir
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Ürün başarıyla eklendi!");
        setProductData({
          productName: "",
          description: "",
          category: "",
          type: "",
          price: 0,
          stock: 0,
        });
        setImage(null);
        navigate("/");
      } else {
        throw new Error("Product creation failed.");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Ürün eklenirken bir hata oluştu.");
    }
  };

  return (
    <Container pt={50}>
      <DropzoneButton onDrop={handleFileDrop} />
      <Text pt={20} fw={"bold"} fz={24}>
        Yeni Ürün Ekle
      </Text>
      <form>
        <Grid pt={20}>
          <GridCol span={12}>
            <Text>Ürün İsmi</Text>
            <TextInput
              placeholder="Ürün adını girin"
              value={productData.productName}
              onChange={(e) => handleChange("productName", e.target.value)}
            />
          </GridCol>

          <GridCol span={12}>
            <Text>Ürün Açıklaması</Text>
            <TextInput
              placeholder="Ürün hakkında"
              value={productData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <Select
              label="Kategori"
              placeholder="Kategori seçin"
              data={categoryOptions}
              value={productData.category}
              onChange={(value) => handleChange("category", value)} // ID olarak backend'e gönderilir
            />
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <Select
              label="Ürün Türü"
              placeholder="Tür seçin"
              data={typeOptions}
              value={productData.type}
              onChange={(value) => handleChange("type", value)}
            />
          </GridCol>

          <GridCol span={{ base: 12, md: 6 }}>
            <NumberInput
              placeholder="Fiyat"
              value={productData.price}
              min={0}
              onChange={(value) => handleChange("price", value)}
            />
          </GridCol>

          <GridCol span={{ base: 12, md: 6 }}>
            <NumberInput
              placeholder="Stok"
              value={productData.stock}
              min={0}
              onChange={(value) => handleChange("stock", value)}
            />
          </GridCol>
        </Grid>
      </form>
      <Container pt={20} pb={20}>
        <Button onClick={handleSubmit}>Ekle</Button>
      </Container>
    </Container>
  );
};

export default AddItemsPage;
