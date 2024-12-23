import React, { useState, useEffect } from "react";
import { Container, Grid, SimpleGrid, Text, Center } from "@mantine/core";
import CardList from "../components/Card/CardList";
import SearchItem from "../components/Search/SearchItem";
import axios from "axios";
import AccordionTable from "../components/AcoordionTable/AccordionTable";
import ArticleCardImage from "../components/AcoordionTable/ArticleCardImage";
import PaginationButton from "../components/Pagination/PaginationButton";

const Home = () => {
  const [searchValue, setSearchValue] = useState(""); // Arama değeri
  const [selectedCategories, setSelectedCategories] = useState([]); // Seçilen kategoriler
  const [selectedTypes, setSelectedTypes] = useState([]); // Seçilen tipler
  const [selectedPriceRange, setSelectedPriceRange] = useState([]); // Fiyat aralığı seçimi
  const [data, setData] = useState([]); // Ürün verisi
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
  const pageSize = 8; // Sayfa başına ürün sayısı

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product");
        setData(response.data.response);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fiyat aralıklarını belirle
  const priceRanges = {
    "0-200": [0, 200],
    "200-500": [200, 500],
    "500-1000": [500, 1000],
    "1000-2000": [1000, 2000],
  };

  // Seçilen fiyat aralıklarına göre minPrice ve maxPrice belirle
  const selectedPriceLimits = selectedPriceRange
    .map((range) => priceRanges[range]) // Seçili aralıkları al
    .filter(Boolean); // Geçerli aralıkları tut

  const [minPrice, maxPrice] = selectedPriceLimits.length
    ? [
        Math.min(...selectedPriceLimits.map((r) => r[0])),
        Math.max(...selectedPriceLimits.map((r) => r[1])),
      ]
    : [0, Infinity]; // Hiçbir aralık seçilmediyse tüm fiyatları göster

  const categories = [
    ...new Set(data.map((item) => item.category.categoryName)),
  ];
  const types = [...new Set(data.map((item) => item.type))];

  // Sayfalanmış veriyi hesapla
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) return <Text>Yükleniyor...</Text>;

  return (
    <Container fluid>
      <SimpleGrid>
        <Container
          fluid
          style={{
            marginRight: 100,
            marginLeft: 100,
            marginTop: 10,
            marginBottom: 0,
          }}
        >
          <ArticleCardImage />
        </Container>
      </SimpleGrid>

      <Grid ml={100} mr={100} mt={10}>
        <Grid.Col miw={300} span={2}>
          <AccordionTable
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedPriceRange={selectedPriceRange} // Çoklu seçim için dizi
            setSelectedPriceRange={setSelectedPriceRange}
            categories={categories}
            types={types}
          />
        </Grid.Col>
        <Grid.Col miw={600} span="auto">
          <SearchItem
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <CardList
            searchValue={searchValue}
            selectedCategories={selectedCategories}
            selectedTypes={selectedTypes}
            minPrice={minPrice}
            maxPrice={maxPrice}
            data={paginatedData.filter(
              (item) => item.price >= minPrice && item.price <= maxPrice
            )}
          />
          {/* Pagination */}
          <Center mt={30}>
            <PaginationButton
              total={Math.ceil(data.length / pageSize)} // Toplam sayfa sayısı
              activePage={currentPage} // Mevcut sayfa
              onChange={setCurrentPage} // Sayfa değişim fonksiyonu
            />
          </Center>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Home;
