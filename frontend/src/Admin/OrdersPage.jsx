import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Group,
  Text,
  Loader,
  Center,
  Avatar,
  Stack,
  Title,
  Badge,
} from "@mantine/core";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/orders"
        );
        setOrders(response.data.response || []); // Gelen veriye göre "response" içindeki array'i alıyoruz.
      } catch (err) {
        setError("Siparişler alınırken bir hata oluştu: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Center>
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Container>
        <Text color="red" align="center">
          {error}
        </Text>
      </Container>
    );
  }

  return (
    <Container>
      <Title order={3} mb="lg" align="center">
        Siparişler
      </Title>
      <Stack spacing="lg">
        {orders.map((order) => (
          <Card key={order._id} shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart">
              <Group>
                <Avatar
                  src={`http://localhost:3000${order.items[0]?.productId?.image}`}
                  size={60}
                  radius="xl"
                />
                <div>
                  <Text weight={600}>{order.userId.username}</Text>
                  <Text size="sm" color="dimmed">
                    {order.userId.email}
                  </Text>
                </div>
              </Group>
              <Badge color="yellow" variant="filled">
                {order.status}
              </Badge>
            </Group>
            <Stack mt="md">
              <Group position="apart">
                <Text weight={500}>Sipariş ID:</Text>
                <Text>{order._id}</Text>
              </Group>
              <Group position="apart">
                <Text weight={500}>Toplam Tutar:</Text>
                <Text>{order.totalAmount} TL</Text>
              </Group>
              <Group position="apart">
                <Text weight={500}>Ürünler:</Text>
                <div>
                  {order.items.map((item) => (
                    <Text key={item._id} size="sm">
                      {item.productId.productName} x {item.quantity}
                    </Text>
                  ))}
                </div>
              </Group>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default OrdersList;
