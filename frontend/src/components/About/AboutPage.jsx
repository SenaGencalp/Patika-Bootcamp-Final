import React from "react";
import {
  Container,
  Grid,
  Image,
  Text,
  Title,
  Card,
  Group,
  Input,
  Button,
  Box,
  Flex,
} from "@mantine/core";

const AboutPage = () => {
  return (
    <Container fluid>
      <Container>
        <Title align="center" order={1}>
          ABOUT US
        </Title>
      </Container>

      <Grid style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid.Col miw={400} span={2} mr={20}>
          <Image
            w={400}
            h={500}
            src="https://images.unsplash.com/photo-1722410180651-efd51636f260?q=80&w=1792&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hakkımızda görseli"
            fit="contain"
            radius="md"
          />
        </Grid.Col>

        <Grid.Col
          span="auto"
          m={45}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text>
            Forever, yeniliğe duyulan tutku ve insanların çevrimiçi alışveriş
            yapma biçimini kökten değiştirme arzusundan doğdu. Yolculuğumuz
            basit bir fikirle başladı: Müşterilerin evlerinin konforunda geniş
            bir ürün yelpazesini kolayca keşfedebilecekleri, inceleyebilecekleri
            ve satın alabilecekleri bir platform sağlamak.
          </Text>
          <Text>
            Kuruluşumuzdan bu yana, her zevke ve tercihe hitap eden çeşitli
            yüksek kaliteli ürünler sunmak için yorulmadan çalıştık. Modadan ve
            güzellikten elektroniğe ve ev gereçlerine kadar, güvenilir
            markalardan ve tedarikçilerden temin edilen kapsamlı bir koleksiyon
            sunuyoruz.
          </Text>
          <Title m={30}>Misyonumuz</Title>
          <Text fs={16}>
            Forever'daki misyonumuz, müşterilere seçim, kolaylık ve güven
            sağlamaktır. Göz atmaktan sipariş vermeye, teslimata ve ötesine
            kadar beklentileri aşan kusursuz bir alışveriş deneyimi sunmaya
            adadık kendimizi.
          </Text>
        </Grid.Col>
      </Grid>

      {/* Neden Bizi Seçmelisiniz Bölümü */}
      <Title align="start" order={2} mt="xl" mb={30}>
        WHY SHOULD YOU CHOOSE US?
      </Title>
      <Grid>
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg">
            <Title order={5} mb="sm">
              Kalite Güvencesi
            </Title>
            <Text size="sm">
              Her ürünü titizlikle seçip inceleyerek, sıkı kalite
              standartlarımızı karşıladığından emin oluyoruz.
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" padding="lg">
            <Title order={5} mb="sm">
              Kolaylık
            </Title>
            <Text size="sm">
              Kullanıcı arayüzümüz ve zahmetsiz sipariş sürecimizle alışveriş
              hiç bu kadar kolay olmamıştı.
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={4}>
          <Card shadow="sm" p={19}>
            <Title order={5} mb="sm">
              Olağanüstü Müşteri Hizmetleri
            </Title>
            <Text size="sm">
              Uzman kadromuz size yardımcı olmak için burada. Memnuniyetiniz
              bizim için en önemli önceliktir.
            </Text>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AboutPage;
