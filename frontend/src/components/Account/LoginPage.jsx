import React, { useState } from "react";
import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Notification,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../contexts/userContext";

import classes from "./LoginPage.module.css";

export function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const { setToken, setUser } = useUser();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engeller
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData
      );

      const tokenFromServer = response.data.response.token;
      const userData = response.data.response.user;

      if (!tokenFromServer) {
        throw new Error("Geçersiz email veya şifre");
      }

      setToken(tokenFromServer);
      setUser(userData);

      setSuccessMessage("Login successful!");
      setErrorMessage(null);

      navigate("/");
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "An error occurred while logging in";

      setErrorMessage(errMsg);
      setSuccessMessage(null);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Welcome back to Takıla!
        </Title>

        {errorMessage && (
          <Notification color="red" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Notification>
        )}

        {successMessage && (
          <Notification color="green" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Notification>
        )}

        <form onSubmit={handleLogin}>
          <TextInput
            label="Email address"
            name="email"
            placeholder="hello@gmail.com"
            size="md"
            value={formData.email}
            onChange={handleInputChange}
          />
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Your password"
            mt="md"
            size="md"
            value={formData.password}
            onChange={handleInputChange}
          />

          <Checkbox label="Keep me logged in" mt="xl" size="md" />

          <Button bg={"#428c6e"} fullWidth mt="xl" size="md" type="submit">
            Login
          </Button>
        </form>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor href="#" fw={700} onClick={() => navigate("/register")}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default LoginPage;
