import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Table,
  Image,
  Stack,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyOrdersPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); // JWT token'ı localStorage'dan alıyoruz.
  const navigate = useNavigate();

  const checkout = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/order/create",
        {
          items: cartItems.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
          })),
          totalAmount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Order created:", response.data);
      navigate("/order-detail/" + response.data.orderId);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    // Bileşen yüklendiğinde mevcut sepeti getir
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Sepet bilgisi alınamadı:", error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await axios.delete("http://localhost:3000/api/cart/remove", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { productId: id }, // DELETE isteklerinde body içeriği için `data` kullanılır.
      });

      // Başarılı silme sonrası sepeti güncelle
      setCart(response.data);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const cartItems = cart?.items ?? [];
  const subtotal = cartItems.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <Container size="md" py="xl">
      <Title order={2} mb="lg">
        YOUR{" "}
        <Text component="span" weight={700}>
          CART
        </Text>
      </Title>

      <Table highlightOnHover>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.productId._id}>
              <td>
                <Image
                  src={`http://localhost:3000${item.productId.image}`}
                  width={70}
                  height={70}
                  radius="md"
                  style={{ objectFit: "contain" }}
                />
              </td>
              <td>{item.productId.productName}</td>
              <td>{item.productId.price} TL</td>
              <td>Count: {item.quantity}</td>
              <td>
                <Button
                  onClick={() => removeFromCart(item.productId._id)}
                  variant="subtle"
                  color="red"
                >
                  <IconTrash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Stack mt="xl" spacing="xs" align="flex-end">
        <Text size="lg">Subtotal: ${subtotal.toFixed(2)}</Text>
        <Title order={4}>Total: ${total.toFixed(2)}</Title>
        <Button color="dark" radius="md" size="md" onClick={checkout}>
          PROCEED TO CHECKOUT
        </Button>
      </Stack>
    </Container>
  );
}

export default MyOrdersPage;
