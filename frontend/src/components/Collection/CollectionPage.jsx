import React, { useEffect, useState } from "react";
import AccordionTable from "../AcoordionTable/AccordionTable";
import CardList from "../Card/CardList";
import { Container, Grid, SimpleGrid, Text, Center } from "@mantine/core";
import axios from "axios";
import SearchItem from "../Search/SearchItem";
import PaginationButton from "../Pagination/PaginationButton";

const CollectionPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]); // Çoklu seçim için dizi
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

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

  const priceRanges = {
    "0-200": [0, 200],
    "200-500": [200, 500],
    "500-1000": [500, 1000],
    "1000-2000": [1000, 2000],
  };

  // Seçilen fiyat aralıklarına göre minPrice ve maxPrice hesaplama
  const selectedPriceLimits = selectedPriceRange
    .map((range) => priceRanges[range])
    .filter(Boolean);

  const [minPrice, maxPrice] = selectedPriceLimits.length
    ? [
        Math.min(...selectedPriceLimits.map((r) => r[0])),
        Math.max(...selectedPriceLimits.map((r) => r[1])),
      ]
    : [0, Infinity];

  const categories = [
    ...new Set(data.map((item) => item.category.categoryName)),
  ];
  const types = [...new Set(data.map((item) => item.type))];

  const paginatedData = data
    .filter((item) => item.price >= minPrice && item.price <= maxPrice)
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return <Text>Yükleniyor...</Text>;
  }

  return (
    <>
      <Grid ml={100} mr={100} mt={10}>
        <Grid.Col miw={300} span={2}>
          <Container p={0}>
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
          </Container>
        </Grid.Col>

        <Grid.Col miw={600} span="auto">
          <Container fluid>
            <SearchItem
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <SimpleGrid>
              <CardList
                searchValue={searchValue}
                selectedCategories={selectedCategories}
                selectedTypes={selectedTypes}
                minPrice={minPrice}
                maxPrice={maxPrice}
                data={paginatedData}
              />
            </SimpleGrid>

            <Center mt={20}>
              <PaginationButton
                total={Math.ceil(
                  data.filter(
                    (item) =>
                      item.price >= minPrice && item.price <= maxPrice
                  ).length / pageSize
                )}
                activePage={currentPage}
                onChange={setCurrentPage}
              />
            </Center>
          </Container>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default CollectionPage;
