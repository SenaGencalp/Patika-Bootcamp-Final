import React from "react";
import RegisterPage from "../components/Account/RegisterPage";
import { Container } from "@mantine/core";

const Register = () => {
  return (
    <>
      <Container size={"75%"} mt={50}>
        <RegisterPage />
      </Container>
    </>
  );
};

export default Register;
