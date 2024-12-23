import React from "react";
import ContactUs from "../components/Contact/ContactUs";
import { Container } from "@mantine/core";

const Contact = () => {
  return (
    <>
      <Container size={"75%"} mt={50}>
        <ContactUs />
      </Container>
    </>
  );
};

export default Contact;
