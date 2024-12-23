const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "backend-service",
  brokers: ["kafka:29092"], // docker-compose içindeki kafka servisine uygun host:port
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
}
connectProducer().catch(console.error);

async function sendOrderCreatedEvent(orderData) {
  await producer.send({
    topic: "order_created",
    messages: [{ value: JSON.stringify(orderData) }],
  });
}

module.exports = { sendOrderCreatedEvent };
