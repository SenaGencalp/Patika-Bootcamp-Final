import { IconAt, IconMapPin, IconPhone, IconSun } from "@tabler/icons-react";
import { Box, Stack, Text } from "@mantine/core";
import "./ContactIcons.module.css";

function ContactIcon({ icon: Icon, title, description, ...others }) {
  return (
    <div className="wrapper" {...others}>
      <Box mr="md">
        <Icon size={24} />
      </Box>

      <div>
        <Text size="xs" className="title">
          {title}
        </Text>
        <Text className="description">{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: "Email", description: "hello@mantine.dev", icon: IconAt },
  { title: "Phone", description: "+49 (800) 335 35 35", icon: IconPhone },
  { title: "Address", description: "844 Morris Park avenue", icon: IconMapPin },
  { title: "Working hours", description: "8 a.m. – 11 p.m.", icon: IconSun },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
