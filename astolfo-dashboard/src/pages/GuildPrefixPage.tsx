import { useContext } from "react";
import { MoonLoader } from "react-spinners";
import { GuildContext } from "../utils/contexts/GuildContext";
import { useFetchGuildConfig } from "../utils/contexts/hooks/useFetchGuildConfig";
import {
  Button,
  Container,
  Flex,
  InputField,
  Page,
  Title,
} from "../utils/styles";

export const GuildPrefixPage = () => {
  const { guild } = useContext(GuildContext);

  const { config, loading, error } = useFetchGuildConfig(
    (guild && guild.id) || ""
  );

  return (
    <Page>
      <Container style={{ width: "50%" }}>
        <Title>Update Command Prefix</Title>
        {!loading && config ? (
          <>
            <form>
              <div>
                <label htmlFor="prefix">Current Prefix</label>
              </div>
              <InputField
                style={{ margin: "10px 0" }}
                id="prefix"
                value={config?.prefix}
              />
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
          </>
        ) : (
          <Flex justifyContent="center">
            <MoonLoader size={30} color="white" />
          </Flex>
        )}
      </Container>
    </Page>
  );
};
