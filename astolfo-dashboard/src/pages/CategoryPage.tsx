import { useContext } from "react";
import { GuildContext } from "../utils/contexts/GuildContext";
import {
  Container,
  Flex,
  Grid,
  Page,
  TextButton,
  Title,
} from "../utils/styles";
import {
  IoSettingsOutline,
  IoNewspaperOutline,
  IoAnalytics,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const CategoryPage = () => {
  const { guild } = useContext(GuildContext);

  const navigate = useNavigate();

  return (
    <Page>
      <Container>
        <div>
          <Flex alignItems="center" justifyContent="space-between">
            <Title>Guild Information</Title>
            <IoAnalytics size={35} />
          </Flex>
          <Grid>
            <TextButton onClick={() => navigate("/dashboard/analytics")}>
              Analytics
            </TextButton>
            {/* <TextButton onClick={() => navigate("/dashboard/message")}>
              Welcome Message
            </TextButton> */}
          </Grid>
        </div>
        <div style={{ borderTop: "1px solid #ffffff1b", marginTop: "30px" }}>
          <Flex alignItems="center" justifyContent="space-between">
            <Title>Basic Configuration</Title>
            <IoSettingsOutline size={35} />
          </Flex>
          <Grid>
            <TextButton onClick={() => navigate("/dashboard/prefix")}>
              Command Prefix
            </TextButton>
            <TextButton onClick={() => navigate("/dashboard/message")}>
              Welcome Message
            </TextButton>
          </Grid>
        </div>
        <div style={{ borderTop: "1px solid #ffffff1b", marginTop: "30px" }}>
          <Flex alignItems="center" justifyContent="space-between">
            <Title>Channel Logs</Title>
            <IoNewspaperOutline size={35} />
          </Flex>
          <Grid>
            <TextButton>Moderation Logs</TextButton>
            <TextButton>Bot Logs</TextButton>
          </Grid>
        </div>
      </Container>
    </Page>
  );
};
