import { Link } from "react-router-dom"; // React Router Link

import {
  Card,
  Group,
  Image,
  SimpleGrid,
  Text,
  useMantineTheme,
} from "@mantine/core";
import classes from "./CardList.module.css";

function CardList({
  searchValue,
  selectedCategories,
  selectedTypes,
  minPrice,
  maxPrice,
  data,
}) {
  const filteredData = data
    .filter((item) =>
      item.productName.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter((item) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(item.category.categoryName)
    )
    .filter((item) =>
      selectedTypes.length === 0 ? true : selectedTypes.includes(item.type)
    )
    .filter(
      (item) =>
        (!minPrice || item.price >= minPrice) &&
        (!maxPrice || item.price <= maxPrice)
    );

  const theme = useMantineTheme();

  return (
    <SimpleGrid cols={4} spacing="md" position="center">
      {filteredData.map((item) => (
        <Link
          to={`/product/${item._id}`}
          key={item._id}
          style={{ textDecoration: "none" }}
        >
          <Card
            shadow="sm"
            padding="lg"
            className={classes.card}
            style={{ width: "100%" }}
          >
            <Card.Section>
              <Image
                src={
                  item.image
                    ? `http://localhost:3000${item.image}`
                    : "https://via.placeholder.com/180"
                }
                height={300}
                alt={item.productName}
                style={{ objectFit: "cover" }}
              />
            </Card.Section>

            <Text
              align="start"
              weight={500}
              fw={"bold"}
              size="lg"
              className={classes.productName}
            >
              {item.productName}
            </Text>

            <Text
              align="start"
              size="sm"
              color="dimmed"
              className={classes.description}
            >
              {item.description}
            </Text>

            <Group position="apart" style={{ marginTop: 10 }}>
              <Text weight={500} size="lg" color="teal">
                {item.price} TL
              </Text>
              <Group spacing={5}></Group>
            </Group>
          </Card>
        </Link>
      ))}
    </SimpleGrid>
  );
}

export default CardList;
