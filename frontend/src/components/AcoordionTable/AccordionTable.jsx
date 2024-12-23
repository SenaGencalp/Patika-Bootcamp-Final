import { Checkbox, Card, Stack, Title, Box } from "@mantine/core";

function AccordionTable({
  selectedCategories,
  setSelectedCategories,
  selectedTypes,
  setSelectedTypes,
  selectedPriceRange,
  setSelectedPriceRange,
  categories,
  types,
}) {
  const handleCategoryChange = (value) => setSelectedCategories(value);
  const handleTypeChange = (value) => setSelectedTypes(value);
  const handlePriceRangeChange = (value) => setSelectedPriceRange(value);

  return (
    <>
      <Title pl={20} order={3}>
        FILTERS
      </Title>
      <Box>
        {/* Categories Section */}
        <Card shadow="sm" mt="md" withBorder>
          <Title order={5} mb="sm">
            CATEGORIES
          </Title>
          <Checkbox.Group
            value={selectedCategories}
            onChange={handleCategoryChange}
          >
            <Stack spacing="xs">
              {categories.map((category) => (
                <Checkbox key={category} value={category} label={category} />
              ))}
            </Stack>
          </Checkbox.Group>
        </Card>

        {/* Type Section */}
        <Card shadow="sm" mt="md" withBorder>
          <Title order={5} mb="sm">
            TYPE
          </Title>
          <Checkbox.Group value={selectedTypes} onChange={handleTypeChange}>
            <Stack spacing="xs">
              {types.map((type) => (
                <Checkbox key={type} value={type} label={type} />
              ))}
            </Stack>
          </Checkbox.Group>
        </Card>

        {/* Price Range Section */}
        <Card shadow="sm" mt="md" withBorder>
          <Title order={5} mb="sm">
            PRICE RANGE
          </Title>
          <Checkbox.Group
            value={selectedPriceRange} // Çoklu seçim için dizi
            onChange={handlePriceRangeChange}
          >
            <Stack spacing="xs">
              <Checkbox value="0-200" label="0 TL - 200 TL" />
              <Checkbox value="200-500" label="200 TL - 500 TL" />
              <Checkbox value="500-1000" label="500 TL - 1000 TL" />
              <Checkbox value="1000-2000" label="1000 TL - 2000 TL" />
            </Stack>
          </Checkbox.Group>
        </Card>
      </Box>
    </>
  );
}

export default AccordionTable;
