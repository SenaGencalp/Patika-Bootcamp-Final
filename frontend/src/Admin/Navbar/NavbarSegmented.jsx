import { useState } from "react";
import { IconPlus, IconList, IconFileText } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom"; // useNavigate importu

import classes from "./NavbarSegmented.module.css";

const data = [
  { label: "Add", icon: IconPlus },
  { label: "Item List", icon: IconList },
  { label: "Orders", icon: IconFileText },
];

export function NavbarSegmented() {
  const [active, setActive] = useState("Add");
  const navigate = useNavigate(); // useNavigate hook'u

  const handleLinkClick = (label) => {
    setActive(label);
    if (label === "Add") {
      navigate("/addItem"); // /add sayfasına yönlendirme
    } else if (label === "Item List") {
      navigate("/listItem"); // /item-list sayfasına yönlendirme
    } else if (label === "Orders") {
      navigate("/admin/orders"); // /orders sayfasına yönlendirme
    }
  };

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href="#"
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        handleLinkClick(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
export default NavbarSegmented;
