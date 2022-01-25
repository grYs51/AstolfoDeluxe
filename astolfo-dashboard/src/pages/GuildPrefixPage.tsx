import { Button, Container, Flex, InputField, Title } from "../utils/styles";

export const GuildPrefixPage = () => {
  return (
    <div style={{ padding: "35px" }}>
      <Container style={{ width: "50%" }}>
        <Title>Update Command Prefix</Title>
        <form>
          <div>
            <label htmlFor="prefix">Current Prefix</label>
          </div>
          <InputField style={{ margin: "10px 0" }} />
          <Flex justifyContent="flex-end">
            <Button
              variant="secondary"
              type="button"
              style={{
                marginRight: "8px",
              }}
            >
              Reset
            </Button>
            <Button variant="primary">Save</Button>
          </Flex>
        </form>
      </Container>
    </div>
  );
};
