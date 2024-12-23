import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Group,
  Container,
  Title,
  Image,
  Modal,
  TextInput,
  Select,
  NumberInput,
  Grid,
  GridCol,
  Text,
  FileInput,
} from "@mantine/core";
import axios from "axios";

function ListItemsPage() {
  const [products, setProducts] = useState([]);

  const [editModalOpened, setEditModalOpened] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productData, setProductData] = useState({
    image: "",
    productName: "",
    description: "",
    category: "",
    type: "",
    price: 0,
    stock: 0,
  });

  const [newImage, setNewImage] = useState(null);

  const [categoryOptions, setCategoryOptions] = useState([
    "necklace",
    "ring",
    "earring",
    "bracelet",
  ]);
  const [typeOptions, setTypeOptions] = useState(["gold", "silver", "steel"]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/product"
      );
      if (res.data.success) {
        setProducts(res.data.response);
      } else {
        console.error("Sunucu hata döndürdü:", res.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/category/categories"
      );
      const options = data.categories.map((cat) => ({
        value: cat._id,
        label: cat.categoryName,
      }));
      setCategoryOptions(options);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/product/${id}`);
      setProducts((current) => current.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err.message);
    }
  };

  const handleEdit = (id) => {
    const product = products.find((p) => p._id === id);
    if (!product) return;

    setSelectedProduct(product);
    setProductData({
      productName: product.productName || "",
      description: product.description || "",
      category: product.category?._id || "",
      type: product.type || "",
      price: product.price || 0,
      stock: product.stock || 0,
    });

    setNewImage(null);
    setEditModalOpened(true);
  };

  const handleChange = (field, value) => {
    setProductData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    try {
      const formData = new FormData();

      Object.keys(productData).forEach((key) => {
        formData.append(key, productData[key]);
      });

      if (newImage) {
        formData.append("image", newImage);
      }
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      const response = await axios.put(
        `http://localhost:3000/api/product/update/${selectedProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert("Ürün başarıyla güncellendi!");
        setEditModalOpened(false);
        setSelectedProduct(null);

        fetchProducts();
      } else {
        throw new Error("Product update failed.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Ürün güncellenirken bir hata oluştu.");
    }
  };

  return (
    <Container mt="xl">
      <Title order={2} mb="md">
        Admin Paneli - Ürün Listesi
      </Title>

      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Görsel</th>
            <th>Ürün Adı</th>
            <th>Açıklama</th>
            <th>Malzeme Türü</th>
            <th>Fiyat</th>
            <th>Stok</th>
            <th>Kategori</th>
            <th style={{ textAlign: "right" }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const imageUrl = `http://localhost:3000${product.image}`;

            return (
              <tr key={product._id}>
                <td>
                  <Image
                    src={imageUrl}
                    alt={product.productName}
                    width={80}
                    height={80}
                    fit="contain"
                  />
                </td>
                <td>{product.productName}</td>
                <td>{product.description}</td>
                <td>{product.type}</td>
                <td>{product.price} ₺</td>
                <td>{product.stock}</td>
                <td>{product.category?.categoryName}</td>
                <td style={{ textAlign: "right" }}>
                  <Group spacing="xs" position="right">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(product._id)}
                    >
                      Düzenle
                    </Button>
                    <Button
                      color="red"
                      onClick={() => handleDelete(product._id)}
                    >
                      Sil
                    </Button>
                  </Group>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Modal
        opened={editModalOpened}
        onClose={() => setEditModalOpened(false)}
        title="Ürün Düzenle"
      >
        <Grid>
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

          <GridCol span={6}>
            <Select
              label="Kategori"
              placeholder="Kategori seçin"
              data={categoryOptions}
              value={productData.category}
              onChange={(val) => handleChange("category", val)}
            />
          </GridCol>

          <GridCol span={6}>
            <Select
              label="Ürün Türü"
              placeholder="Tür seçin"
              data={typeOptions}
              value={productData.type}
              onChange={(val) => handleChange("type", val)}
            />
          </GridCol>

          <GridCol span={6}>
            <NumberInput
              label="Fiyat"
              placeholder="Fiyat"
              value={productData.price}
              min={0}
              onChange={(val) => handleChange("price", val)}
            />
          </GridCol>

          <GridCol span={6}>
            <NumberInput
              label="Stok"
              placeholder="Stok"
              value={productData.stock}
              min={0}
              onChange={(val) => handleChange("stock", val)}
            />
          </GridCol>

          {/* Resim güncelleme alanı */}
          <GridCol span={12} mt={10}>
            <Text>Ürün Görseli Güncelle</Text>
            <FileInput
              placeholder="Yeni görsel seçin"
              value={newImage}
              onChange={setNewImage}
              accept="image/*"
            />
          </GridCol>
        </Grid>

        <Container pt={20}>
          <Button onClick={handleUpdate}>Güncelle</Button>
        </Container>
      </Modal>
    </Container>
  );
}

export default ListItemsPage;
