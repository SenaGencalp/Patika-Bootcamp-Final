// payment-service/index.js

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const { Kafka } = require("kafkajs");
const processPayment = require("./processPayment"); // Ödeme logic'i

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ["kafka:29092"],
});

const consumer = kafka.consumer({ groupId: "payment-service-group" });

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "order_created", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const orderData = JSON.parse(message.value.toString());
      console.log("Payment service received:", orderData);

      // Ödeme işlemi
      await processPayment(orderData);
    },
  });
})();
