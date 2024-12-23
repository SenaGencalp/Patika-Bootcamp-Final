import { AppShell, Burger, Button, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavbarSegmented from "../Admin/Navbar/NavbarSegmented";
import { Outlet } from "react-router-dom";
import HeaderMegaMenu from "../components/Header/HeaderMegaMenu";

export function AppShellAdmin() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: "sm" }}>
      <AppShell.Header>
        <HeaderMegaMenu></HeaderMegaMenu>
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarSegmented />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
export default AppShellAdmin;
