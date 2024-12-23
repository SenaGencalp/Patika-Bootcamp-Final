import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
  Notification,
} from "@mantine/core";
import { ContactIconsList } from "./ContactIcons";
import { useState } from "react";
import axios from "axios";
import classes from "./ContactUs.module.css";

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

function ContactUs() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/contact",
        formData
      );

      if (response.status === 200) {
        setSuccessMessage("Mesajınız başarıyla gönderildi!");
        setFormData({ email: "", name: "", subject: "", message: "" });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.error || "Mesaj gönderilemedi, tekrar deneyin.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const icons = social.map((Icon, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
    >
      <Icon size={22} stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>

          <ContactIconsList />

          <Group mt="xl">{icons}</Group>
        </div>
        <div className={classes.form}>
          {successMessage && (
            <Notification
              color="teal"
              title="Başarılı!"
              onClose={() => setSuccessMessage("")}
            >
              {successMessage}
            </Notification>
          )}
          {errorMessage && (
            <Notification
              color="red"
              title="Hata!"
              onClose={() => setErrorMessage("")}
            >
              {errorMessage}
            </Notification>
          )}
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Subject"
            placeholder="Subject"
            required
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to order your goods"
            minRows={4}
            name="message"
            value={formData.message}
            onChange={handleChange}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <Group justify="flex-end" mt="md">
            <Button
              className={classes.control}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
}

export default ContactUs;
