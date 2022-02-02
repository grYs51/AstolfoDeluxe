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
  IoPeopleOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useFetchGuildMembers } from "../utils/contexts/hooks/useFetchGuildMembers";

export const CategoryPage = () => {
  const { guild } = useContext(GuildContext);

  const navigate = useNavigate();

  const guildId = (guild && guild.id) || "";

  const { members } = useFetchGuildMembers(guildId);
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
        <div>
          <Flex alignItems="center" justifyContent="space-between">
            <Title>Guild Members - {members.length}</Title>
            <IoPeopleOutline size={35} />
          </Flex>
          <Grid>
            {members &&
              members.map((member) => (
                <TextButton style={{ color: member.guildColor }}>
                  <img
                    style={{ borderRadius: "40px" }}
                    width={35}
                    height={35}
                    src={
                      member.guildAvatar
                        ? member.guildAvatar
                        : member.user.avatar
                        ? member.user.avatar
                        : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/198142ac-f410-423a-bf0b-34c9cb5d9609/dbtif5j-60306864-d6b7-44b6-a9ff-65e8adcfb911.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE5ODE0MmFjLWY0MTAtNDIzYS1iZjBiLTM0YzljYjVkOTYwOVwvZGJ0aWY1ai02MDMwNjg2NC1kNmI3LTQ0YjYtYTlmZi02NWU4YWRjZmI5MTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.pRh5DK_cxlZ6SxVPqoUSsSNo1fqksJVP6ECGVUi6kmE"
                    }
                    alt={member.guildName}
                  />
                  {member.guildName}
                </TextButton>
              ))}
            {/* <TextButton onClick={() => navigate("/dashboard/message")}>
              Welcome Message
            </TextButton> */}
          </Grid>
        </div>
      </Container>
    </Page>
  );
};
