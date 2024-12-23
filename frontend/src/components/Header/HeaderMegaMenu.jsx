import {
  IconChevronDown,
  IconUser,
  IconShoppingCart,
} from "@tabler/icons-react";
import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext"; // Kullanıcı bilgisini almak için context
import classes from "./HeaderMegaMenu.module.css";

export function HeaderMegaMenu() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box pb={0}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* Admin kullanıcıysa Collection butonu yerine Admin Panel */}
          {user && user.role === "admin" ? (
            <Button onClick={() => navigate("/admin-dashboard")}>
              Admin Panel
            </Button>
          ) : (
            <Button bg={"#428c6e"}>Collection</Button>
          )}
          <Group justify="center" h="100%" gap={0} visibleFrom="sm">
            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="/collection" className={classes.link}>
              Collection
            </a>
            <a href="/about" className={classes.link}>
              About
            </a>
            <a href="/contact" className={classes.link}>
              Contact
            </a>
          </Group>

          <Group visibleFrom="sm">
            {user ? (
              user.role === "admin" ? (
                // Admin için Admin Panel butonu ve profil seçenekleri
                <>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <UnstyledButton>
                        <ThemeIcon variant="default" radius="xl" size={34}>
                          <IconUser size={20} />
                        </ThemeIcon>
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => navigate("/admin")}>
                        Admin Profile
                      </Menu.Item>
                      <Menu.Item color="red" onClick={handleLogout}>
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </>
              ) : (
                // Customer için profil butonu ve sepet butonu
                <>
                  <Menu shadow="md" width={200}>
                    <Menu.Target>
                      <UnstyledButton>
                        <ThemeIcon variant="default" radius="xl" size={34}>
                          <IconUser size={20} />
                        </ThemeIcon>
                      </UnstyledButton>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => navigate("/myprofile")}>
                        My Profile
                      </Menu.Item>
                      <Menu.Item color="red" onClick={handleLogout}>
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                  <Button
                    variant="default"
                    onClick={() => navigate("/myorders")}
                    style={{ marginLeft: "10px" }}
                  >
                    <IconShoppingCart
                      size={20}
                      onClick={() => navigate("/myorders")}
                    />
                  </Button>
                </>
              )
            ) : (
              // Oturum açmamış kullanıcı için login ve signup butonları
              <>
                <Button variant="default" onClick={() => navigate("/login")}>
                  Log in
                </Button>
                <Button onClick={() => navigate("/register")} bg={"#428c6e"}>
                  Sign up
                </Button>
              </>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />

          <a href="/" className={classes.link}>
            Home
          </a>
          <a href="/collection" className={classes.link}>
            Collection
          </a>

          <a href="/about" className={classes.link}>
            About
          </a>
          <a href="/contact" className={classes.link}>
            Contact
          </a>

          <Divider my="sm" />

          {user ? (
            <Group justify="center" grow pb="xl" px="md">
              {user.role === "admin" ? (
                <>
                  <Button onClick={() => navigate("/admin-dashboard")}>
                    Admin Panel
                  </Button>
                  <Button onClick={() => navigate("/admin-profile")}>
                    Admin Profile
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate("/my-orders")}>
                  My Orders
                </Button>
              )}
              <Button color="red" onClick={handleLogout}>
                Logout
              </Button>
            </Group>
          ) : (
            <Group justify="center" grow pb="xl" px="md">
              <Button variant="default" onClick={() => navigate("/login")}>
                Log in
              </Button>
              <Button onClick={() => navigate("/register")} bg={"#428c6e"}>
                Sign up
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}

export default HeaderMegaMenu;
