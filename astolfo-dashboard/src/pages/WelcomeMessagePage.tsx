import { channel } from "diagnostics_channel";
import { useContext } from "react";
import { MoonLoader } from "react-spinners";
import { GuildContext } from "../utils/contexts/GuildContext";
import { useWelcomPage } from "../utils/contexts/hooks/useWelcomePage";
import {
  Button,
  Container,
  Flex,
  Page,
  Select,
  TextArea,
  Title,
} from "../utils/styles";

export const WelcomeMessagePage = () => {
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || "";

  const { config, channels, error, loading } = useWelcomPage(guildId, 0);

  console.log(config, channels);
  return (
    <Page>
      <Container>
        <Title>Update Welcome Message</Title>
        {channels && config && !loading ? (
          <>
            <div>
              <section>
                <div>
                  <label>Current Channel</label>
                </div>
                <Select style={{ width: "100%", margin: "10px 0" }}>
                  <option disabled>Please Select a Channel</option>
                  {channels?.map((channel) => (
                    <option
                      selected={channel.id === config?.welcomeChannelId}
                      value={channel.id}
                    >
                      #{channel.name}
                    </option>
                  ))}
                </Select>
              </section>
              <section style={{ margin: "10px 0" }}>
                <div>
                  <label htmlFor="message">Current Message</label>
                </div>
                <TextArea id="message" style={{ marginTop: "10px" }} />
              </section>
              <Flex justifyContent="flex-end">
                <Button
                  variant="secondary"
                  style={{
                    marginRight: "8px",
                  }}
                >
                  Reset
                </Button>
                <Button variant="primary">Save</Button>
              </Flex>
            </div>
          </>
        ) : (
          <Flex justifyContent="center" alignItems="center">
            <MoonLoader size={30} color="white" />
          </Flex>
        )}
      </Container>
    </Page>
  );
};
