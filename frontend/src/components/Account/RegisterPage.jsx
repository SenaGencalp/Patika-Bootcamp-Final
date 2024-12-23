import React, { useState } from "react";
import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Notification,
} from "@mantine/core";
import axios from "axios";
import classes from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData
      );
      setSuccessMessage(response.data.message);
      setErrorMessage(null);

      setFormData({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while registering"
      );
      setSuccessMessage(null);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Create a new account
        </Title>

        {/* Hata mesajı */}
        {errorMessage && (
          <Notification color="red" onClose={() => setErrorMessage(null)}>
            {errorMessage}
          </Notification>
        )}

        {/* Başarı mesajı */}
        {successMessage && (
          <Notification color="green" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Notification>
        )}

        <form onSubmit={handleRegister}>
          <TextInput
            label="Username"
            name="username"
            placeholder="Your username"
            size="md"
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextInput
            label="Email address"
            name="email"
            placeholder="hello@gmail.com"
            mt="md"
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

          <Button
            bg={"#428c6e"}
            fullWidth
            mt="xl"
            size="md"
            type="submit" // Formun tetiklenmesi için "submit" kullan
          >
            Register
          </Button>
        </form>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor href="#" fw={700} onClick={(event) => navigate("/login")}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}

export default RegisterPage;
