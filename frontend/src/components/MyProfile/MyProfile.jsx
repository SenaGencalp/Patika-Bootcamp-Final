import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Avatar,
  Group,
  Text,
  Title,
  Button,
  Stack,
  Modal,
  TextInput,
  Divider,
  Grid,
  Notification,
  Badge,
  Flex,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconX, IconEdit, IconLock } from "@tabler/icons-react";
import axios from "axios";
import { useUser } from "../../contexts/userContext";

const MyProfile = () => {
  const { user, setUser, token } = useUser();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    setUpdatedUser({
      username: user?.username || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/${user._id}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data.user);
        setNotification({
          open: true,
          type: "success",
          message: "Profil başarıyla güncellendi.",
        });
      }
    } catch (error) {
      console.error("Profil güncelleme hatası:", error);
      setNotification({
        open: true,
        type: "error",
        message: "Profil güncellenirken bir hata oluştu.",
      });
    }
    setEditModalOpen(false);
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/${user._id}/password`,
        { password: newPassword },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setNotification({
          open: true,
          type: "success",
          message: "Şifre başarıyla güncellendi.",
        });
        setNewPassword("");
      }
    } catch (error) {
      console.error("Şifre güncelleme hatası:", error);
      setNotification({
        open: true,
        type: "error",
        message: "Şifre güncellenirken bir hata oluştu.",
      });
    }
    setPasswordModalOpen(false);
  };

  return (
    <Container size="md" px="md" py="xl">
      {notification.open && (
        <Notification
          icon={
            notification.type === "success" ? (
              <IconCheck size={18} />
            ) : (
              <IconX size={18} />
            )
          }
          color={notification.type === "success" ? "teal" : "red"}
          onClose={() => setNotification({ ...notification, open: false })}
          title={notification.type === "success" ? "Başarılı" : "Hata"}
          mb="md"
          withBorder
        >
          {notification.message}
        </Notification>
      )}
      <Card shadow="lg" padding="lg" radius="md" withBorder>
        <Grid gutter="xl" align="center">
          <Grid.Col
            xs={12}
            sm={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              size={120}
              radius="xl"
              src={user?.avatar || ""}
              alt="Profile Picture"
              style={{ backgroundColor: "#e0e0e0" }}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={8}>
            <Flex justify="space-between" align="center" mb="xs">
              <Title order={2} weight={700}>
                {user?.username}
              </Title>
            </Flex>
            <Text size="sm" c="dimmed" mb="sm">
              @{user?.email}
            </Text>
            <Divider my="sm" />
            <Stack spacing="xs" mb="sm">
              <Group spacing="xs">
                <Text weight={500}>Rol:</Text>
                <Badge c="blue" variant="light">
                  {user?.role}
                </Badge>
              </Group>
              <Group spacing="xs">
                <Text weight={500}>Kayıt Tarihi:</Text>
                <Text>
                  {new Date(user?.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </Group>
            </Stack>
            <Group spacing="sm">
              <Tooltip label="Profili Düzenle" withArrow>
                <Button
                  variant="light"
                  color="blue"
                  leftIcon={<IconEdit size={16} />}
                  onClick={() => setEditModalOpen(true)}
                >
                  Düzenle
                </Button>
              </Tooltip>
              <Tooltip label="Şifreyi Değiştir" withArrow>
                <Button
                  variant="light"
                  color="red"
                  leftIcon={<IconLock size={16} />}
                  onClick={() => setPasswordModalOpen(true)}
                >
                  Şifre Değiştir
                </Button>
              </Tooltip>
            </Group>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Düzenleme Modalı */}
      <Modal
        opened={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Profili Düzenle"
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Stack spacing="md">
          <TextInput
            label="Kullanıcı Adı"
            placeholder="Kullanıcı Adınızı Girin"
            value={updatedUser.username}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, username: e.target.value })
            }
            required
            icon={<IconEdit size={16} />}
          />
          <TextInput
            label="Email"
            placeholder="email@example.com"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            required
            type="email"
            icon={<IconEdit size={16} />}
          />
          <Button
            fullWidth
            onClick={handleUpdate}
            color="blue"
            leftIcon={<IconCheck size={16} />}
          >
            Kaydet
          </Button>
        </Stack>
      </Modal>

      {/* Şifre Değiştirme Modalı */}
      <Modal
        opened={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        title="Şifreyi Değiştir"
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <Stack spacing="md">
          <TextInput
            label="Yeni Şifre"
            placeholder="Yeni Şifrenizi Girin"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            type="password"
            icon={<IconLock size={16} />}
          />
          <Button
            fullWidth
            onClick={handlePasswordChange}
            color="red"
            leftIcon={<IconCheck size={16} />}
            disabled={!newPassword}
          >
            Güncelle
          </Button>
        </Stack>
      </Modal>
    </Container>
  );
};

export default MyProfile;
