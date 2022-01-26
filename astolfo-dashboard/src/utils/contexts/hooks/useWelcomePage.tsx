import { useEffect, useState } from "react";
import { getGuildChannels, getGuildConfig } from "../../api";
import { GuildConfigType, PartialGuildChannel } from "../../types";

export function useWelcomPage(guildId: string, type: number) {
  const [config, setConfig] = useState<GuildConfigType>();
  const [channels, setChannel] = useState<PartialGuildChannel[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    getGuildConfig(guildId)
      .then(({ data }) => {
        setConfig(data);
        return getGuildChannels(guildId, type);
      })
      .then(({ data }) => setChannel(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return {config, channels, loading, error};
}
