// billing-service/index.js

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const { Kafka } = require("kafkajs");
const processBilling = require("./processBilling"); // Fatura logic'i

const kafka = new Kafka({
  clientId: "billing-service",
  brokers: ["kafka:29092"],
});

const consumer = kafka.consumer({ groupId: "billing-service-group" });

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "billing_process", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const paymentData = JSON.parse(message.value.toString());
      console.log("Billing service received:", paymentData);

      // Fatura işlemi
      await processBilling(paymentData);
    },
  });
})();
