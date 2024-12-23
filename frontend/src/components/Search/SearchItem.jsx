import { CloseButton, Grid, Input } from "@mantine/core";

const SearchItem = ({ searchValue, setSearchValue }) => {
  return (
    <Grid p={0}>
      <Grid.Col span={12}>
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          rightSectionPointerEvents="all"
         
          rightSection={
            <CloseButton
              aria-label="Clear input"
            
              onClick={() => setSearchValue("")}
              style={{ display: searchValue ? undefined : "none" }}
            />
          }
          w={"100%"}
          mb={10}
        />
      </Grid.Col>
    </Grid>
  );
};

export default SearchItem;
