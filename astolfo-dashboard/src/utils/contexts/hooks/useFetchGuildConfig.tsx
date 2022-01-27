import { useEffect, useState } from "react";
import { getGuildConfig } from "../../api";
import { GuildConfigType } from "../../types";

export function useFetchGuildConfig(guildId: string) {
  const [config, setConfig] = useState<GuildConfigType>();
  const [prefix, setPrefix] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getGuildConfig(guildId)
      .then(({ data }) => {
        console.log(data);
        setConfig(data);
        setPrefix(data.prefix);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { config, prefix, setPrefix, loading, error };
}
