import { MultiSelect } from "@mantine/core";

function Selects() {
  return (
    <MultiSelect
      label="Your favorite libraries"
      placeholder="Pick value"
      data={["React", "Angular", "Vue", "Svelte"]}
    />
  );
}
export default Selects;
