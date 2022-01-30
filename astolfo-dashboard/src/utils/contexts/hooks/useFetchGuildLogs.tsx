import { useEffect, useState } from "react";
import { getGuildBanLogs } from "../../api";
import { GuildLogsType } from "../../types";

export function useFetchGuildLogs(
  guildId: string,
  FromDate: string,
  getLabels: () => string[],
  prepareDate: (data: GuildLogsType[]) => number[]
) {
  const [bans, setBans] = useState<GuildLogsType[]>();
  const [labels, setlabels] = useState<string[]>();
  const [preparedData, setpreparedData] = useState<number[]>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getGuildBanLogs(guildId, FromDate)
      .then(({ data }) => {
        console.log(data);
        setBans(data);
        setlabels(getLabels());
        setpreparedData(prepareDate(data));
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { bans, loading, error, labels, preparedData };
}