import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { GuildMenuItem } from "../components/GuildMenuItem";
import { GuildContext } from "../utils/contexts/GuildContext";
import { useFetchGuilds } from "../utils/contexts/hooks/useFetchGuilds";
import { Container, Flex, Page } from "../utils/styles";
import { mockGuilds } from "../__mocks__/guilds";

export const MenuPage = () => {
  const navigate = useNavigate();
  const { updateGuildId } = useContext(GuildContext);

  const { guilds, loading, error } = useFetchGuilds();

  const handleClick = (guildId: string) => {
    updateGuildId(guildId);
    navigate("/dashboard/categories");
  };

  return (
    <Page>
      <Container>
        <h2 style={{ fontWeight: 300 }}>Select a Server</h2>
        <div>
          {/*  */}
          {loading ? (
            <Flex justifyContent="center">
              <MoonLoader size={30} color="white" />
            </Flex>
          ) : (
            <div>
              {guilds &&
                guilds.map((guild) => (
                  <div onClick={() => handleClick(guild.id)}>
                    <GuildMenuItem guild={guild} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </Container>
    </Page>
  );
};
