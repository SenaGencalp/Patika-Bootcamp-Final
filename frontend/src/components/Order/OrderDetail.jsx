import React, { useEffect, useState } from "react";
import styles from "./OrderDetail.module.css";
import { Text, Divider, Group, Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/order-detail/${id}`
        );

        setOrder(response.data.orderDetail);
        console.log("responseeee", response.data.orderDetail);
      } catch (err) {
        setError("Veri çekme hatası: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Text className={styles.title}>Order Information</Text>
      </div>

      <div className={styles.section}>
        <Text>ID: {order._id}</Text>
        <Text>User ID: {order.userId}</Text>
      </div>

      <Divider my="sm" />

      <div className={styles.section}>
        <Text className={styles.title}>Product Information</Text>

        {order.items.map((item, index) => (
          <div key={index} className={styles.product}>
            <Text>Product Name: {item.product.productName}</Text>
            <Text>QT:{item.quantity}</Text>
            <Text>Price:{item.price} TL</Text>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Group position="apart" className={styles.row}>
          <Text>Sipariş Alındı</Text>

          <Text>TOTAL: {order.totalAmount} TL</Text>
        </Group>
      </div>
    </div>
  );
};

export default OrderDetail;
