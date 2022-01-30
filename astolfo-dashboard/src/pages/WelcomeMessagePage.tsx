import { channel } from "diagnostics_channel";
import { useContext, useState } from "react";
import { MoonLoader } from "react-spinners";
import { TransitionAlert } from "../components/Alerts/Alerts";
import { updateWelcomeChannelId } from "../utils/api";
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
  const [open, setOpen] = useState(false);
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || "";
  const {
    config,
    channels,
    error,
    loading,
    selectedChannel,
    setSelectedChannel,
  } = useWelcomPage(guildId, 0);

  const updateWelcomeChannel = async () => {
    try {
      const res = await updateWelcomeChannelId(guildId, selectedChannel || "");
      if (res.status === 201) {
        setOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Page>
      <TransitionAlert
        open={open}
        setOpen={setOpen}
        title="Succesfully Saved!"
      />

      <Container>
        <Title>Update Welcome Message</Title>
        {channels && config && !loading ? (
          <>
            <div>
              <section>
                <div>
                  <label>Current Channel</label>
                </div>
                <Select
                  style={{ width: "100%", margin: "10px 0" }}
                  onChange={(e) => setSelectedChannel(e.target.value)}
                >
                  <option disabled>Please Select a Channel</option>
                  {channels?.map((channel) => (
                    <option
                      key={channel.id}
                      selected={channel.id === config.welcomeChannelId}
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
                <Button variant="primary" onClick={updateWelcomeChannel}>
                  Save
                </Button>
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
