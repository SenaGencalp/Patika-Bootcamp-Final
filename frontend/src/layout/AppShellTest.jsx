import { AppShell } from "@mantine/core";

import { HeaderMegaMenu } from "../components/Header/HeaderMegaMenu";
import FooterSimple from "../components/Footer/FooterSimple";
import { Outlet } from "react-router-dom";

function AppShellTest() {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <HeaderMegaMenu></HeaderMegaMenu>
      </AppShell.Header>

      <AppShell.Main >
        <Outlet />
      </AppShell.Main>

      <FooterSimple />
    </AppShell>
  );
}

export default AppShellTest;
