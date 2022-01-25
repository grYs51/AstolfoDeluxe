import { Container, InputField, Title } from "../utils/styles";

export const GuildPrefixPage = () => {
  return (
    <div style={{ padding: "35px" }}>
      <Container style={{ width: "50%" }}>
        <Title>Update Command Prefix</Title>
        <div>
          <div>
            <label htmlFor="prefix">Current Prefix</label>
          </div>
          <InputField style={{margin: '10px 0'}} />
        </div>
      </Container>
    </div>
  );
};
