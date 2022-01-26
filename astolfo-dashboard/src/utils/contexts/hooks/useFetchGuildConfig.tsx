import { useEffect, useState } from "react";
import { getGuildConfig } from "../../api";
import { GuildConfigType } from "../../types";

export function useFetchGuildConfig(guildId: string) {
  const [config, setConfig] = useState<GuildConfigType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getGuildConfig(guildId)
      .then(({ data }) => {
        console.log(data);
        setConfig(data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { config, loading, error};
}
