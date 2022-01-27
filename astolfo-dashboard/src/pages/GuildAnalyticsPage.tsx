import { useContext, useEffect, useState } from "react";
import { GuildContext } from "../utils/contexts/GuildContext";
import { useFetchGuildBans } from "../utils/contexts/hooks/useFetchGuildBans";
import { GuildBanLogsType } from "../utils/types";

export const GuildAnalyticsPage = () => {
  const { guild } = useContext(GuildContext);
  const guildId = (guild && guild.id) || "";

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 6);
  const fromDate = currentDate.toLocaleDateString();
  // const [currentDate, setCurrentDate] = useState<Date>((new Date().setDate(new Date().getDate() - 6) as Date);

  const getLabels = () => {
    const currentDate = new Date();
    const last = currentDate.getDate();
    const start = last - 6;
    const labels = [];
    for (let i = start; i <= last; i++) {
      currentDate.setDate(i);
      labels.push(`${currentDate.getMonth() + 1}/${currentDate.getDate()}`);
    }
    return labels;
  };

  const prepareDate = (data: GuildBanLogsType[]) => {
    const currentDate = new Date();
    const last = currentDate.getDate();
    const start = last - 6;
    const dataRecords = [];

    for (let i = start; i <= last; i++) {
      const records = data.filter(
        (banLog) => new Date(banLog.issuedOn).getDate() === i
      );
      dataRecords.push(records.length);
    }
    return dataRecords;
  };

  const { bans, loading, error, labels, preparedData } = useFetchGuildBans(
    guildId,
    fromDate,
    getLabels,
    prepareDate
  );

  console.log(bans, labels, preparedData);

  return <div>GuildAnalyticsPage</div>;
};
