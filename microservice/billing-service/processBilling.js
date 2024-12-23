const Invoice = require("./models/Invoice"); // Billing modeli
const { Kafka } = require("kafkajs");

// Kafka Producer'ı başlat
const kafka = new Kafka({
  clientId: "billing-service",
  brokers: ["kafka:29092"],
});

const processBilling = async (paymentData) => {
  try {
    const { orderId, transactionId } = paymentData;
    const paymentId = transactionId;

    const status = "paid"; // Ödeme başarılı varsayıyoruz

    // Billing modeline kaydetmek için yeni bir ödeme kaydı oluşturalım
    const billing = new Invoice({
      orderId,
      paymentId,
      status,
    });

    // MongoDB'ye kaydet
    const savedBilling = await billing.save();

    console.log("Billing saved successfully:", savedBilling);
    // Ödeme başarılı sonucu döndür
  } catch (error) {
    console.error("Error processing billing:", error);
  }
};

module.exports = processBilling;
