import { Paper, Text, Title, Button, Container, Flex } from "@mantine/core";
import classes from "./ArticleCardImage.module.css";

function ArticleCardImage() {
  return (
    <>
      <Paper
        shadow="md"
        radius="md"
        style={{ textAlign: "center" }}
        className={classes.card}
      >
        <Container className={classes.cardContents}>
          <Text className={classes.title}>
            OUR BESTSELLERS   
          </Text>
          <Text className={classes.title}>
          Latest Arrivals
          </Text>
          <Text className={classes.title}>
          SHOP NOW
          </Text>
          
       
        </Container>
      </Paper>

      <Container>
        <Text
          style={{ display: "flex", justifyContent: "center" }}
          m={30}
          fw={"bold"}
        >
          LATEST COLLECTIONS
        </Text>
      </Container>
    </>
  );
}
export default ArticleCardImage;
