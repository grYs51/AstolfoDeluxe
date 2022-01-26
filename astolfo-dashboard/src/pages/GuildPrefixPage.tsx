import { useContext } from "react";
import { MoonLoader } from "react-spinners";
import { updateGuildPrefix } from "../utils/api";
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
  const guildId = (guild && guild.id) || "";

  const { config, loading, error, prefix, setPrefix } =
    useFetchGuildConfig(guildId);

  const savePrefix = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(prefix);
    try {
      const res = await updateGuildPrefix(guildId, prefix);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
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
                <Button variant="primary" onClick={savePrefix}>
                  Save
                </Button>
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
