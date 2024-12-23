import React from "react";
import AboutPage from "../components/About/AboutPage";
import { Container } from "@mantine/core";

const About = () => {
  return (
    <>
      <Container size={"75%"} mt={50}>
        <AboutPage />
      </Container>
    </>
  );
};

export default About;
